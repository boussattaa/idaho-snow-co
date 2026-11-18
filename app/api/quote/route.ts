import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
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
  photoName: z.string().max(180).optional().nullable(),
  photoDataUrl: z.string().max(3_500_000).optional().nullable(),
  notes: z.string().max(1200).optional().nullable(),
});

function generateReferenceId(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear().toString().slice(-2);
  return `ISC-${year}${randomDigits}`;
}

async function storeInSupabase(payload: {
  referenceId: string;
  parsed: z.infer<typeof quoteSubmissionSchema>;
  locationName: string;
  quoteLow: number;
  quoteHigh: number;
}): Promise<{ stored: boolean; error?: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { stored: false };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("snow_leads").insert({
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
    photo_data_url: payload.parsed.photoDataUrl || null,
    notes: payload.parsed.notes || null,
    status: "new",
    source: "website-quote-calculator",
  });

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
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const toEmail = process.env.NOTIFICATION_EMAIL || SITE_CONFIG.email;
  const estimateString = `${formatCurrency(payload.quoteLow)} – ${formatCurrency(payload.quoteHigh)}`;

  const addonsList =
    payload.parsed.addons.length > 0
      ? payload.parsed.addons.join(", ")
      : "None selected";

  const html = `
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
          <tr><td style="padding: 6px 0; color: #475569;">Timing</td><td style="padding: 6px 0;">${payload.parsed.preferredTiming}</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Roof Specs</td><td style="padding: 6px 0;">${payload.parsed.roofSize} | ${payload.parsed.roofMaterial} | ${payload.parsed.roofPitch} | ${payload.parsed.snowDepth}</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Add-ons</td><td style="padding: 6px 0;">${addonsList}</td></tr>
          <tr><td style="padding: 6px 0; color: #475569;">Photo Attached</td><td style="padding: 6px 0;">${payload.parsed.photoName ? payload.parsed.photoName : "None"}</td></tr>
        </table>
        ${
          payload.parsed.notes
            ? `<p style="margin-top: 16px; padding: 12px; background: #F8FAFC; border-radius: 8px; font-size: 14px;"><strong>Notes:</strong> ${payload.parsed.notes}</p>`
            : ""
        }
      </div>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Idaho Snow Co. Alerts <alerts@idahosnowco.com>",
      to: [toEmail],
      reply_to: payload.parsed.email,
      subject: `[${payload.referenceId}] ${payload.locationName} Snow Quote (${estimateString}) — ${payload.parsed.name}`,
      html,
    }),
  });
}

async function sendTwilioSms(payload: {
  referenceId: string;
  parsed: z.infer<typeof quoteSubmissionSchema>;
  locationName: string;
  quoteLow: number;
  quoteHigh: number;
}): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.TWILIO_TO_NUMBER || "+12089654285";

  if (!sid || !token || !from) return;

  const estimateString = `${formatCurrency(payload.quoteLow)}-${formatCurrency(payload.quoteHigh)}`;
  const body = [
    `IDAHO SNOW CO LEAD (${payload.referenceId})`,
    `${payload.parsed.name} | ${payload.parsed.phone}`,
    `${payload.locationName}: ${payload.parsed.propertyAddress}`,
    `Est: ${estimateString} | ${payload.parsed.snowDepth} | ${payload.parsed.preferredTiming}`,
  ].join("\n");

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
  quoteLow: number;
  quoteHigh: number;
}): Promise<void> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "idahosnowco.com",
      brand: SITE_CONFIG.businessName,
      referenceId: payload.referenceId,
      createdAt: new Date().toISOString(),
      contact: {
        name: payload.parsed.name,
        phone: payload.parsed.phone,
        email: payload.parsed.email,
      },
      property: {
        address: payload.parsed.propertyAddress,
        locationSlug: payload.parsed.locationSlug,
        locationName: payload.locationName,
        preferredTiming: payload.parsed.preferredTiming,
      },
      quote: {
        roofSize: payload.parsed.roofSize,
        roofMaterial: payload.parsed.roofMaterial,
        roofPitch: payload.parsed.roofPitch,
        snowDepth: payload.parsed.snowDepth,
        addons: payload.parsed.addons,
        estimatedLow: payload.quoteLow,
        estimatedHigh: payload.quoteHigh,
        photoName: payload.parsed.photoName || null,
        notes: payload.parsed.notes || null,
      },
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
    });

    const referenceId = generateReferenceId();

    const dbResult = await storeInSupabase({
      referenceId,
      parsed,
      locationName,
      quoteLow: calculated.low,
      quoteHigh: calculated.high,
    });

    if (dbResult.error) {
      console.error("[IdahoSnowCo] Supabase insert notice:", dbResult.error);
    }

    await Promise.allSettled([
      sendResendEmail({
        referenceId,
        parsed,
        locationName,
        quoteLow: calculated.low,
        quoteHigh: calculated.high,
      }),
      sendTwilioSms({
        referenceId,
        parsed,
        locationName,
        quoteLow: calculated.low,
        quoteHigh: calculated.high,
      }),
      forwardToCrmWebhook({
        referenceId,
        parsed,
        locationName,
        quoteLow: calculated.low,
        quoteHigh: calculated.high,
      }),
    ]);

    return NextResponse.json({
      success: true,
      referenceId,
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
