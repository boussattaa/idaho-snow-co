export const SITE_CONFIG = {
  businessName: "Idaho Snow Co.",
  legalName: "Idaho Snow Co. LLC",
  domain: "https://idahosnowco.com",
  phoneDisplay: "(208) 965-4285",
  phoneHref: "tel:2089654285",
  email: "Boussattaa@gmail.com",
  corridorHeadline: "Highway 55 & Boise Basin Corridor: Boise Foothills to McCall & New Meadows",
  dispatchBadge: "24/7 Storm Load & Ice Dam Dispatch",
} as const;

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDefinition {
  slug: "roof-snow-removal" | "ice-dam-removal" | "cabin-snow-monitoring";
  href: string;
  title: string;
  shortTitle: string;
  badge: string;
  headline: string;
  description: string;
  highlights: string[];
  processSteps: {
    title: string;
    detail: string;
  }[];
  faqs: ServiceFaq[];
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "roof-snow-removal",
    href: "/services/roof-snow-removal",
    title: "Roof Snow Removal",
    shortTitle: "Roof Snow Removal",
    badge: "Structural Load Protection",
    headline: "Roof-Safe Snow Unloading for Steep Cabins, Metal Roofs & Custom Homes",
    description:
      "Prevent truss fatigue, drywall cracking, and sudden roof slides with balanced top-down snow shoveling and cushioned raking built for standing seam metal, architectural shingles, and cedar shake.",
    highlights: [
      "Non-marring HDPE polyethylene shovels & soft-edge roof rakes",
      "Leaves a 1.5–2 inch protective buffer on asphalt & cedar shingles",
      "Full OSHA-compliant rope & fall-arrest rigging for 8/12+ A-frames",
      "Balanced dual-slope clearing prevents lateral roof truss racking",
    ],
    processSteps: [
      {
        title: "Roof Material & Structural Assessment",
        detail:
          "Upon arrival we inspect eaves, skylights, stove flues, snow guards, and signs of snow creep before anchoring safety rigging.",
      },
      {
        title: "Balanced Ridge-to-Eave Unloading",
        detail:
          "Crews remove dense basal layers evenly across opposite gable faces so one roof plane never shoulders unequal structural compression.",
      },
      {
        title: "Perimeter Egress, Deck & Photo Proof",
        detail:
          "We clear snow piles away from doorways, vents, and propane regulators—then text timestamped before/after photos to your phone.",
      },
    ],
    faqs: [
      {
        question: "Will roof shoveling damage my architectural shingles or standing seam panels?",
        answer:
          "Never with our equipment protocol. We never put steel blades on a roof. For metal roofs we use non-marring polymer tools; for architectural shingles and cedar shake we intentionally leave a protective 1.5–2 inch layer of snow so no tool ever scrapes roof granules.",
      },
      {
        question: "Why do I have to clear both sides of my roof evenly?",
        answer:
          "Unloading only one side of a pitched gable roof shifts tens of thousands of pounds onto a single side of the truss web, which can twist framing and crack interior sheetrock. Our crews always unload symmetrically.",
      },
      {
        question: "When does mountain snow load become dangerous?",
        answer:
          "Dry powder weighs roughly 7–10 lbs per cubic foot, while wet Sierra-style snow or rain-saturated snowpack can hit 25–35 lbs per cubic foot. Anytime snow approaches 2.5–3 feet—or doors start sticking—schedule prompt relief.",
      },
    ],
  },
  {
    slug: "ice-dam-removal",
    href: "/services/ice-dam-removal",
    title: "Ice Dam Mitigation & Eave Relief",
    shortTitle: "Ice Dam Removal",
    badge: "Active Leak & Gutter Rescue",
    headline: "Safe Ice Dam Clearing & Meltwater Channeling Without Roof Damage",
    description:
      "Stop ceiling stains, soaked insulation, and ripped-off gutters. We safely relieve eave ice dams, open frozen valleys, and re-establish clean drainage channels without axes, salt damage, or torn shingles.",
    highlights: [
      "Zero axes, hammers, or steel picks that puncture shingle membranes",
      "Clears lower 5–6 ft roof snow bands feeding daytime meltwater",
      "Cuts precision thermal relief channels straight to gutters & downspouts",
      "Protects skylights, dormers, copper valleys & fascia boards",
    ],
    processSteps: [
      {
        title: "Strip the Insulating Snow Pack Above the Dam",
        detail:
          "Ice dams grow when trapped roof snow melts under attic warmth. We first remove the snow shelf 5–6 feet up from the eaves to cut off the water supply.",
      },
      {
        title: "Pare Down & Channel the Ice Ridge Safely",
        detail:
          "Using roof-safe de-icing channels and controlled thermal relief, we carve vertical drainage troughs through the solid ice barrier so trapped pools drain harmlessly.",
      },
      {
        title: "Eave, Valley & Downspout Flow Verification",
        detail:
          "We verify water drains freely past roof intersections and verify interior attic/ceiling threat areas are fully stabilized.",
      },
    ],
    faqs: [
      {
        question: "Why shouldn't someone just hammer or chip an ice dam off my roof?",
        answer:
          "Solid ice bonds directly into asphalt shingle granules and metal flashing seams. Striking ice with axes or crowbars shatters brittle cold-weather shingles and causes thousands in leaks come April.",
      },
      {
        question: "Do ice melt pucks or rock salt hurt mountain cabin roofs?",
        answer:
          "Rock salt (sodium chloride) corrodes metal flashing, galvanized gutters, and kills landscaping underneath eaves. When thermal relief supplements are warranted, we only use roof-safe calcium-based melts inside pre-cut drainage channels.",
      },
      {
        question: "If water is already dripping near my window or can light, how fast can you dispatch?",
        answer:
          "Select Priority 24-Hour Emergency Dispatch in our calculator or call (208) 965-4285 directly—active interior leaks take immediate priority along Highway 55 and Highway 21.",
      },
    ],
  },
  {
    slug: "cabin-snow-monitoring",
    href: "/services/cabin-snow-monitoring",
    title: "Out-of-Town Cabin Monitoring",
    shortTitle: "Cabin Monitoring",
    badge: "For 2nd Homes & STRs",
    headline: "Hands-Off Winter Roof Protection for Out-of-Town Owners & STR Hosts",
    description:
      "Live in Boise, Seattle, or California? Never gamble on your McCall, Tamarack, or Garden Valley cabin during a week-long storm. We track storm thresholds, inspect your roof, dispatch automatically when needed, and text timestamped photo proof.",
    highlights: [
      "Storm-threshold roof depth checks along the Hwy 55 & Boise Basin corridor",
      "Timestamped before-and-after high-res photos sent directly to your phone",
      "Propane tank access, hot tub deck & guest entry clearing options",
      "Seamless remote Stripe invoicing—zero checks or in-person coordination",
    ],
    processSteps: [
      {
        title: "Enroll Property & Set Snow-Load Threshold",
        detail:
          "We log your roof material, pitch, weak spots (valleys/decks), gate access, and custom trigger depth (e.g., 24 or 30 inches).",
      },
      {
        title: "Proactive Post-Storm Dispatch & Clearing",
        detail:
          "When telemetry and local storm gauges pass your trigger point, our crew automatically inspects and unloads your roof before weight peaks.",
      },
      {
        title: "Instant Photo Report & Stripe Payment Link",
        detail:
          "Receive clear before/after roof, eave, and deck photos via text/email right upon completion along with one-click online Stripe billing.",
      },
    ],
    faqs: [
      {
        question: "How does Out-of-Town Cabin Monitoring save Airbnb and VRBO hosts money?",
        answer:
          "Cancelled winter bookings due to an ice-dam leak or blocked egress cost thousands per weekend. Proactive checks keep guest driveways, decks, and roofs safe between back-to-back check-ins.",
      },
      {
        question: "Do I pay every week even if it barely snows?",
        answer:
          "No—monitoring plans include storm-triggered inspections and pre-agreed per-clear rates so you only pay for full roof unloading when snow depth actually reaches your roof threshold.",
      },
      {
        question: "What proof do I get that the crew cleared the roof properly?",
        answer:
          "Every visit includes timestamped before, during, and after photos showing balanced clearing across main gables, clear eaves, and clean walkways—archived for your insurance records too.",
      },
    ],
  },
];

export const HOMEPAGE_FAQS: ServiceFaq[] = [
  {
    question: "How quickly can Idaho Snow Co. dispatch along the Highway 55 corridor?",
    answer:
      "We stage crews continuously between the Boise Foothills, Garden Valley, Cascade, Donnelly, and McCall. Standard quotes are scheduled within 24–48 hours, and Priority 24-Hour Emergency Dispatch handles active ice-dam leaks or overloaded roofs the same or next day.",
  },
  {
    question: "Why do I see an instant price range right away without calling first?",
    answer:
      "Mountain homeowners shouldn't wait 3 days just for a ballpark number during a storm. Our Instant Quote Calculator uses your exact town travel zone, roof size, material, pitch, and snow depth to show transparent pricing immediately—then lets you lock in your spot in 30 seconds.",
  },
  {
    question: "Are you insured for steep roofs and second-story mountain homes?",
    answer:
      "Yes. Idaho Snow Co. carries specialized winter roof snow removal liability insurance and equips crews with OSHA-compliant anchors, harnesses, and non-marring polyethylene snow tools built specifically for high-elevation work.",
  },
  {
    question: "Do I have to be home at my cabin in McCall, Tamarack, or Crouch?",
    answer:
      "No. Most of our clients live in Boise or out of state. We coordinate driveway/gate access remotely, document everything with timestamped before-and-after photos, and send a convenient online Stripe invoice when finished.",
  },
  {
    question: "Should I remove all snow completely down to bare shingles?",
    answer:
      "On architectural shingles and cedar shake, never scrape down to bare wood or granules—that voids warranties and causes tearing. We remove the heavy structural mass while leaving a protective 1.5–2 inch cushion. On standing seam metal, polymer tools safely relieve the heavy mass cleanly.",
  },
  {
    question: "What happens if heavy roof snow lands on my deck, walkway, or propane tank?",
    answer:
      "Anytime a roof is unloaded, heavy blocks naturally slide off eaves onto lower decks, steps, and gas regulators. Simply check the Deck, Porch & Walkway Clearing option in the calculator and our crew clears those piles cleanly before leaving.",
  },
];

export function getServiceBySlug(slug: ServiceDefinition["slug"]): ServiceDefinition {
  return SERVICES.find((s) => s.slug === slug) ?? SERVICES[0];
}
