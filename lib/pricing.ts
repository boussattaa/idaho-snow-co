/**
 * Idaho Snow Co. — Centralized Pricing & Dispatch Configuration
 * --------------------------------------------------------------------------
 * Adjust any base rates, material adjustments, pitch multipliers, snow-depth
 * multipliers, corridor travel fees, or optional add-on prices here.
 * Both the client calculator and server-side `/api/quote` route import directly
 * from this single source of truth.
 */

export type TravelZoneId =
  | "zone-1-payette-basin"
  | "zone-2-canyon-payette-fork"
  | "zone-3-boise-basin-foothills";

export type RoofSizeId =
  | "under-1500"
  | "1500-2500"
  | "2500-4000"
  | "4000-plus";

export type RoofMaterialId =
  | "standing-seam-metal"
  | "architectural-shingle"
  | "cedar-wood-shake"
  | "flat-low-slope";

export type RoofPitchId = "low-walkable" | "moderate" | "steep-a-frame";

export type SnowDepthId = "1-2-ft" | "2-4-ft" | "4-plus-ft";

export type QuoteAddonId =
  | "ice-dam-removal"
  | "deck-porch-walkway"
  | "priority-24hr-dispatch"
  | "seasonal-cabin-monitoring";

export interface TravelZoneConfig {
  id: TravelZoneId;
  name: string;
  shortLabel: string;
  description: string;
  travelFee: number;
  dispatchWindow: string;
  locationSlugs: string[];
}

export const TRAVEL_ZONES: Record<TravelZoneId, TravelZoneConfig> = {
  "zone-1-payette-basin": {
    id: "zone-1-payette-basin",
    name: "Payette Lake & North Valley (Hwy 55)",
    shortLabel: "North Valley / McCall",
    description: "McCall, Donnelly, Lake Fork, New Meadows & Cascade",
    travelFee: 45,
    dispatchWindow: "Same-Day to 24-Hr Corridor Dispatch",
    locationSlugs: ["mccall", "donnelly", "cascade", "lake-fork", "new-meadows"],
  },
  "zone-2-canyon-payette-fork": {
    id: "zone-2-canyon-payette-fork",
    name: "Payette River Canyon & Garden Valley",
    shortLabel: "Garden Valley / Canyon",
    description: "Garden Valley, Crouch, Smiths Ferry & Lowman",
    travelFee: 65,
    dispatchWindow: "24 to 48-Hr Dedicated Crew Dispatch",
    locationSlugs: ["garden-valley", "crouch", "smiths-ferry", "lowman"],
  },
  "zone-3-boise-basin-foothills": {
    id: "zone-3-boise-basin-foothills",
    name: "Boise Basin & High Foothills",
    shortLabel: "Boise Foothills / Hwy 21",
    description: "Idaho City & Bogus Basin / Boise Foothills",
    travelFee: 55,
    dispatchWindow: "Same-Day Foothill & Hwy 21 Response",
    locationSlugs: ["idaho-city", "bogus-basin"],
  },
};

export interface RoofSizeOption {
  id: RoofSizeId;
  label: string;
  sublabel: string;
  baseRate: number;
  baseHours: number;
}

export const ROOF_SIZES: RoofSizeOption[] = [
  {
    id: "under-1500",
    label: "< 1,500 sq ft",
    sublabel: "A-frame, studio cabin, or compact mountain home",
    baseRate: 425,
    baseHours: 2.5,
  },
  {
    id: "1500-2500",
    label: "1,500 – 2,500 sq ft",
    sublabel: "Standard 3-bed cabin or foothill residence",
    baseRate: 625,
    baseHours: 4,
  },
  {
    id: "2500-4000",
    label: "2,500 – 4,000 sq ft",
    sublabel: "Custom timber home or multi-gable mountain lodge",
    baseRate: 890,
    baseHours: 5.5,
  },
  {
    id: "4000-plus",
    label: "4,000+ sq ft",
    sublabel: "Estate residence, luxury STR compound, or commercial roof",
    baseRate: 1290,
    baseHours: 8,
  },
];

export interface RoofMaterialOption {
  id: RoofMaterialId;
  label: string;
  description: string;
  multiplier: number;
  safetyProtocol: string;
}

export const ROOF_MATERIALS: RoofMaterialOption[] = [
  {
    id: "standing-seam-metal",
    label: "Standing Seam Metal",
    description: "Non-marring poly blades & edge-guarded slide relief",
    multiplier: 1.0,
    safetyProtocol: "HDPE non-scratch shovels + rib-safe fall-arrest anchors",
  },
  {
    id: "architectural-shingle",
    label: "Architectural Shingle",
    description: "Preserves 2-inch protective snow cushion over granules",
    multiplier: 1.08,
    safetyProtocol: "Soft-edge roof rakes & cushioned snow removal leaving protective layer",
  },
  {
    id: "cedar-wood-shake",
    label: "Cedar/Wood Shake",
    description: "Delicate hand-clearing around split shakes & ridge caps",
    multiplier: 1.22,
    safetyProtocol: "Low-impact hand-shoveling with zero metal blade contact",
  },
  {
    id: "flat-low-slope",
    label: "Flat / Low-Slope",
    description: "EPDM/TPO membrane protection & scupper drainage clearing",
    multiplier: 1.15,
    safetyProtocol: "Rubber-edge pushers + ponding & parapet drain relief",
  },
];

export interface RoofPitchOption {
  id: RoofPitchId;
  label: string;
  sublabel: string;
  multiplier: number;
  crewSize: number;
}

export const ROOF_PITCHES: RoofPitchOption[] = [
  {
    id: "low-walkable",
    label: "Low/Walkable",
    sublabel: "Up to 4/12 pitch — steady footing",
    multiplier: 1.0,
    crewSize: 2,
  },
  {
    id: "moderate",
    label: "Moderate",
    sublabel: "5/12 to 7/12 pitch — rope & harness assisted",
    multiplier: 1.18,
    crewSize: 3,
  },
  {
    id: "steep-a-frame",
    label: "Steep / A-Frame",
    sublabel: "8/12+ alpine pitch — full OSHA tie-off rigging",
    multiplier: 1.42,
    crewSize: 4,
  },
];

export interface SnowDepthOption {
  id: SnowDepthId;
  label: string;
  weightEstimate: string;
  multiplier: number;
}

export const SNOW_DEPTHS: SnowDepthOption[] = [
  {
    id: "1-2-ft",
    label: "1 – 2 ft",
    weightEstimate: "~12–24 lbs/sq ft settled powder",
    multiplier: 1.0,
  },
  {
    id: "2-4-ft",
    label: "2 – 4 ft",
    weightEstimate: "~28–55 lbs/sq ft layered snowpack",
    multiplier: 1.28,
  },
  {
    id: "4-plus-ft",
    label: "4+ ft (Heavy / Wet Snow Load)",
    weightEstimate: "60+ lbs/sq ft saturated structural load",
    multiplier: 1.62,
  },
];

export interface QuoteAddonOption {
  id: QuoteAddonId;
  label: string;
  shortLabel: string;
  description: string;
  priceLow: number;
  priceHigh: number;
}

export const QUOTE_ADDONS: QuoteAddonOption[] = [
  {
    id: "ice-dam-removal",
    label: "Ice Dam Removal & Prevention",
    shortLabel: "Ice Dam Mitigation",
    description: "Safe melt-channel cutting along eaves, valleys & downspouts",
    priceLow: 240,
    priceHigh: 320,
  },
  {
    id: "deck-porch-walkway",
    label: "Deck, Porch & Walkway Clearing",
    shortLabel: "Deck & Walkway Clear",
    description: "Clear roof shed piles off rear decks, hot tubs, stairs & entries",
    priceLow: 145,
    priceHigh: 195,
  },
  {
    id: "priority-24hr-dispatch",
    label: "Priority 24-Hour Emergency Dispatch",
    shortLabel: "24-Hr Priority Dispatch",
    description: "Jump to the front of the storm queue for active leaks or creaking trusses",
    priceLow: 175,
    priceHigh: 225,
  },
  {
    id: "seasonal-cabin-monitoring",
    label: "Out-of-Town Cabin Seasonal Monitoring (Photo Proof After Every Storm)",
    shortLabel: "Seasonal Storm Monitoring",
    description: "Enroll in automatic storm checks + timestamped before/after photo log",
    priceLow: 195,
    priceHigh: 245,
  },
];

/**
 * Quote range spread (+/- variance around calculated midpoint) so quotes account
 * for hidden eave ice, buried valleys, or wind-drifted cornices without surprise bills.
 */
export const PRICING_SPREAD_RATIO = {
  lowFactor: 0.92,
  highFactor: 1.12,
  roundingIncrement: 25,
} as const;

export const LOCATION_TRAVEL_ZONE_MAP: Record<string, TravelZoneId> = {
  mccall: "zone-1-payette-basin",
  donnelly: "zone-1-payette-basin",
  cascade: "zone-1-payette-basin",
  "lake-fork": "zone-1-payette-basin",
  "new-meadows": "zone-1-payette-basin",
  "garden-valley": "zone-2-canyon-payette-fork",
  crouch: "zone-2-canyon-payette-fork",
  "smiths-ferry": "zone-2-canyon-payette-fork",
  lowman: "zone-2-canyon-payette-fork",
  "idaho-city": "zone-3-boise-basin-foothills",
  "bogus-basin": "zone-3-boise-basin-foothills",
};

export interface QuoteCalculationInput {
  locationSlug: string;
  roofSize: RoofSizeId;
  roofMaterial: RoofMaterialId;
  roofPitch: RoofPitchId;
  snowDepth: SnowDepthId;
  addons: QuoteAddonId[];
}

export interface CalculatedAddonBreakdown {
  id: QuoteAddonId;
  label: string;
  priceLow: number;
  priceHigh: number;
}

export interface QuoteCalculationResult {
  low: number;
  high: number;
  baseAmount: number;
  materialAdjustment: number;
  pitchAdjustment: number;
  depthAdjustment: number;
  travelFee: number;
  travelZone: TravelZoneConfig;
  addonsTotalLow: number;
  addonsTotalHigh: number;
  addonItems: CalculatedAddonBreakdown[];
  crewSize: number;
  estimatedHours: number;
  safetyMethod: string;
}

function roundToIncrement(value: number, increment: number): number {
  return Math.round(value / increment) * increment;
}

export function getTravelZoneForLocation(locationSlug: string): TravelZoneConfig {
  const zoneId = LOCATION_TRAVEL_ZONE_MAP[locationSlug] ?? "zone-1-payette-basin";
  return TRAVEL_ZONES[zoneId];
}

export function calculateSnowQuote(input: QuoteCalculationInput): QuoteCalculationResult {
  const sizeOpt = ROOF_SIZES.find((s) => s.id === input.roofSize) ?? ROOF_SIZES[1];
  const materialOpt =
    ROOF_MATERIALS.find((m) => m.id === input.roofMaterial) ?? ROOF_MATERIALS[0];
  const pitchOpt = ROOF_PITCHES.find((p) => p.id === input.roofPitch) ?? ROOF_PITCHES[1];
  const depthOpt = SNOW_DEPTHS.find((d) => d.id === input.snowDepth) ?? SNOW_DEPTHS[1];
  const travelZone = getTravelZoneForLocation(input.locationSlug);

  const baseAmount = sizeOpt.baseRate;
  const afterMaterial = baseAmount * materialOpt.multiplier;
  const materialAdjustment = Math.round(afterMaterial - baseAmount);

  const afterPitch = afterMaterial * pitchOpt.multiplier;
  const pitchAdjustment = Math.round(afterPitch - afterMaterial);

  const afterDepth = afterPitch * depthOpt.multiplier;
  const depthAdjustment = Math.round(afterDepth - afterPitch);

  const coreSubtotal = afterDepth + travelZone.travelFee;

  const uniqueAddonIds = Array.from(new Set(input.addons));
  const addonItems: CalculatedAddonBreakdown[] = uniqueAddonIds
    .map((id) => QUOTE_ADDONS.find((a) => a.id === id))
    .filter((a): a is QuoteAddonOption => Boolean(a))
    .map((a) => ({
      id: a.id,
      label: a.shortLabel,
      priceLow: a.priceLow,
      priceHigh: a.priceHigh,
    }));

  const addonsTotalLow = addonItems.reduce((sum, item) => sum + item.priceLow, 0);
  const addonsTotalHigh = addonItems.reduce((sum, item) => sum + item.priceHigh, 0);

  const rawLow = coreSubtotal * PRICING_SPREAD_RATIO.lowFactor + addonsTotalLow;
  const rawHigh = coreSubtotal * PRICING_SPREAD_RATIO.highFactor + addonsTotalHigh;

  const low = roundToIncrement(rawLow, PRICING_SPREAD_RATIO.roundingIncrement);
  const high = Math.max(
    low + 75,
    roundToIncrement(rawHigh, PRICING_SPREAD_RATIO.roundingIncrement)
  );

  const estimatedHours = Number(
    (
      sizeOpt.baseHours *
      pitchOpt.multiplier *
      (depthOpt.multiplier > 1.3 ? 1.3 : depthOpt.multiplier)
    ).toFixed(1)
  );

  return {
    low,
    high,
    baseAmount,
    materialAdjustment,
    pitchAdjustment,
    depthAdjustment,
    travelFee: travelZone.travelFee,
    travelZone,
    addonsTotalLow,
    addonsTotalHigh,
    addonItems,
    crewSize: pitchOpt.crewSize,
    estimatedHours,
    safetyMethod: materialOpt.safetyProtocol,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
