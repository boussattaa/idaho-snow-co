export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideArticle {
  slug:
    | "how-much-snow-can-an-idaho-cabin-roof-hold"
    | "metal-vs-shingle-roof-snow-removal-guide"
    | "preventing-ice-dams-mccall-cascade-cabins"
    | "out-of-town-cabin-owner-winter-roof-checklist";
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  sections: GuideSection[];
  relatedLocationSlugs: string[];
  faqs: GuideFaq[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: "how-much-snow-can-an-idaho-cabin-roof-hold",
    title: "How Much Snow Can an Idaho Cabin Roof Hold? (PSF Guide & Warning Signs)",
    shortTitle: "How Much Snow Can an Idaho Roof Hold?",
    description:
      "Learn Idaho mountain cabin roof snow-load limits in pounds per square foot (PSF), why wet February rain-on-snow events spike structural weight in McCall and Cascade, and 5 warning signs to act immediately.",
    category: "Structural Snow Load",
    readTime: "6 min read",
    publishedAt: "2026-11-01",
    updatedAt: "2026-11-18",
    intro:
      "Standing inside a warm cabin in McCall or Donnelly while three feet of fresh powder sits quietly overhead can feel cozy—until a warm Pacific front brings wet snow or winter rain. In Idaho's central mountains, snow depth alone never tells the full structural story; snow water equivalent and pounds per square foot (PSF) determine whether your trusses stay safe or start groaning.",
    sections: [
      {
        id: "why-psf-matters-more-than-inches",
        heading: "1. Depth vs. Weight: Why 3 Feet of Wet Snow Weighs Triple Dry Powder",
        paragraphs: [
          "Fresh dry mountain powder falling at 15°F typically weighs 6 to 8 pounds per cubic foot. Three feet of untouched dry snow exerts roughly 18 to 24 PSF—well within modern Valley County building tolerances.",
          "Once warm daytime temperatures, wind compaction, or a mid-winter Pineapple Express rain-on-snow storm hit the same 36-inch snowpack, snow density jumps to 22–32 pounds per cubic foot. Suddenly, that exact same three-foot layer presses down at 66 to 96+ PSF—equivalent to parking dozens of pickup trucks directly across your roof rafters.",
        ],
        bullets: [
          "Light Powder (~7 lb/ft³): 3 ft = ~21 PSF (46,200 lbs on a 2,200 sq ft roof)",
          "Settled Winter Pack (~15 lb/ft³): 3 ft = ~45 PSF (99,000 lbs on a 2,200 sq ft roof)",
          "Heavy Wet Cascade/McCall Snow (~22 lb/ft³): 3 ft = ~66 PSF (145,200 lbs)",
          "Rain-Soaked / Basal Ice Crust (~32 lb/ft³): 3 ft = ~96 PSF (211,200 lbs)",
        ],
      },
      {
        id: "idaho-corridor-roof-limits",
        heading: "2. Valley County, Boise County & Foothill Design Snow Loads",
        paragraphs: [
          "Modern engineered mountain homes built in McCall, Donnelly, and Tamarack Resort typically carry ground/roof design specs between 95 and 150 PSF depending on exact elevation and slope exposure. Older 1960s–1980s A-frames, detached boat garages, and lower-elevation Garden Valley or Boise Foothill structures were often framed for 45 to 75 PSF.",
          "Detached carports, covered breezeways, and lower porch additions are almost always the first weak spots because they absorb double weight: natural snowfall plus multi-ton snow blocks sliding off upper metal gables.",
        ],
      },
      {
        id: "five-warning-signs",
        heading: "3. Five Physical Warning Signs Your Roof Is Overloaded",
        paragraphs: [
          "You don't need to climb a ladder onto an icy roof to spot structural stress. Check these interior clues any time roof snow passes two feet or after a warm rain event:",
        ],
        bullets: [
          "Interior bedroom or closet doors suddenly rub against frames or refuse to latch cleanly.",
          "New vertical or stair-step hairline drywall cracks appear near upper wall corners or ceiling joists.",
          "Audible popping, creaking, or sharp snaps echo from the attic during afternoon freeze-thaw shifts.",
          "Window sash frames feel tight or show slight bowing across wide panoramic living room sliders.",
          "Soffit eaves or aluminum gutters visibly bow downward under curling multi-foot ice cornices.",
        ],
      },
      {
        id: "balanced-unloading",
        heading: "4. Why Unloading Only One Roof Slope Can Damage Trusses",
        paragraphs: [
          "When clearing heavy snow load, balance matters as much as total weight removed. Shoveling one entire side of a gable roof bare while leaving 4 feet of wet snow on the opposite slope creates severe asymmetrical torque across ridge beams and web trusses.",
          "Trained roof crews always work symmetrically—relieving lower eave bands and heavy valleys evenly across opposite sides so structural forces stay centered over load-bearing walls.",
        ],
      },
    ],
    relatedLocationSlugs: ["mccall", "donnelly", "cascade", "new-meadows"],
    faqs: [
      {
        question: "At what snow depth should I schedule roof clearing in McCall or Donnelly?",
        answer:
          "For modern cabins, 30–36 inches of settled winter snow—or 20+ inches if heavy wet rain-on-snow is forecast—is the smart proactive threshold. Older cabins, garages, and flat roofs should be relieved around 18–24 inches.",
      },
      {
        question: "How can I check my exact roof PSF right now?",
        answer:
          "Use our free Interactive Roof Snow-Load (PSF) Calculator to plug in your measured inches, snow moisture type, and cabin era for an instant structural risk gauge.",
      },
      {
        question: "Do standing seam metal roofs still overload?",
        answer:
          "Yes—especially when snow guards, plumbing vents, or shaded eave ice lock dense snow in place instead of letting it slide naturally.",
      },
    ],
  },
  {
    slug: "metal-vs-shingle-roof-snow-removal-guide",
    title:
      "Standing Seam Metal vs. Architectural Shingle Roof Snow Removal Guide",
    shortTitle: "Metal vs. Shingle Snow Removal",
    description:
      "Discover the right tools and safe snow-cushion protocols for clearing standing seam metal, architectural asphalt shingles, cedar wood shake, and flat mountain roofs without voiding warranties.",
    category: "Roof Material Care",
    readTime: "5 min read",
    publishedAt: "2026-11-02",
    updatedAt: "2026-11-18",
    intro:
      "Putting a steel grain shovel or ice chopper onto a mountain roof causes more winter leaks than the snow itself. Every roofing material common along Highway 55—from painted standing seam steel in Tamarack to heavy architectural shingles in Garden Valley and cedar shake near Payette Lake—requires a distinct snow-unloading technique.",
    sections: [
      {
        id: "standing-seam-metal-protocol",
        heading: "1. Standing Seam Metal Roofs: Protecting Kynar Paint & Snow Guards",
        paragraphs: [
          "Standing seam metal roofs shed snow effortlessly until cold night freezes weld the bottom snow layer onto panel ribs or snow-retention brackets. Once stuck, reckless scraping with metal shovels gouges protective Kynar/PVDF coatings and exposes bare galvanized steel to spring rust.",
          "Our crews strictly use wide HDPE high-density polyethylene blades and polymer roof rakes, keeping technicians secured on ridge-anchored fall arrest lines—because slick frosted metal turns treacherous fast.",
        ],
        bullets: [
          "Zero steel-edged shovels or metal ice spades touching panel ribs or seam caps.",
          "Careful hand-relieving around pipe boots, chimney crickets, and bar-style snow guards.",
          "Coordinated clearing of lower decks and propane tanks positioned below slide zones.",
        ],
      },
      {
        id: "architectural-shingle-cushion",
        heading: "2. Architectural Shingles: Always Leave a 1.5–2 Inch Protective Cushion",
        paragraphs: [
          "Asphalt shingles turn brittle in sub-zero Idaho weather. Attempting to scrape snow cleanly down to bare shingle surface rips off ceramic protective granules, cracks adhesive tar strips, and voids manufacturer wind/weather warranties.",
          "Instead, we shave off the heavy upper structural mass and leave a uniform 1.5 to 2-inch buffer blanket directly above the shingles. That thin cushion weighs less than 2 PSF while shielding shingles completely from tool contact and UV shock.",
        ],
      },
      {
        id: "cedar-shake-and-flat-roofs",
        heading: "3. Delicate Cedar Wood Shake & Modern Flat / Low-Slope Roofs",
        paragraphs: [
          "Hand-split cedar shake cabins in McCall and Cascade catch snow grains in textured wood grain and split easily under boot impact. We use light hand-clearing patterns with wide weight-distributing staging.",
          "Contemporary flat and low-slope TPO/EPDM roofs common in the Boise Foothills and Bogus Basin rely on rubber-edged pushers plus open parapet scuppers so afternoon thaw doesn't pond over membrane seams.",
        ],
      },
    ],
    relatedLocationSlugs: ["bogus-basin", "garden-valley", "donnelly", "lake-fork"],
    faqs: [
      {
        question: "Does leaving 2 inches of snow on shingles cause ice dams?",
        answer:
          "No—leaving 2 inches uniformly across the upper roof removes 90% of the structural weight while cutting off the deep insulating snow blanket that traps heat. Along the lower 5–6 feet of eaves above gutters, we clear down safely and open drainage channels.",
      },
      {
        question: "Why are standing seam metal roofs so dangerous for DIY raking?",
        answer:
          "Pulling from the bottom edge of a slick metal pitch can release a sudden 1,500-pound snow avalanche directly onto the person holding the rake pole or onto lower patio glass.",
      },
      {
        question: "What tools does Idaho Snow Co. use on luxury roofs?",
        answer:
          "Heavy-duty non-marring polyethylene snow scoops, wheeled/cushioned telescoping roof rakes, rubber-edged flat roof pushers, and OSHA-certified roof harnesses.",
      },
    ],
  },
  {
    slug: "preventing-ice-dams-mccall-cascade-cabins",
    title:
      "Preventing & Safely Removing Ice Dams on McCall, Cascade & Garden Valley Cabins",
    shortTitle: "Preventing & Removing Ice Dams",
    description:
      "Why Highway 55 and Boise Basin cabins develop severe eave and pine-needle ice dams—plus why axes and rock salt destroy roofs compared to safe relief channeling.",
    category: "Ice Dam Mitigation",
    readTime: "6 min read",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-18",
    intro:
      "Few winter calls are more stressful than noticing water dripping through a living room recessed light or running down tongue-and-groove wood paneling in the middle of January. Along the Highway 55 corridor—especially in Cascade, McCall, Garden Valley, and Crouch—extreme day-to-night temperature swings and pine-needle debris turn harmless roof snow into destructive ice dams.",
    sections: [
      {
        id: "how-idaho-ice-dams-form",
        heading: "1. The Idaho Cabin Ice Dam Cycle Explained",
        paragraphs: [
          "Warm air escaping from cathedral ceilings, recessed lights, or poorly baffled cabin attics warms the upper roof deck above 32°F even when outside air is 10°F. Basal snow melts and trickles downward beneath the insulating snowpack until it hits the unheated roof overhang (the eaves).",
          "At the cold soffit line, that meltwater refreezes instantly into a growing ridge of solid ice. Subsequent meltwater backs up into a liquid pond trapped behind the ice wall—forcing water upward underneath shingle laps and into exterior walls.",
        ],
      },
      {
        id: "garden-valley-pine-needles",
        heading: "2. The Pine-Needle Trap in Garden Valley, Crouch & Idaho City",
        paragraphs: [
          "In wooded Boise Basin and Payette River communities, Ponderosa pine needles pile up in hidden roof valleys and gutters every autumn. Come winter, those wet needle mats freeze into solid concrete-like plugs inside downspouts and valleys.",
          "Once a valley drain freezes solid, midday sunshine melts surrounding snow straight into trapped valley channels that quickly breach skylight flashing and dormer walls.",
        ],
      },
      {
        id: "why-axes-and-salt-fail",
        heading: "3. Why Hammers, Axes & Rock Salt Cause Thousands in Roof Repairs",
        paragraphs: [
          "In panic, homeowners sometimes grab crowbars, hammers, or bags of driveway rock salt to break up eave ice. Steel impacts crack brittle sub-zero shingles and puncture underlayment—creating leaks that last for years.",
          "Meanwhile, sodium chloride rock salt corrodes galvanized gutters, copper flashing, and aluminum trim while killing ornamental trees below eaves.",
        ],
        bullets: [
          "Step 1: Strip away the snow blanket 5–6 feet up from the eave to halt active snowmelt.",
          "Step 2: Safely pare down excessive overhanging icicles and gutter weight.",
          "Step 3: Cut clean vertical relief channels straight through the ice ridge so trapped pools drain immediately.",
        ],
      },
    ],
    relatedLocationSlugs: ["cascade", "garden-valley", "crouch", "idaho-city"],
    faqs: [
      {
        question: "Can heat tape alone fix a McCall or Cascade ice dam?",
        answer:
          "Heat cables help keep narrow zigzag channels open along simple eaves, but during multi-foot McCall storms deep drifted snow frequently bridges right over heat tape unless surrounding snow load is cleared.",
      },
      {
        question: "Water is already dripping inside my cabin—what should I do right now?",
        answer:
          "Place a bucket under the drip, carefully clear any pooled snow away from exterior foundation vents if safe from the ground, and call (208) 965-4285 or select Priority 24-Hour Emergency Dispatch in our calculator so we can cut drainage relief channels immediately.",
      },
      {
        question: "Do I need a full roof shovel if I only have an ice dam along one north eave?",
        answer:
          "If upper roof snow depth is light, clearing the lower 6 feet above the dam plus cutting drainage channels is often enough. However, if 3+ feet sits across the roof, balanced unloading prevents repeat dams.",
      },
    ],
  },
  {
    slug: "out-of-town-cabin-owner-winter-roof-checklist",
    title:
      "The Out-of-Town Cabin Owner & STR Host Winter Roof Checklist (Boise to McCall)",
    shortTitle: "Out-of-Town Cabin Winter Checklist",
    description:
      "Essential winter roof, propane tank, deck, and photo-documentation checklist for Boise and out-of-state second-home owners and Airbnb/VRBO hosts in McCall, Tamarack, and Garden Valley.",
    category: "Second Homes & STRs",
    readTime: "5 min read",
    publishedAt: "2026-11-06",
    updatedAt: "2026-11-18",
    intro:
      "Owning a second home or short-term vacation rental in McCall, Donnelly, Cascade, or Crouch shouldn't require checking Highway 55 avalanche closures every Friday night. A proactive winter roof monitoring routine protects structural equity, keeps Airbnb/VRBO guests safe, and gives you clear photo documentation for insurance.",
    sections: [
      {
        id: "pre-winter-prep",
        heading: "1. Pre-Winter Prep: Mark Hazards Before the First Big Dump",
        paragraphs: [
          "Once three feet of snow blankets a cabin roof, hidden skylights, low plumbing stacks, satellite dishes, and deck hot tub covers vanish completely. Before November snow locks in, snap quick reference photos of roof penetrations and confirm driveway plow flags clearly mark propane regulators.",
        ],
        bullets: [
          "Clear pine needles out of all dead valleys, gutters, and downspout elbows.",
          "Mark buried propane risers and fuel fill ports with tall fiberglass snow stakes.",
          "Inspect attic bathroom fans to ensure humid guest shower air vents outside—not into cold soffits.",
        ],
      },
      {
        id: "storm-threshold-dispatch",
        heading: "2. Set a Clear Storm-Depth Trigger Instead of Guessing",
        paragraphs: [
          "Rather than waiting until an Airbnb guest complains about a sticky front door or ceiling drip, enroll your property with a set snow-depth threshold—typically 24–30 inches for standard roofs or 18–24 inches on older cabins and low-slope garages.",
          "When valley weather stations and storm totals cross your trigger, our Highway 55 crews check your property automatically without waiting for you to notice from Boise or out of state.",
        ],
      },
      {
        id: "photo-proof-and-guest-access",
        heading: "3. Photo Proof, Guest Decks & Hassle-Free Stripe Billing",
        paragraphs: [
          "Remote property care depends on verification. Every Idaho Snow Co. visit finishes with timestamped before-and-after photos showing balanced roof unloading, clear eaves, unobstructed propane regulators, and clean entry walkways—paired with instant online Stripe invoicing.",
        ],
      },
    ],
    relatedLocationSlugs: ["mccall", "donnelly", "smiths-ferry", "lowman"],
    faqs: [
      {
        question: "Do I have to meet the crew or leave a physical check at the cabin?",
        answer:
          "Never. As long as driveway access is plowed or reachable, we handle everything remotely, text before/after photos to your phone, and email a secure Stripe payment link.",
      },
      {
        question: "Can you clear snow off hot tub covers and guest entry stairs during roof visits?",
        answer:
          "Yes—simply check the Deck, Porch & Walkway Clearing add-on (or enroll your STR portfolio via our Property Managers page) so fallen roof blocks never block guest arrivals.",
      },
      {
        question: "Do timestamped photos help with mountain homeowner insurance policies?",
        answer:
          "Yes. Insurance underwriters increasingly ask for winter maintenance logs when reviewing ice-dam or roof-load claims on vacation properties.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
