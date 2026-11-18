window.PH_BRANDS = ["Thorne", "Designs for Health", "Designs for Sport", "Klean Athlete", "AOR"];

// The research-backed essentials, in order of how often they're bought and studied.
window.PH_CATEGORIES = [
  "Creatine",
  "Protein",
  "Electrolytes",
  "Omega-3",
  "Vitamin D",
  "Magnesium",
  "Multivitamin",
  "Probiotic",
  "Collagen",
  "Zinc",
  "Specialty",
];

// Shown first and kept one tap away in the shop navigation.
window.PH_STAPLES = ["Creatine", "Protein", "Electrolytes", "Magnesium", "Omega-3", "Vitamin D"];

window.PH_STACK_DISCOUNT = 0.1;

// certified: NSF Certified for Sport (tested for substances banned by WADA / USADA / NCAA).
window.PH_PRODUCTS = [
  { id: "klean-creatine", brand: "Klean Athlete", category: "Creatine", certified: true, name: "Klean Creatine", format: "Creapure\u00ae powder, 315 g", price: 36, image: "images/products/klean-creatine.jpg" },
  { id: "dfs-creatine-monohydrate", brand: "Designs for Sport", category: "Creatine", certified: true, name: "Creatine Monohydrate", format: "Powder, 60 servings", price: 45, image: "images/products/dfs-creatine-monohydrate.webp" },
  { id: "thorne-creatine", brand: "Thorne", category: "Creatine", certified: true, name: "Creatine", format: "Powder, 90 servings", price: 52, image: "images/products/thorne-creatine.webp" },

  { id: "dfs-hydrolyzed-whey-protein", brand: "Designs for Sport", category: "Protein", certified: true, name: "Hydrolyzed Whey Protein", format: "Vanilla, 600 g", price: 89, image: "images/products/dfs-hydrolyzed-whey-protein.webp" },
  { id: "dfs-hydrolyzed-iso-whey-protein", brand: "Designs for Sport", category: "Protein", certified: true, name: "Hydrolyzed ISO-Whey Protein", format: "Powder", price: 95, image: "images/products/dfs-hydrolyzed-iso-whey-protein.webp" },
  { id: "thorne-whey-protein-isolate", brand: "Thorne", category: "Protein", certified: true, name: "Whey Protein Isolate", format: "Vanilla, 30 servings", price: 82, image: "images/products/thorne-whey-protein-isolate.webp" },

  { id: "dfs-hydration-packs", brand: "Designs for Sport", category: "Electrolytes", certified: true, name: "Hydration Packs", format: "Clementine, 14 stick packs", price: 42, image: "images/products/dfs-hydration-packs.webp" },

  { id: "dfh-omegavail-hi-po", brand: "Designs for Health", category: "Omega-3", certified: false, name: "OmegAvail\u2122 Hi-Po", format: "120 softgels", price: 54, image: "images/products/dfh-omegavail-hi-po.webp" },

  { id: "dfh-vitamin-d-supreme", brand: "Designs for Health", category: "Vitamin D", certified: false, name: "Vitamin D Supreme\u2122", format: "60 capsules", price: 34, image: "images/products/dfh-vitamin-d-supreme.webp" },
  { id: "thorne-vitamin-d-k2-liquid", brand: "Thorne", category: "Vitamin D", certified: false, name: "Vitamin D + K2 Liquid", format: "30 mL", price: 38, image: "images/products/thorne-vitamin-d-k2-liquid.webp" },
  { id: "aor-vitamin-d3", brand: "AOR", category: "Vitamin D", certified: false, name: "Vitamin D3 1000 IU", format: "120 softgels", price: 16, image: "images/products/aor-vitamin-d3.png" },

  { id: "thorne-magnesium-bisglycinate", brand: "Thorne", category: "Magnesium", certified: true, name: "Magnesium Bisglycinate", format: "Powder, 60 servings", price: 48, image: "images/products/thorne-magnesium-bisglycinate.webp" },
  { id: "aor-magnesium-glycinate", brand: "AOR", category: "Magnesium", certified: false, name: "Magnesium Glycinate", format: "90 capsules", price: 30, image: "images/products/aor-magnesium-glycinate.png" },
  { id: "dfh-magnesium-malate", brand: "Designs for Health", category: "Magnesium", certified: false, name: "Magnesium Malate", format: "180 capsules", price: 42, image: "images/products/dfh-magnesium-malate.webp" },

  { id: "thorne-basic-nutrients-2-day", brand: "Thorne", category: "Multivitamin", certified: true, name: "Basic Nutrients 2/Day", format: "60 capsules", price: 52, image: "images/products/thorne-basic-nutrients-2-day.webp" },
  { id: "dfh-complete-multi", brand: "Designs for Health", category: "Multivitamin", certified: false, name: "Complete Multi\u2122", format: "180 capsules", price: 62, image: "images/products/dfh-complete-multi.webp" },
  { id: "aor-ortho-core", brand: "AOR", category: "Multivitamin", certified: false, name: "Ortho Core\u00ae", format: "180 capsules", price: 82, image: "images/products/aor-ortho-core.png" },

  { id: "thorne-florasport-20b", brand: "Thorne", category: "Probiotic", certified: true, name: "FloraSport 20B", format: "30 capsules", price: 52, image: "images/products/thorne-florasport-20b.webp" },
  { id: "dfh-probiotic-synergy", brand: "Designs for Health", category: "Probiotic", certified: false, name: "Probiotic Synergy\u2122", format: "30 packets", price: 58, image: "images/products/dfh-probiotic-synergy.webp" },

  { id: "thorne-collagen-plus", brand: "Thorne", category: "Collagen", certified: false, name: "Collagen Plus", format: "Powder, 30 servings", price: 72, image: "images/products/thorne-collagen-plus.webp" },

  { id: "dfh-zinc-supreme", brand: "Designs for Health", category: "Zinc", certified: false, name: "Zinc Supreme\u2122", format: "90 capsules", price: 32, image: "images/products/dfh-zinc-supreme.webp" },

  { id: "thorne-curcumin-phytosome-sr", brand: "Thorne", category: "Specialty", certified: false, name: "Curcumin Phytosome SR", format: "60 capsules", price: 78, image: "images/products/thorne-curcumin-phytosome-sr.webp" },
  { id: "thorne-pharmagaba-250", brand: "Thorne", category: "Specialty", certified: false, name: "PharmaGABA-250", format: "60 capsules", price: 52, image: "images/products/thorne-pharmagaba-250.webp" },
  { id: "thorne-stress-b-complex", brand: "Thorne", category: "Specialty", certified: false, name: "Stress B-Complex", format: "60 capsules", price: 36, image: "images/products/thorne-stress-b-complex.webp" },
  { id: "aor-ortho-sleep", brand: "AOR", category: "Specialty", certified: false, name: "Ortho Sleep\u2122", format: "60 capsules", price: 44, image: "images/products/aor-ortho-sleep.png" },
  { id: "aor-ortho-adapt", brand: "AOR", category: "Specialty", certified: false, name: "Ortho Adapt\u00ae", format: "120 capsules", price: 56, image: "images/products/aor-ortho-adapt.png" },
];

window.PH_STACKS = [
  {
    id: "sleep",
    name: "Sleep",
    tagline: "Wind down, stay down.",
    summary: "Relaxed muscles and a quieter mind before bed. For clients who carry tension into the night.",
    items: [
      { id: "thorne-magnesium-bisglycinate", note: "Gentle, well-absorbed magnesium for muscle relaxation." },
      { id: "thorne-pharmagaba-250", note: "Natural-source GABA to quiet a busy mind." },
    ],
  },
  {
    id: "recovery",
    name: "Recovery",
    tagline: "Between sessions.",
    summary: "Our treatment-room staple for muscle repair and tissue health after training or bodywork.",
    items: [
      { id: "dfh-magnesium-malate", note: "Magnesium paired with malic acid for muscle energy." },
      { id: "dfh-omegavail-hi-po", note: "Concentrated EPA and DHA for tissue health." },
    ],
  },
  {
    id: "performance",
    name: "Performance",
    tagline: "Certified for competition.",
    summary: "For varsity and pro athletes under USADA, WADA or U SPORTS testing. Both products are NSF Certified for Sport.",
    items: [
      { id: "klean-creatine", note: "Creapure creatine, the most researched supplement for strength and power." },
      { id: "dfs-hydration-packs", note: "Sugar-free sodium, potassium and magnesium." },
    ],
  },
  {
    id: "beauty",
    name: "Beauty",
    tagline: "From the inside.",
    summary: "Structural support for skin, hair and nails.",
    items: [
      { id: "thorne-collagen-plus", note: "Collagen peptides with polyphenols for skin elasticity." },
      { id: "dfh-zinc-supreme", note: "Zinc for skin repair and clarity." },
    ],
  },
  {
    id: "calm",
    name: "Calm",
    tagline: "Steady under load.",
    summary: "An adaptogen and the B vitamins stress burns through first. For long weeks and short fuses.",
    items: [
      { id: "aor-ortho-adapt", note: "Adaptogenic herbs to support the stress response." },
      { id: "thorne-stress-b-complex", note: "Active B vitamins depleted by chronic stress." },
    ],
  },
  {
    id: "foundation",
    name: "Foundation",
    tagline: "The daily baseline.",
    summary: "The two essentials most clients are missing. Start here before anything else.",
    items: [
      { id: "thorne-basic-nutrients-2-day", note: "A complete, two-capsule daily multivitamin." },
      { id: "dfh-vitamin-d-supreme", note: "Vitamin D3 with K1 and K2." },
    ],
  },
];

window.PH_DESCRIPTIONS = {
  "klean-creatine": "Pure Creapure\u00ae creatine monohydrate with nothing added. Supports strength and power during short, intense efforts, and helps recovery between sessions. NSF Certified for Sport.",
  "dfs-creatine-monohydrate": "Unflavoured creatine monohydrate that mixes easily into water or a shake. One of the most studied supplements for strength, power and lean mass. NSF Certified for Sport.",
  "thorne-creatine": "Thorne's single-ingredient creatine monohydrate. Supports muscle strength, power output and recovery, with a growing body of research on cognitive benefits. NSF Certified for Sport.",
  "dfs-hydrolyzed-whey-protein": "Pre-digested whey protein that absorbs quickly after training. 20 g of protein per serving, low in sugar and carbohydrates. NSF Certified for Sport.",
  "dfs-hydrolyzed-iso-whey-protein": "Hydrolyzed whey isolate for athletes who want a very clean, fast-absorbing protein with minimal lactose and fat. NSF Certified for Sport.",
  "thorne-whey-protein-isolate": "Grass-fed whey isolate with 21 g of protein per serving. Easy on digestion and suited to post-training recovery or as a daily protein top-up. NSF Certified for Sport.",
  "dfs-hydration-packs": "Sugar-free electrolyte stick packs with 500 mg sodium, 500 mg potassium and 100 mg magnesium. Made for long sessions, heavy sweaters and hot days. NSF Certified for Sport.",
  "dfh-omegavail-hi-po": "High-potency fish oil in the triglyceride form, concentrated in EPA and DHA. Supports heart, brain and joint health and a healthy inflammatory response.",
  "dfh-vitamin-d-supreme": "Vitamin D3 paired with K1 and K2 so calcium ends up in bone rather than soft tissue. A useful daily staple through Canadian winters.",
  "thorne-vitamin-d-k2-liquid": "Liquid vitamin D3 and K2 in a dropper, so the dose is easy to adjust. Supports bone, immune and cardiovascular health.",
  "aor-vitamin-d3": "A simple, low-cost daily dose of 1000 IU vitamin D3 in an easy softgel. Supports bone health and immune function.",
  "thorne-magnesium-bisglycinate": "Magnesium bound to glycine, which is gentle on the stomach and well absorbed. Supports muscle relaxation, sleep quality and recovery. NSF Certified for Sport.",
  "aor-magnesium-glycinate": "Well-absorbed magnesium glycinate in capsules. Supports muscle and nerve function, and many clients take it in the evening to help them unwind.",
  "dfh-magnesium-malate": "Magnesium paired with malic acid, which plays a role in cellular energy. Often used for muscle tenderness and day-to-day energy.",
  "thorne-basic-nutrients-2-day": "A two-capsule daily multivitamin with active, well-absorbed forms of B vitamins, minerals and antioxidants. Contains no iron.",
  "dfh-complete-multi": "A comprehensive multivitamin and mineral with methylated B vitamins and chelated minerals, for broad daily nutritional support.",
  "aor-ortho-core": "AOR's advanced multinutrient with vitamins, minerals and antioxidants in research-backed doses. Designed as a foundation for overall health.",
  "thorne-florasport-20b": "A probiotic with 20 billion CFU, developed for athletes. Supports digestive and immune health, which training stress can wear down. NSF Certified for Sport.",
  "dfh-probiotic-synergy": "A multi-strain probiotic in delayed-release capsules that protect it from stomach acid. Supports digestive balance and immune health.",
  "thorne-collagen-plus": "Collagen peptides with nicotinamide riboside and polyphenols. Supports skin elasticity and hydration, and connective tissue.",
  "dfh-zinc-supreme": "Zinc glycinate, a gentle and well-absorbed form. Supports immune function, skin health and tissue repair.",
  "thorne-curcumin-phytosome-sr": "Sustained-release Meriva\u00ae curcumin, which the body absorbs far better than standard turmeric. Supports joint comfort and a healthy inflammatory response. NSF Certified for Sport.",
  "thorne-pharmagaba-250": "Natural-source GABA, a calming neurotransmitter. Supports relaxation and helps quiet a busy mind before sleep or a stressful day.",
  "thorne-stress-b-complex": "B vitamins in their active forms, plus extra B5 and B6. Supports energy and the body's response to everyday stress.",
  "aor-ortho-sleep": "A melatonin-free sleep formula that supports falling asleep and staying asleep, without next-morning grogginess.",
  "aor-ortho-adapt": "Adaptogenic herbs with B vitamins and vitamin C. Supports energy, focus and stress resilience during demanding periods.",
};
