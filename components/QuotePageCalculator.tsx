"use client";

import { useSearchParams } from "next/navigation";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { getLocationBySlug } from "@/lib/locations";
import type { SnowDepthId } from "@/lib/pricing";

export function QuotePageCalculator() {
  const searchParams = useSearchParams();
  const depthParam = searchParams.get("depth");
  const locParam = searchParams.get("location");

  const validDepth: SnowDepthId =
    depthParam === "1-2-ft" ||
    depthParam === "2-4-ft" ||
    depthParam === "4-plus-ft"
      ? depthParam
      : "2-4-ft";

  const validLocation =
    locParam && getLocationBySlug(locParam) ? locParam : "mccall";

  return (
    <QuoteCalculator
      key={`${validLocation}-${validDepth}`}
      defaultLocationSlug={validLocation}
      initialSnowDepth={validDepth}
      id="dedicated-quote-calculator"
    />
  );
}
