import type { TravelZoneId } from "./pricing";

export interface LocationFaq {
  question: string;
  answer: string;
}

export interface LocationData {
  slug: string;
  name: string;
  shortName: string;
  county: string;
  zipCodes: string[];
  corridorZone: TravelZoneId;
  corridorLabel: string;
  elevationFt: string;
  annualSnowfall: string;
  designSnowLoad: string;
  highwayAccess: string;
  tagline: string;
  heroSummary: string;
  snowPatternSummary: string;
  subdivisionsAndLandmarks: string[];
  localRoofChallenges: {
    title: string;
    detail: string;
  }[];
  recommendedTimingNote: string;
  neighborSlugs: string[];
  faqs: LocationFaq[];
}

export const LOCATIONS: LocationData[] = [
  {
    slug: "mccall",
    name: "McCall",
    shortName: "McCall",
    county: "Valley County",
    zipCodes: ["83638"],
    corridorZone: "zone-1-payette-basin",
    corridorLabel: "Payette Lake & North Valley (Hwy 55)",
    elevationFt: "5,020 – 6,100 ft",
    annualSnowfall: "135 – 220+ in.",
    designSnowLoad: "100 – 150 psf",
    highwayAccess: "Highway 55 Milepost 142–148",
    tagline: "Payette Lake, Brundage Mountain & Ponderosa State Park Area",
    heroSummary:
      "Heavy lake-effect snowstorms off Payette Lake and mid-winter rain-on-snow events rapidly push McCall cabins near structural load limits. Our McCall roof crews clear standing seam metal, custom timber-frame lodges, and steep mountain A-frames using non-marring polyethylene equipment and timestamped storm photo verification.",
    snowPatternSummary:
      "McCall averages over 135 inches of snow in town and well over 200 inches on Brundage Mountain slopes and Aspen Ridge. Deep January cold snaps followed by wet February Pineapple Express surges turn light powder into dense 20+ lb/cu-ft slab loads that trigger roof truss stress and severe north-side ice damming.",
    subdivisionsAndLandmarks: [
      "Payette Lake Shoreline & East Side Drive",
      "Brundage Mountain Base & Goose Creek",
      "Ponderosa State Park & Lick Creek",
      "Whitetail Club & Jug Mountain Ranch",
      "Aspen Ridge & Spring Mountain Ranch",
      "Downtown McCall & Legacy Park",
    ],
    localRoofChallenges: [
      {
        title: "Lake-Effect Heavy Wet Slab Accumulation",
        detail:
          "Moisture rolling off unfrozen early-winter Payette Lake drops dense snow around East Side Drive, Pilgrim Cove, and Timberlost. Leaving deep loads unshoveled allows rain-on-snow events to double roof weight overnight.",
      },
      {
        title: "Complex Multi-Gable Timber & Valley Ice Dams",
        detail:
          "Luxury McCall homes and short-term rentals feature intersecting dormers and dead valleys that trap drifted snow, building 6-to-12-inch ice shelves that force meltwater beneath architectural shingles and skylights.",
      },
      {
        title: "Deck & Hot Tub Roof-Shed Crush Hazards",
        detail:
          "High-pitch standing seam roofs shed multi-ton cornices straight onto lakeside cedar decks, propane manifolds, and lower sunroom roofs—requiring coordinated roof unloading and deck clearing.",
      },
    ],
    recommendedTimingNote:
      "Active Payette Basin crews staged weekly—priority same-day storm relief available for active leaks and creaking doors.",
    neighborSlugs: ["lake-fork", "donnelly", "new-meadows", "cascade"],
    faqs: [
      {
        question: "How much snow on a McCall roof requires professional removal?",
        answer:
          "In McCall (ZIP 83638), Valley County design snow loads are high, yet settled snowpack above 2.5 to 3 feet—especially after a wet February storm or rain-on-snow—can exceed older cabin or garage capacities. Warning signs include sticking interior doors, drywall cracks, or visible eaves sagging.",
      },
      {
        question: "Do you protect standing seam metal roofs on Payette Lake homes?",
        answer:
          "Yes. Our crews use heavy-duty HDPE polyethylene blades and rubber-edged rakes that never score painted standing seam panels, snow guards, or copper flashing. For shingle roofs, we intentionally leave a 1.5–2 inch protective cushion so granules stay completely intact.",
      },
      {
        question: "Can out-of-town Boise or out-of-state owners book McCall snow removal remotely?",
        answer:
          "Absolutely. Most of our McCall clients manage second homes or VRBO/Airbnb properties from Boise or out of state. You receive timestamped before-and-after drone/roof photos via text or email plus a clean online Stripe invoice upon completion.",
      },
      {
        question: "Do you clear snow off decks, walkways, and propane tanks after unloading the roof?",
        answer:
          "Yes. Roof snow inevitably lands along perimeter eaves, decks, hot tubs, and emergency egress doors. Simply check the Deck, Porch & Walkway Clearing add-on in the quote calculator and our crew clears and stages all fallen snow safely.",
      },
    ],
  },
  {
    slug: "donnelly",
    name: "Donnelly",
    shortName: "Donnelly",
    county: "Valley County",
    zipCodes: ["83615"],
    corridorZone: "zone-1-payette-basin",
    corridorLabel: "Payette Lake & North Valley (Hwy 55)",
    elevationFt: "4,865 – 5,800 ft",
    annualSnowfall: "110 – 190 in.",
    designSnowLoad: "95 – 140 psf",
    highwayAccess: "Highway 55 Milepost 130 & West Mountain Rd",
    tagline: "Tamarack Resort, Lake Cascade West Side & Roseberry",
    heroSummary:
      "From high-altitude Tamarack Resort chalets on West Mountain to wind-scoured Lake Cascade cabins and historic Roseberry farmhouses, Donnelly roofs face intense wind-loading and rapid freeze-thaw ice buildup. Our crews arrive fully rigged for steep alpine pitches and multi-story lodges.",
    snowPatternSummary:
      "Open valley winds sweep across frozen Lake Cascade and pile 5-to-7-foot drifts onto leeward roof slopes along West Mountain and Norwood Road. Daytime sun at 5,000+ feet melts upper snow while sub-zero nights refreeze eaves into solid ice barriers.",
    subdivisionsAndLandmarks: [
      "Tamarack Resort Chalets & Osprey Meadows",
      "Lake Cascade West Side & Poison Creek",
      "Roseberry & Farm-to-Market Corridor",
      "Boulder Creek & Gold Fork Road",
      "Dawn Drive & Valley View Estates",
    ],
    localRoofChallenges: [
      {
        title: "Steep Tamarack Resort & Chalet Pitches",
        detail:
          "Mountain modern chalets and timber A-frames in Tamarack combine 8/12+ pitches with multi-level decks. Our OSHA tie-off rigging keeps technicians anchored while relieving asymmetric wind-drifted loads.",
      },
      {
        title: "Asymmetric Leeward Drifts Along Lake Cascade",
        detail:
          "Sustained crosswinds from the west pack heavy snow onto east-facing roof planes while stripping the windward side, creating unbalanced structural stress across roof trusses.",
      },
      {
        title: "Sun-Exposed South Eaves Freezing Into Solid Ice Dams",
        detail:
          "Bright Donnelly winter afternoons trigger daytime snowmelt that refreezes into thick gutter and soffit ice shelves by 4:30 PM, requiring strategic drainage channels.",
      },
    ],
    recommendedTimingNote:
      "Stationed between Cascade and McCall for fast Hwy 55 & West Mountain dispatch before weekend guest check-ins.",
    neighborSlugs: ["lake-fork", "mccall", "cascade", "new-meadows"],
    faqs: [
      {
        question: "Do you service high-pitch chalets inside Tamarack Resort?",
        answer:
          "Yes. We regularly clear custom chalets, townhomes, and vacation lodges around Tamarack Resort and West Mountain Road using full fall-arrest harness systems and roof-safe polymer shovels.",
      },
      {
        question: "Why does unbalanced snow drifting matter on Donnelly roofs?",
        answer:
          "Strong winds off Lake Cascade often blow snow off one side of a gable roof and pack 4+ feet onto the opposite side. Clearing both planes to a balanced profile prevents lateral truss racking and ceiling drywall cracking.",
      },
      {
        question: "Can you inspect and clear my Donnelly rental between Airbnb turnarounds?",
        answer:
          "Yes. We coordinate directly with owners and local property managers in ZIP 83615 to clear eaves, entryways, and decks before guest arrivals and text photo confirmation right when the crew rolls out.",
      },
      {
        question: "How quickly can a crew reach West Mountain after a big storm?",
        answer:
          "Because we work the Highway 55 corridor continuously throughout winter, standard Donnelly dispatches occur within 24–48 hours, with Priority 24-Hour Emergency Dispatch available for active leaks.",
      },
    ],
  },
  {
    slug: "cascade",
    name: "Cascade",
    shortName: "Cascade",
    county: "Valley County",
    zipCodes: ["83611"],
    corridorZone: "zone-1-payette-basin",
    corridorLabel: "Payette Lake & North Valley (Hwy 55)",
    elevationFt: "4,760 – 5,450 ft",
    annualSnowfall: "95 – 160 in.",
    designSnowLoad: "85 – 130 psf",
    highwayAccess: "Highway 55 Milepost 112–118 & Warm Lake Hwy",
    tagline: "Lake Cascade, Warm Lake, Crown Point & Clear Creek",
    heroSummary:
      "Cascade sits at the heart of Long Valley where bitter sub-zero inversions lock deep frost into roof eaves while Warm Lake Highway elevations accumulate relentless mid-winter snowpack. We keep Cascade cabins, boathouses, and residential roofs structurally safe and leak-free.",
    snowPatternSummary:
      "Temperatures in Cascade regularly dip below -15°F in clear winter high-pressure cells, chilling roof sheathing while heated living spaces radiate warmth upward. Combined with wet Warm Lake squalls and late-season rainstorms, thick ice dams form rapidly along gutters and valleys.",
    subdivisionsAndLandmarks: [
      "Crown Point & Lake Cascade East Shore",
      "Warm Lake Highway & Horsethief Reservoir",
      "Clear Creek Estates & Cabarton",
      "Downtown Cascade & Payette Riverfront",
      "Herrick Lane & Van Wyck Park Area",
    ],
    localRoofChallenges: [
      {
        title: "Sub-Zero Inversion Ice Dam Formation",
        detail:
          "Long Valley thermal inversions create steep temperature gradients across cabin attics, melting basal snow layers into stubborn ice dams that back water up under shingle eaves.",
      },
      {
        title: "Warm Lake & Clear Creek Heavy Elevation Loads",
        detail:
          "Properties heading east toward Warm Lake and Clear Creek receive markedly deeper moisture-rich snowfall than town center, requiring proactive mid-winter load reduction.",
      },
      {
        title: "Older Cabin & Garage Truss Protection",
        detail:
          "Vintage 1960s–1980s Lake Cascade A-frames and detached shops often lack modern 110+ psf truss bracing, making 3+ feet of wet spring snow a critical structural hazard.",
      },
    ],
    recommendedTimingNote:
      "Direct Highway 55 access with zero canyon detour delays for Cascade & Clear Creek properties.",
    neighborSlugs: ["donnelly", "smiths-ferry", "lake-fork", "mccall"],
    faqs: [
      {
        question: "Do you travel up Warm Lake Highway and into Clear Creek Estates?",
        answer:
          "Yes, we cover all of Cascade (ZIP 83611) including Crown Point, Clear Creek, Cabarton, and accessible stretches along Warm Lake Road and Horsethief Reservoir.",
      },
      {
        question: "How do you remove ice dams on Cascade cabins without tearing off shingles?",
        answer:
          "We never hack or chip ice off shingles with steel axes or heavy bars. Instead, we remove the insulating snowpack above the dam, safely pare down the ice ridge, and cut vertical meltwater relief channels down to the gutter line.",
      },
      {
        question: "My Cascade cabin roof is older cedar shake or corrugated metal—can you clear it?",
        answer:
          "Yes. Our quote calculator and crew protocol specifically adjust for cedar shake and older metal roofs, relying on gentle polymer tools and balanced load unloading.",
      },
      {
        question: "Do you also remove snow from detached garages and boat storage sheds?",
        answer:
          "We frequently bundle main cabins with detached RV/boat garages and outbuildings—these lower-pitch structures often carry higher structural failure risk during wet late-winter storms.",
      },
    ],
  },
  {
    slug: "lake-fork",
    name: "Lake Fork",
    shortName: "Lake Fork",
    county: "Valley County",
    zipCodes: ["83635"],
    corridorZone: "zone-1-payette-basin",
    corridorLabel: "Payette Lake & North Valley (Hwy 55)",
    elevationFt: "4,960 ft",
    annualSnowfall: "120 – 155 in.",
    designSnowLoad: "100 – 130 psf",
    highwayAccess: "Highway 55 Milepost 138–141",
    tagline: "Between Donnelly & McCall — Farm-to-Market & Valley Floor Homes",
    heroSummary:
      "Positioned right in the snow-belt corridor between Donnelly and McCall, Lake Fork homes catch full Valley County squalls plus ferocious east-west winds sweeping across open ranch meadows. We provide fast, reliable roof unloading and cornice mitigation across Lake Fork.",
    snowPatternSummary:
      "Open terrain along Farm-to-Market Road and Spink Lane accelerates blowing snow into hard-packed wind slabs along porch overhangs and low-pitch ranch roofs. Mid-winter warming cycles convert deep meadow drifts into heavy wet weight overnight.",
    subdivisionsAndLandmarks: [
      "Highway 55 Commercial & Residential Corridor",
      "Farm-to-Market Road & Elo Road",
      "Lake Fork Creek & Spink Lane",
      "Morgans Pasture & Pearson Lane",
    ],
    localRoofChallenges: [
      {
        title: "Hard-Packed Ranch Roof Wind Slabs",
        detail:
          "Unprotected pastures along Farm-to-Market and Elo Road allow wind to compact dry powder into dense 25+ lb/cu-ft slabs that stick tenaciously to low-slope roofs.",
      },
      {
        title: "Overhanging Eave Cornices Over Driveways",
        detail:
          "Deep snow creep creates massive 3-foot cornices curling off metal roofs directly above garage doors, electrical meters, and fuel tanks.",
      },
      {
        title: "Low-Slope Patio & Sunroom Roof Overload",
        detail:
          "Attached covered patios and breezeways between main homes and barns take shed snow from upper gables, multiplying localized roof load.",
      },
    ],
    recommendedTimingNote:
      "Located right on our primary Highway 55 North Valley route for rapid response between Donnelly and McCall.",
    neighborSlugs: ["mccall", "donnelly", "cascade", "new-meadows"],
    faqs: [
      {
        question: "How fast can Idaho Snow Co. get to Lake Fork?",
        answer:
          "Lake Fork (ZIP 83635) sits directly along our main Highway 55 service spine between Donnelly and McCall, giving local homeowners some of our fastest turnaround times in Valley County.",
      },
      {
        question: "Can you clear snow shed onto lower porch roofs and breezeways?",
        answer:
          "Yes—we make clearing secondary lower roofs, sheds, and attached garages a standard priority because shed snow from upper metal pitches carries double the density of undisturbed snowfall.",
      },
      {
        question: "Do you cut back dangerous curling snow cornices on metal roofs?",
        answer:
          "Yes. Cornices overhanging garages, walkways, and gas meters are relieved cleanly before warm spells cause sudden 500-pound roof avalanches.",
      },
      {
        question: "What does Lake Fork roof snow removal typically cost?",
        answer:
          "Use our instant calculator pre-set to Lake Fork above to see an immediate price range based on square footage, material, pitch, and snow depth—no phone wait required.",
      },
    ],
  },
  {
    slug: "new-meadows",
    name: "New Meadows",
    shortName: "New Meadows",
    county: "Adams County",
    zipCodes: ["83654"],
    corridorZone: "zone-1-payette-basin",
    corridorLabel: "Payette Lake & North Valley (Hwy 55)",
    elevationFt: "3,870 – 4,400 ft",
    annualSnowfall: "85 – 145 in.",
    designSnowLoad: "80 – 120 psf",
    highwayAccess: "Highway 55 & Highway 95 Junction",
    tagline: "MeadowCreek Golf Resort, Highway 55/95 Junction & Circle C",
    heroSummary:
      "New Meadows endures Adams County's coldest winter lows and heavy wet storm fronts sweeping down from Brundage and Goose Lake. Whether you own a resort home in MeadowCreek or a historic ranch residence near the Hwy 55/95 junction, our crews protect roofs against brutal freeze-thaw damage.",
    snowPatternSummary:
      "Famous for Idaho's coldest morning temperatures, New Meadows routinely drops to -25°F before spring chinook winds flood the valley with dense wet snow and rain. That extreme freeze-thaw swing makes ice dam prevention and valley clearing indispensable.",
    subdivisionsAndLandmarks: [
      "MeadowCreek Golf Resort & Timberline",
      "Highway 55 / Highway 95 Junction",
      "Circle C Subdivision & Goose Creek",
      "Little Salmon River & Zim's Hot Springs Area",
    ],
    localRoofChallenges: [
      {
        title: "Extreme -20°F Sub-Zero Eave Freezing",
        detail:
          "Bitter cold pockets trap thick basal ice inside gutters and downspouts across MeadowCreek homes even when afternoon sunshine melts upper shingles.",
      },
      {
        title: "Chinook Wet-Snow Rain Saturation",
        detail:
          "Lower valley elevations catch winter rain events on top of existing 3-foot snowpack, dramatically spiking pounds-per-square-foot weight across timber trusses.",
      },
      {
        title: "Large Custom Log Home Valley & Dormer Traps",
        detail:
          "MeadowCreek log and mountain-craftsman homes feature expansive wrap-around porches and deep dormer valleys that hold massive snow drifts all winter.",
      },
    ],
    recommendedTimingNote:
      "Extended North Valley service directly west of McCall along Hwy 55 into Adams County.",
    neighborSlugs: ["mccall", "lake-fork", "donnelly", "cascade"],
    faqs: [
      {
        question: "Do you serve MeadowCreek Golf Resort and rural New Meadows roads?",
        answer:
          "Yes, we actively service MeadowCreek, Circle C, Goose Creek, and residential properties around the Highway 55/95 junction in ZIP 83654.",
      },
      {
        question: "Why do MeadowCreek homes get such thick ice dams despite sunny days?",
        answer:
          "New Meadows experiences dramatic 40-to-50 degree daily temperature swings. Snow melts in afternoon sun and instantly flash-freezes into solid ice once it hits shaded eaves.",
      },
      {
        question: "Is wet snow after a January rainstorm an emergency?",
        answer:
          "Yes—water adds roughly 5.2 lbs per square foot for every inch of rain absorbed into existing roof snow. If you have 3+ feet of snow followed by rain, schedule clearing immediately.",
      },
      {
        question: "Can I add seasonal storm checks for my New Meadows vacation property?",
        answer:
          "Yes. Select Out-of-Town Cabin Seasonal Monitoring in our quote builder to get proactive storm-triggered roof checks with photo reports.",
      },
    ],
  },
  {
    slug: "garden-valley",
    name: "Garden Valley",
    shortName: "Garden Valley",
    county: "Boise County",
    zipCodes: ["83622"],
    corridorZone: "zone-2-canyon-payette-fork",
    corridorLabel: "Payette River Canyon & Garden Valley",
    elevationFt: "3,140 – 4,100 ft",
    annualSnowfall: "55 – 95 in.",
    designSnowLoad: "65 – 95 psf",
    highwayAccess: "Banks-Lowman Hwy (Hwy 17) & Alder Creek",
    tagline: "South Fork Payette, Terrace Lakes Resort & Warm Springs",
    heroSummary:
      "Garden Valley and Terrace Lakes sit right in Idaho's wettest freeze-thaw zone: heavy Sierra-style wet snowfall followed by sunny 38°F afternoons and deep frost nights. Pine needle debris and thick wet snow team up here to build destructive ice dams on cabin roofs.",
    snowPatternSummary:
      "Unlike dry northern powder, Garden Valley snowfall packs immense water content right off the storm front. Ponderosa pine needles clogging gutters trap melting slush at the eave line, creating ice barriers that force water behind cabin siding and soffits.",
    subdivisionsAndLandmarks: [
      "Terrace Lakes Resort & Golf Community",
      "South Fork Payette Riverfront Cabins",
      "Castle Mountain & Alder Creek",
      "Banks-Lowman Road Corridor & Scriver Creek",
    ],
    localRoofChallenges: [
      {
        title: "Pine-Needle Clogged Gutter & Eave Ice Dams",
        detail:
          "Towering Ponderosa pines drop heavy needle mats into roof valleys and gutters; when snow melts, needles act as a sponge that freezes solid overnight.",
      },
      {
        title: "High-Moisture Wet Snow Adhesion",
        detail:
          "Low-to-mid-elevation Garden Valley snow arrives heavy and sticky, adhering tightly to architectural shingles and weighing down covered porches and RV carports.",
      },
      {
        title: "Shaded Canyon North-Slope Snow Retention",
        detail:
          "Cabins tucked under dense river-canyon tree canopy rarely see winter sunlight, letting wet storm layers stack week after week without natural sublimation.",
      },
    ],
    recommendedTimingNote:
      "Fast access off Highway 55 via Banks-Lowman Highway 17 for Terrace Lakes & riverfront cabins.",
    neighborSlugs: ["crouch", "smiths-ferry", "lowman", "bogus-basin"],
    faqs: [
      {
        question: "Why do Terrace Lakes cabins get worse ice dams than dry mountain towns?",
        answer:
          "Garden Valley sits at an elevation where winter storms regularly hover near 30–34°F, producing wet snow followed by chilly nights. Combined with pine needles in valleys and gutters, water backs up rapidly behind frozen eave dams.",
      },
      {
        question: "Do you clear snow off detached garages, RV covers, and hot tub gazebos?",
        answer:
          "Yes. RV carports and porch awnings in Terrace Lakes and along the South Fork are frequently the first structures damaged by wet Garden Valley snowstorms.",
      },
      {
        question: "Do you work in gated or steep hillside driveways in Garden Valley?",
        answer:
          "Yes—our winter trucks carry chains and all-terrain gear for steep Terrace Lakes and Alder Creek roads. Just note any gate codes or plow status when submitting your quote.",
      },
      {
        question: "Do you send photo proof if I live in Boise and my cabin is in Garden Valley?",
        answer:
          "Every Garden Valley job includes before-and-after photo documentation sent directly to your phone and email so you never have to drive Highway 17 in snowy conditions just to check your roof.",
      },
    ],
  },
  {
    slug: "crouch",
    name: "Crouch",
    shortName: "Crouch",
    county: "Boise County",
    zipCodes: ["83622"],
    corridorZone: "zone-2-canyon-payette-fork",
    corridorLabel: "Payette River Canyon & Garden Valley",
    elevationFt: "3,180 – 4,300 ft",
    annualSnowfall: "60 – 105 in.",
    designSnowLoad: "70 – 100 psf",
    highwayAccess: "Middle Fork Road & Banks-Lowman Hwy",
    tagline: "Middle Fork Payette, Pine-Canopy Cabins & Weekend Retreats",
    heroSummary:
      "Nestled along the Middle Fork of the Payette River, Crouch features tightly wooded cabin neighborhoods, A-frame retreats, and full-time mountain homes where deep canopy shade prevents winter melt-off. We keep Crouch cabin roofs, metal awnings, and entry decks safe all season.",
    snowPatternSummary:
      "Dense pine canopies along Middle Fork Road keep north-facing roof pitches perpetually frozen from December through March. Storms lay down heavy damp snow that freezes to eave edges and traps water behind pine-needle-filled valleys.",
    subdivisionsAndLandmarks: [
      "Downtown Crouch & Middle Fork Rd",
      "Silver Creek Plunge Corridor",
      "Boiling Springs & Lightning Creek",
      "Tie Creek & Alpine Meadow Cabins",
    ],
    localRoofChallenges: [
      {
        title: "Pine-Needle Valley Dams & Soffit Leaks",
        detail:
          "Heavy tree cover drops cones and needles into hidden cabin roof valleys, blocking winter runoff and causing leaks directly above living room tongue-and-groove ceilings.",
      },
      {
        title: "Perpetually Shaded North Roof Ice Shelf Growth",
        detail:
          "While south-facing slopes drip in midday warmth, Crouch's tree-shaded north eaves stack multi-layer ice ridges capable of bending aluminum gutters off fascia boards.",
      },
      {
        title: "Weekend Cabin Unmonitored Storm Damage",
        detail:
          "Empty second homes lose interior heat uniformity or suffer unseen power outages, allowing multi-storm snow loads to accumulate unnoticed until spring leaks appear.",
      },
    ],
    recommendedTimingNote:
      "Paired with Garden Valley routes for seamless Middle Fork & Banks-Lowman corridor response.",
    neighborSlugs: ["garden-valley", "lowman", "smiths-ferry", "bogus-basin"],
    faqs: [
      {
        question: "Do you cover remote cabins up Middle Fork Road north of Crouch?",
        answer:
          "Yes, we serve Crouch proper and accessible mountain cabin subdivisions up Middle Fork Road, Tie Creek, and surrounding Boise National Forest corridors.",
      },
      {
        question: "Can you clear heavy snow off an A-frame cabin with steep metal siding?",
        answer:
          "Yes. Classic Crouch A-frames require certified rope-and-harness fall protection and cautious bottom-up clearing so heavy sheets don't slide unpredictably onto crews or decks.",
      },
      {
        question: "Can you check my Crouch short-term rental after each winter storm?",
        answer:
          "Yes. Enroll in our Out-of-Town Cabin Monitoring add-on and we automatically verify roof load, clear eave ice if needed, and text you photo proof after storms.",
      },
      {
        question: "Will roof snow clearing prevent my gutters from ripping off?",
        answer:
          "Relieving the lower 4–6 feet of heavy wet snow and cutting ice dam channels removes hundreds of pounds of downward torque that snaps gutter spikes and fascia trim.",
      },
    ],
  },
  {
    slug: "smiths-ferry",
    name: "Smiths Ferry",
    shortName: "Smiths Ferry",
    county: "Valley County",
    zipCodes: ["83611"],
    corridorZone: "zone-2-canyon-payette-fork",
    corridorLabel: "Payette River Canyon & Garden Valley",
    elevationFt: "4,550 ft",
    annualSnowfall: "95 – 145 in.",
    designSnowLoad: "90 – 125 psf",
    highwayAccess: "Highway 55 Milepost 96–104 (North Fork Payette Canyon)",
    tagline: "Highway 55 Canyon & North Fork Payette Riverfront Cabins",
    heroSummary:
      "Straddling the dramatic granite gorge of the North Fork Payette River along Highway 55, Smiths Ferry cabins sit in deep canyon shadow all winter—holding damp river mist frost and relentless canyon snowfall well into April.",
    snowPatternSummary:
      "Steep canyon walls block low winter sun along the river corridor, preventing natural daytime snow melt. Moisture rising off rapid river currents coats metal roofs in slick hoarfrost beneath deep storm snow, creating sudden slide hazards and stubborn shaded ice.",
    subdivisionsAndLandmarks: [
      "Highway 55 Riverfront Cabins & Milepost 99",
      "Cougar Mountain & Round Valley Creek",
      "Tripod Peak & Tripod Reservoir Access",
      "Smiths Ferry Bridge & North Fork Gorge",
    ],
    localRoofChallenges: [
      {
        title: "Zero-Sun Canyon Shadow Snow Retention",
        detail:
          "Granite walls shield riverfront homes from winter sunlight for months, meaning every storm stacks cleanly atop the last with zero evaporation.",
      },
      {
        title: "River-Mist Basal Hoarfrost & Sudden Metal Slides",
        detail:
          "Open North Fork Payette water creates dense freezing fog that glazes standing seam panels under snowpack—ready to shear onto propane tanks and entry stairs without warning.",
      },
      {
        title: "Narrow Canyon Driveways & Steep Access Rigging",
        detail:
          "Our Highway 55 corridor crews are stationed directly along the canyon route and know how to stage safely without blocking tight mountain access.",
      },
    ],
    recommendedTimingNote:
      "We drive right past Smiths Ferry on every Highway 55 run—easy route stop-ins with zero lost dispatch time.",
    neighborSlugs: ["cascade", "garden-valley", "crouch", "donnelly"],
    faqs: [
      {
        question: "Do you stop in Smiths Ferry on your Highway 55 routes?",
        answer:
          "Yes! Smiths Ferry is right on Highway 55 between Banks and Cascade, making it effortless for our Valley County crews to stop in for roof clearing and riverfront cabin checks.",
      },
      {
        question: "Why does snow stay on my Smiths Ferry roof weeks longer than in Boise or Cascade?",
        answer:
          "Steep North Fork canyon ridges shade riverfront properties from winter sunlight while canyon humidity keeps snow dense and bonded to eaves.",
      },
      {
        question: "Can you clear snow buildup protecting our propane tank and exterior stairs?",
        answer:
          "Yes—protecting propane regulators, meter risers, and entry stairs from roof-shed crushing is one of our most requested Smiths Ferry add-ons.",
      },
      {
        question: "Do I need to be on-site for a Smiths Ferry roof clearing?",
        answer:
          "Not at all. As long as driveway access is plowed or reachable on foot, we complete the clearing, snap before/after timestamped photos, and send an online invoice.",
      },
    ],
  },
  {
    slug: "idaho-city",
    name: "Idaho City",
    shortName: "Idaho City",
    county: "Boise County",
    zipCodes: ["83631"],
    corridorZone: "zone-3-boise-basin-foothills",
    corridorLabel: "Boise Basin & High Foothills",
    elevationFt: "3,910 – 5,100 ft",
    annualSnowfall: "75 – 140 in.",
    designSnowLoad: "80 – 120 psf",
    highwayAccess: "Ponderosa Pine Scenic Byway (Highway 21)",
    tagline: "Highway 21, Boise Basin Historic & Mountain Timber Homes",
    heroSummary:
      "Protecting both 19th-century historic roofs along Main Street and high-elevation mountain homes climbing Highway 21 toward Mores Creek Summit. Idaho City's wet Pacific storm tracks demand gentle, load-balanced snow removal that respects older framing and modern custom timber alike.",
    snowPatternSummary:
      "Highway 21 acts as a moisture funnel straight up into the Boise Basin. Storms often begin as heavy wet snow at 3,900 feet before climbing into deep powder pockets toward Centerville, Placerville, and Mores Creek, creating thick basal ice across historic and modern cabins alike.",
    subdivisionsAndLandmarks: [
      "Historic Downtown Idaho City & Main Street",
      "Robie Creek & Wilderness Ranch",
      "Mores Creek Summit Corridor (Hwy 21)",
      "Centerville, Placerville & Elk Creek",
    ],
    localRoofChallenges: [
      {
        title: "Vintage Framing & Historic Roof Preservation",
        detail:
          "Century-old miners' cottages, board-and-batten storefronts, and hand-framed roofs need careful balanced unloading so asymmetrical shifting never cracks historic rafters.",
      },
      {
        title: "Wilderness Ranch & Robie Creek Wet-Snow Storms",
        detail:
          "Boise Basin foothills catch massive Pacific precipitation surges that load roofs with dense 20+ lb/cu-ft snow right at the rain-snow line.",
      },
      {
        title: "Deep Forest Needle & Ice Accumulation",
        detail:
          "Surrounding Boise National Forest pines drop debris into roof valleys, triggering persistent eave ice dams on shaded forest lots.",
      },
    ],
    recommendedTimingNote:
      "Dedicated Highway 21 dispatch direct from the Treasure Valley up into Wilderness Ranch and Idaho City.",
    neighborSlugs: ["bogus-basin", "lowman", "garden-valley", "crouch"],
    faqs: [
      {
        question: "How far up Highway 21 do you service around Idaho City?",
        answer:
          "We service the entire Highway 21 Boise Basin corridor from Lucky Peak / Wilderness Ranch / Robie Creek right through Idaho City (ZIP 83631), Centerville, and accessible Mores Creek neighborhoods.",
      },
      {
        question: "Are your tools safe for older historic Idaho City roofs and corrugated metal?",
        answer:
          "Yes. We use lightweight polymer blades and strictly follow balanced snow-unloading sequences so older rafters never experience sudden asymmetric torque.",
      },
      {
        question: "Do you handle steep wooded driveways in Wilderness Ranch?",
        answer:
          "Yes—we equip our service rigs with tire chains and mountain recovery gear for steep Basin driveways. Just let us know current plow conditions when booking.",
      },
      {
        question: "Can you address active ice dam leaks during a mid-winter thaw?",
        answer:
          "Yes. Select Priority 24-Hour Emergency Dispatch and Ice Dam Removal in the quote tool to get emergency melt-channel cutting and snow load relief fast.",
      },
    ],
  },
  {
    slug: "lowman",
    name: "Lowman",
    shortName: "Lowman",
    county: "Boise County",
    zipCodes: ["83637"],
    corridorZone: "zone-2-canyon-payette-fork",
    corridorLabel: "Payette River Canyon & Garden Valley",
    elevationFt: "3,800 – 5,300 ft",
    annualSnowfall: "110 – 175 in.",
    designSnowLoad: "95 – 135 psf",
    highwayAccess: "Highway 21 & Banks-Lowman Hwy Junction",
    tagline: "South Fork Payette Deep-Snow Remote Cabins & Off-Grid Retreats",
    heroSummary:
      "Where Highway 21 meets the Banks-Lowman corridor, remote South Fork Payette cabins endure towering alpine snowpacks, heavy timber canopy fall, and weeks of deep freezing inversions. We deliver dependable, self-sufficient roof relief to Lowman's most secluded mountain retreats.",
    snowPatternSummary:
      "Lowman sits inside a high-moisture convergence pocket at the edge of the Sawtooth and Boise National Forests. Deep multi-foot storms roll straight over Banner Summit and Pilot Peak, burying off-grid solar panels, skylights, and steep cabin roofs.",
    subdivisionsAndLandmarks: [
      "Lowman Store & Hwy 21 / Hwy 17 Junction",
      "South Fork Payette River Cabins",
      "Warm Springs Creek & Kirkham Hot Springs Area",
      "Clear Creek & Deadwood Reservoir Turnoff",
    ],
    localRoofChallenges: [
      {
        title: "Multi-Storm Deep Snowpack & Solar Array Burial",
        detail:
          "Off-grid Lowman cabins lose winter power when deep snow buries roof-mounted solar arrays and attic vents—requiring gentle panel-safe clearing alongside full roof unloading.",
      },
      {
        title: "Heavy Mid-Winter Load Above Remote River Cabins",
        detail:
          "Without nearby emergency municipal equipment, proactive load clearing prevents costly structural repairs miles from Boise.",
      },
      {
        title: "Stove Pipe, Chimney & Plumbing Vent Shearing",
        detail:
          "Creeping 4-foot snow slabs on steep metal roofs tear away woodstove flues and PVC plumbing stacks unless snow guards and upper loads are carefully cleared.",
      },
    ],
    recommendedTimingNote:
      "Self-sufficient canyon crews traveling via Highway 17 (Garden Valley) or Highway 21 (Idaho City).",
    neighborSlugs: ["crouch", "garden-valley", "idaho-city", "smiths-ferry"],
    faqs: [
      {
        question: "Do you actually send crews all the way out to Lowman (83637)?",
        answer:
          "Yes! We serve Lowman cabins accessible via Banks-Lowman Road (Hwy 17) and Highway 21, including South Fork riverfront retreats, off-grid cabins, and properties near Kirkham.",
      },
      {
        question: "Can you safely clear snow off roof-mounted off-grid solar panels?",
        answer:
          "Yes. We use soft foam and non-abrasive poly rakes around glass solar arrays, chimney flues, and skylight domes to restore power without scratching tempered glass.",
      },
      {
        question: "My Lowman driveway isn't plowed to the back door—can you still reach the cabin?",
        answer:
          "As long as there is safe truck turnaround on a maintained road within reasonable snowshoe walk-in distance, our crew brings full harnesses and gear in on foot.",
      },
      {
        question: "Why should Lowman metal roofs still be cleared if snow usually slides off?",
        answer:
          "Thick snow anchored by chimney pipes, roof valleys, or heavy eave ice locks in place instead of sliding—putting extreme lateral strain on stove flues and flashing.",
      },
    ],
  },
  {
    slug: "bogus-basin",
    name: "Bogus Basin & Boise Foothills",
    shortName: "Bogus Basin / Foothills",
    county: "Ada & Boise County",
    zipCodes: ["83702", "83714"],
    corridorZone: "zone-3-boise-basin-foothills",
    corridorLabel: "Boise Basin & High Foothills",
    elevationFt: "3,400 – 6,200 ft",
    annualSnowfall: "45 – 180+ in.",
    designSnowLoad: "50 – 130 psf",
    highwayAccess: "Bogus Basin Rd & Cartwright / Dry Creek Corridor",
    tagline: "High-Elevation Boise Foothill Estates, Cartwright & Bogus Basin Cabins",
    heroSummary:
      "Just minutes above downtown Boise yet thousands of feet higher in microclimate intensity, Bogus Basin Road, Dry Creek, and Hidden Springs upper ridge estates shift rapidly from valley rain to blinding foothill blizzards and wind-scoured snow loads.",
    snowPatternSummary:
      "Elevation jumps from 2,800 ft in Boise to over 6,100 ft up Bogus Basin Road mean valley rainstorms routinely dump 18–30 inches of wet cement snow on high-ridge foothill homes, creating intense structural weight and north-facing valley ice dams.",
    subdivisionsAndLandmarks: [
      "Bogus Basin Mountain Homes & Upper Rd",
      "Cartwright Road & Dry Creek Valley",
      "Highlands, Crane Creek & Table Rock Ridge",
      "Hidden Springs Upper Foothills (83714)",
    ],
    localRoofChallenges: [
      {
        title: "Valley-Rain-to-Foothill-Wet-Snow Elevation Shock",
        detail:
          "Boise foothill estates above 3,800 ft catch ultra-dense wet snow whenever Treasure Valley storms hover near freezing, overloading flat modern roofs and architectural overhangs.",
      },
      {
        title: "Modern Flat & Low-Slope Architectural Roof Ponding",
        detail:
          "Luxury Boise Foothill homes often feature contemporary low-slope TPO/EPDM roofs and concealed parapet scuppers that plug with slush and cause immediate ceiling leaks.",
      },
      {
        title: "Steep Ridge Winds & Chimney Cricket Ice",
        detail:
          "Exposed ridge lines along Bogus Basin Road whip drifting snow into high-angle valleys and behind stone chimney crickets.",
      },
    ],
    recommendedTimingNote:
      "Fastest same-day response from our Treasure Valley staging hub—zero highway pass closure delays.",
    neighborSlugs: ["idaho-city", "garden-valley", "crouch", "smiths-ferry"],
    faqs: [
      {
        question: "Do you handle contemporary flat roofs in the Boise Foothills (83702 / 83714)?",
        answer:
          "Yes. Many high-end foothill estates feature flat or low-slope membrane roofs with parapet walls. We use rubber-edge pushers to protect TPO/EPDM membranes and clear frozen drain scuppers.",
      },
      {
        question: "Why does Bogus Basin Road get so much heavier roof load than Boise proper?",
        answer:
          "Every 1,000 feet of elevation gain drops temperatures 3.5–5°F and doubles or triples moisture snowfall accumulation—turning harmless Boise drizzle into dense, structural foothill snow.",
      },
      {
        question: "Can you schedule same-day snow clearing before a weekend freeze in the Highlands or Dry Creek?",
        answer:
          "Yes. Because our Treasure Valley launch team sits right at the base of Highway 55 and the Foothills, we offer fast same-day and next-day storm dispatch for 83702 and 83714.",
      },
      {
        question: "Do you clear snow guards and upper decks on multi-story Boise Foothill homes?",
        answer:
          "Yes—we safely clear multi-tier composite decks, outdoor kitchens, and balcony roofs alongside main roof load removal.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): LocationData | undefined {
  return LOCATIONS.find((loc) => loc.slug === slug);
}

export function getNeighborLocations(slug: string): LocationData[] {
  const current = getLocationBySlug(slug);
  if (!current) return LOCATIONS.slice(0, 4);

  return current.neighborSlugs
    .map((nSlug) => getLocationBySlug(nSlug))
    .filter((loc): loc is LocationData => Boolean(loc));
}

export function getLocationsByCorridorZone(): {
  zoneId: TravelZoneId;
  zoneTitle: string;
  locations: LocationData[];
}[] {
  const groups: {
    zoneId: TravelZoneId;
    zoneTitle: string;
    locations: LocationData[];
  }[] = [
    {
      zoneId: "zone-1-payette-basin",
      zoneTitle: "Payette Lake & North Valley (Hwy 55)",
      locations: [],
    },
    {
      zoneId: "zone-2-canyon-payette-fork",
      zoneTitle: "Payette River Canyon & Garden Valley",
      locations: [],
    },
    {
      zoneId: "zone-3-boise-basin-foothills",
      zoneTitle: "Boise Basin & High Foothills",
      locations: [],
    },
  ];

  for (const loc of LOCATIONS) {
    const group = groups.find((g) => g.zoneId === loc.corridorZone);
    if (group) {
      group.locations.push(loc);
    }
  }

  return groups;
}
