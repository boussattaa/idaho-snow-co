import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import {
  calculateSnowQuote,
  formatCurrency,
  type QuoteAddonId,
  type RoofMaterialId,
  type RoofPitchId,
  type RoofSizeId,
  type SnowDepthId,
} from "@/lib/pricing";
import { getLocationBySlug } from "@/lib/locations";
import { SITE_CONFIG } from "@/lib/services";

const quoteSubmissionSchema = z.object({
  locationSlug: z.string().min(2, "Please select a service location."),
  roofSize: z.enum(["under-1500", "1500-2500", "2500-4000", "4000-plus"]),
  roofMaterial: z.enum([
    "standing-seam-metal",
    "architectural-shingle",
    "cedar-wood-shake",
    "flat-low-slope",
  ]),
  roofPitch: z.enum(["low-walkable", "moderate", "steep-a-frame"]),
  snowDepth: z.enum(["1-2-ft", "2-4-ft", "4-plus-ft"]),
  addons: z
    .array(
      z.enum([
        "ice-dam-removal",
        "deck-porch-walkway",
        "priority-24hr-dispatch",
        "seasonal-cabin-monitoring",
      ])
    )
    .default([]),
  flexibleRouteDay: z.boolean().default(false),
  waiverAccepted: z.literal(true, {
    errorMap: () => ({
      message:
        "You must accept the roof-clearing liability waiver to schedule.",
    }),
  }),
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid callback phone number.")
    .max(30),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  propertyAddress: z
    .string()
    .trim()
    .min(4, "Please enter the cabin or property address.")
    .max(240),
  preferredTiming: z
    .string()
    .trim()
    .min(2, "Please choose your preferred service timing.")
    .max(120),
  urgency: z.string().trim().max(120).optional().nullable(),
  sourceUrl: z.string().trim().max(300).optional().nullable(),
  photoName: z.string().max(180).optional().nullable(),
  photoDataUrl: z.string().max(3_500_000).optional().nullable(),
  notes: z.string().max(1600).optional().nullable(),
});

function generateReferenceId(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear().toString().slice(-2);
  return `ISC-${year}${randomDigits}`;
}

function getSupabaseServerClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}

async function uploadPhotoToStorage(
  supabase: SupabaseClient | null,
  referenceId: string,
  photoName?: string | null,
  photoDataUrl?: string | null
): Promise<string | null> {
  if (!supabase || !photoDataUrl) return null;

  const match = photoDataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) return null;

  const mimeType = match[1];
  const base64Data = match[2];
  const extension = mimeType.split("/")[1]?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
  const safeBaseName = (photoName || `roof.${extension}`)
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .slice(-48);
  const objectPath = `leads/${referenceId}-${Date.now()}-${safeBaseName}`;

  try {
    const buffer = Buffer.from(base64Data, "base64");
    const { error } = await supabase.storage
      .from("snow-lead-photos")
      .upload(objectPath, buffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) {
      console.warn("[IdahoSnowCo] Storage photo upload warning:", error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("snow-lead-photos")
      .getPublicUrl(objectPath);

    return publicUrlData.publicUrl || null;
  } catch (err) {
    console.warn("[IdahoSnowCo] Storage upload exception:", err);
    return null;
  }
}

async function storeInSupabase(
  supabase: SupabaseClient | null,
  payload: {
    referenceId: string;
    parsed: z.infer<typeof quoteSubmissionSchema>;
    locationName: string;
    quoteLow: number;
    quoteHigh: number;
    photoUrl: string | null;
    flexibleRouteDay: boolean;
    waiverAcceptedAt: string;
  }
): Promise<{ stored: boolean; error?: string }> {
  if (!supabase) {
    return { stored: false };
  }

  const baseInsert = {
    reference_id: payload.referenceId,
    name: payload.parsed.name,
    phone: payload.parsed.phone,
    email: payload.parsed.email,
    property_address: payload.parsed.propertyAddress,
    preferred_timing: payload.parsed.preferredTiming,
    location_slug: payload.parsed.locationSlug,
    location_name: payload.locationName,
    roof_size: payload.parsed.roofSize,
    roof_material: payload.parsed.roofMaterial,
    roof_pitch: payload.parsed.roofPitch,
    snow_depth: payload.parsed.snowDepth,
    addons: payload.parsed.addons,
    estimated_low: payload.quoteLow,
    estimated_high: payload.quoteHigh,
    photo_name: payload.parsed.photoName || null,
    photo_data_url: payload.photoUrl ? null : payload.parsed.photoDataUrl || null,
    notes: payload.parsed.notes || null,
    status: "new",
    source: payload.parsed.sourceUrl || "website-quote-calculator",
  };

  let { error } = await supabase.from("snow_leads").insert({
    ...baseInsert,
    photo_url: payload.photoUrl,
    flexible_route_day: payload.flexibleRouteDay,
    waiver_accepted: true,
    waiver_accepted_at: payload.waiverAcceptedAt,
  });

  // Fallback if 002 or 003 migrations haven't been run yet
  if (
    error &&
    (error.message.includes("photo_url") ||
      error.message.includes("flexible_route_day") ||
      error.message.includes("waiver_accepted"))
  ) {
    const retry = await supabase.from("snow_leads").insert(baseInsert);
    error = retry.error;
  }

  if (error) {
    return { stored: false, error: error.message };
  }

  return { stored: true };
}

async function sendResendEmail(payload: {
  referenceId: string;
  parsed: z.infer<typeof quoteSubmissionSchema>;
  locationName: string;
  quoteLow: number;
  quoteHigh: number;
  photoUrl: string | null;
  flexibleRouteDay: boolean;
  waiverAcceptedAt: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[IdahoSnowCo] RESEND_API_KEY is not set; skipping email notification.");
    return;
  }

  const fromAddress =
    process.env.RESEND_FROM_EMAIL ||
    "Idaho Snow Co. <alex@premiercleaningpro.com>";
  const toEmail = process.env.NOTIFICATION_EMAIL || SITE_CONFIG.email;
  const estimateString = `${formatCurrency(payload.quoteLow)} – ${formatCurrency(payload.quoteHigh)}`;

  const addonsList =
    payload.parsed.addons.length > 0
      ? payload.parsed.addons.join(", ")
      : "None selected";

  const dispatchHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; color: #0F172A;">
      <div style="background: #0F172A; color: #F8FAFC; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <p style="margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #38BDF8;">Idaho Snow Co. Dispatch Alert</p>
        <h1 style="margin: 6px 0 0; font-size: 20px;">New Quote Locked: ${estimateString}</h1>
      </div>
      <div style="border: 1px solid #E2E8F0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px; background: #FFFFFF;">
        <p style="margin-top: 0;"><strong>Reference:</strong> ${payload.referenceId}</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #475569;">Customer</td><td style="padding: 6px 0;"><strong>${payload.parsed.name}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Phone</td><td style="padding: 6px 0;"><strong>${payload.parsed.phone}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Email</td><td style="padding: 6px 0;">${payload.parsed.email}</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Area</td><td style="padding: 6px 0;"><strong>${payload.locationName}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Address</td><td style="padding: 6px 0;">${payload.parsed.propertyAddress}</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Timing / Urgency</td><td style="padding: 6px 0;">${payload.parsed.urgency || payload.parsed.preferredTiming}</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Route-Day Discount</td><td style="padding: 6px 0;">${
            payload.flexibleRouteDay ? "Yes (-10% Fri–Sun Corridor Run)" : "No"
          }</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Waiver Accepted</td><td style="padding: 6px 0;">Yes (${payload.waiverAcceptedAt})</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Roof Specs</td><td style="padding: 6px 0;">${payload.parsed.roofSize} | ${payload.parsed.roofMaterial} | ${payload.parsed.roofPitch} | ${payload.parsed.snowDepth}</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Add-ons</td><td style="padding: 6px 0;">${addonsList}</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Photo</td><td style="padding: 6px 0;">${
            payload.photoUrl
              ? `<a href="${payload.photoUrl}">View Uploaded Photo</a>`
              : payload.parsed.photoName || "None"
          }</td></tr>
        </table>
        ${
          payload.parsed.notes
            ? `<p style="margin-top: 16px; padding: 12px; background: #F8FAFC; border-radius: 8px; font-size: 14px;"><strong>Notes:</strong> ${payload.parsed.notes}</p>`
            : ""
        }
      </div>
    </div>
  `;

  const dispatchRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toEmail],
      reply_to: payload.parsed.email,
      subject: `[${payload.referenceId}] ${payload.locationName} Snow Quote (${estimateString}) — ${payload.parsed.name}`,
      html: dispatchHtml,
    }),
  });

  if (!dispatchRes.ok) {
    const errText = await dispatchRes.text();
    console.error("[IdahoSnowCo] Resend dispatch email error:", dispatchRes.status, errText);
  }

  // Also send an instant confirmation receipt directly to the property owner if their email differs
  if (payload.parsed.email.toLowerCase() !== toEmail.toLowerCase()) {
    const customerHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; color: #0F172A;">
        <div style="background: #0F172A; color: #F8FAFC; padding: 20px 24px; border-radius: 12px 12px 0 0;">
          <p style="margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #38BDF8;">Idaho Snow Co.</p>
          <h1 style="margin: 6px 0 0; font-size: 20px;">Your Quote Is Locked: ${estimateString}</h1>
        </div>
        <div style="border: 1px solid #E2E8F0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px; background: #FFFFFF;">
          <p>Hi ${payload.parsed.name},</p>
          <p>Thanks for booking with <strong>Idaho Snow Co.</strong> Your roof snow clearing request for <strong>${payload.parsed.propertyAddress}</strong> (${payload.locationName}) is confirmed with reference <strong>${payload.referenceId}</strong>.</p>
          <p><strong>Estimated Range:</strong> ${estimateString}${payload.flexibleRouteDay ? " (includes -10% Route-Day Discount)" : ""}<br/>
          <strong>Timing:</strong> ${payload.parsed.urgency || payload.parsed.preferredTiming}</p>
          <p>Our Highway 55 dispatch coordinator will text/call you to confirm your crew arrival window. You&apos;ll receive timestamped before-and-after roof photos and a Stripe invoice upon completion.</p>
          <p style="margin-top: 16px;">Need urgent leak help? Call or text <strong>(208) 965-4285</strong>.</p>
        </div>
      </div>
    `;

    const customerRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [payload.parsed.email],
        reply_to: toEmail,
        subject: `Quote Confirmed (${payload.referenceId}): ${estimateString} — Idaho Snow Co.`,
        html: customerHtml,
      }),
    });

    if (!customerRes.ok) {
      const errText = await customerRes.text();
      console.error("[IdahoSnowCo] Resend customer email error:", customerRes.status, errText);
    }
  }
}

async function sendTwilioSms(payload: {
  referenceId: string;
  parsed: z.infer<typeof quoteSubmissionSchema>;
  locationName: string;
  quoteLow: number;
  quoteHigh: number;
  photoUrl: string | null;
  flexibleRouteDay: boolean;
  waiverAcceptedAt: string;
}): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.TWILIO_TO_NUMBER || "+12089654285";

  if (!sid || !token || !from) return;

  const estimateString = `${formatCurrency(payload.quoteLow)}-${formatCurrency(payload.quoteHigh)}`;
  const body = [
    `[IDAHO SNOW CO LEAD] (${payload.referenceId})`,
    `${payload.parsed.name} | ${payload.parsed.phone}`,
    `${payload.locationName}: ${payload.parsed.propertyAddress}`,
    `Est: ${estimateString}${payload.flexibleRouteDay ? " (-10% Route-Day)" : ""} | ${payload.parsed.snowDepth} | ${payload.parsed.urgency || payload.parsed.preferredTiming}`,
    `Waiver Accepted: Yes (${payload.waiverAcceptedAt})`,
    payload.photoUrl ? `Photo: ${payload.photoUrl}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const form = new URLSearchParams({
    To: to,
    From: from,
    Body: body,
  });

  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });
}

async function forwardToCrmWebhook(payload: {
  referenceId: string;
  parsed: z.infer<typeof quoteSubmissionSchema>;
  locationName: string;
  travelZoneName: string;
  quoteLow: number;
  quoteHigh: number;
  photoUrl: string | null;
  sourceUrl: string;
  flexibleRouteDay: boolean;
  waiverAcceptedAt: string;
}): Promise<void> {
  const webhookUrl =
    process.env.CRM_WEBHOOK_URL ||
    "https://crm.premiercleaningpro.com/api/webhooks/idaho-snow-co";
  if (!webhookUrl) return;

  const webhookSecret = process.env.CRM_WEBHOOK_SECRET || "";
  const urgencyValue = payload.parsed.urgency || payload.parsed.preferredTiming;

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(webhookSecret ? { "x-webhook-secret": webhookSecret } : {}),
    },
    body: JSON.stringify({
      reference_id: payload.referenceId,
      name: payload.parsed.name,
      phone: payload.parsed.phone,
      email: payload.parsed.email,
      address: payload.parsed.propertyAddress,
      city: payload.locationName,
      travel_zone: payload.travelZoneName,
      roof_size: payload.parsed.roofSize,
      roof_material: payload.parsed.roofMaterial,
      roof_pitch: payload.parsed.roofPitch,
      snow_depth: payload.parsed.snowDepth,
      addons: payload.parsed.addons,
      estimated_low: payload.quoteLow,
      estimated_high: payload.quoteHigh,
      urgency: urgencyValue,
      flexible_route_day: payload.flexibleRouteDay,
      waiver_accepted: true,
      waiver_accepted_at: payload.waiverAcceptedAt,
      photo_url: payload.photoUrl,
      source_url: payload.sourceUrl,
      notes: payload.parsed.notes || null,
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validation = quoteSubmissionSchema.safeParse(rawBody);

    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: firstIssue?.message || "Please check all required fields.",
          issues: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const parsed = validation.data;
    const location = getLocationBySlug(parsed.locationSlug);
    const locationName = location?.name || parsed.locationSlug;

    const calculated = calculateSnowQuote({
      locationSlug: parsed.locationSlug,
      roofSize: parsed.roofSize as RoofSizeId,
      roofMaterial: parsed.roofMaterial as RoofMaterialId,
      roofPitch: parsed.roofPitch as RoofPitchId,
      snowDepth: parsed.snowDepth as SnowDepthId,
      addons: parsed.addons as QuoteAddonId[],
      flexibleRouteDay: parsed.flexibleRouteDay,
    });

    const flexibleRouteDay = calculated.flexibleRouteDayApplied;
    const waiverAcceptedAt = new Date().toISOString();

    const referenceId = generateReferenceId();
    const supabase = getSupabaseServerClient();
    const photoUrl = await uploadPhotoToStorage(
      supabase,
      referenceId,
      parsed.photoName,
      parsed.photoDataUrl
    );

    const dbResult = await storeInSupabase(supabase, {
      referenceId,
      parsed,
      locationName,
      quoteLow: calculated.low,
      quoteHigh: calculated.high,
      photoUrl,
      flexibleRouteDay,
      waiverAcceptedAt,
    });

    if (dbResult.error) {
      console.error("[IdahoSnowCo] Supabase insert notice:", dbResult.error);
    }

    const sourceUrl =
      parsed.sourceUrl ||
      request.headers.get("referer") ||
      `${SITE_CONFIG.domain}/quote`;

    await Promise.allSettled([
      sendResendEmail({
        referenceId,
        parsed,
        locationName,
        quoteLow: calculated.low,
        quoteHigh: calculated.high,
        photoUrl,
        flexibleRouteDay,
        waiverAcceptedAt,
      }),
      sendTwilioSms({
        referenceId,
        parsed,
        locationName,
        quoteLow: calculated.low,
        quoteHigh: calculated.high,
        photoUrl,
        flexibleRouteDay,
        waiverAcceptedAt,
      }),
      forwardToCrmWebhook({
        referenceId,
        parsed,
        locationName,
        travelZoneName: calculated.travelZone.name,
        quoteLow: calculated.low,
        quoteHigh: calculated.high,
        photoUrl,
        sourceUrl,
        flexibleRouteDay,
        waiverAcceptedAt,
      }),
    ]);

    return NextResponse.json({
      success: true,
      referenceId,
      photoUrl,
      flexibleRouteDay,
      waiverAcceptedAt,
      estimate: {
        low: calculated.low,
        high: calculated.high,
      },
      locationName,
      message: `Quote ${referenceId} locked for ${locationName}. Dispatch confirmation sent.`,
    });
  } catch (error) {
    console.error("[IdahoSnowCo] /api/quote unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to process your quote request right now. Please call (208) 965-4285 for immediate dispatch.",
      },
      { status: 500 }
    );
  }
}
