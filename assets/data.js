window.PH_BRANDS = ["Thorne", "Designs for Health", "AOR"];

window.PH_STACK_DISCOUNT = 0.1;

window.PH_PRODUCTS = [
  { id: "thorne-magnesium-bisglycinate", brand: "Thorne", name: "Magnesium Bisglycinate", format: "Powder, 60 servings", price: 48, image: "images/products/thorne-magnesium-bisglycinate.webp" },
  { id: "thorne-creatine", brand: "Thorne", name: "Creatine", format: "Powder, 90 servings", price: 58, image: "images/products/thorne-creatine.webp" },
  { id: "thorne-pharmagaba-250", brand: "Thorne", name: "PharmaGABA-250", format: "60 capsules", price: 52, image: "images/products/thorne-pharmagaba-250.webp" },
  { id: "thorne-stress-b-complex", brand: "Thorne", name: "Stress B-Complex", format: "60 capsules", price: 36, image: "images/products/thorne-stress-b-complex.webp" },
  { id: "thorne-collagen-plus", brand: "Thorne", name: "Collagen Plus", format: "Powder, 30 servings", price: 72, image: "images/products/thorne-collagen-plus.webp" },
  { id: "thorne-curcumin-phytosome-sr", brand: "Thorne", name: "Curcumin Phytosome SR", format: "60 capsules", price: 78, image: "images/products/thorne-curcumin-phytosome-sr.webp" },
  { id: "thorne-basic-nutrients-2-day", brand: "Thorne", name: "Basic Nutrients 2/Day", format: "60 capsules", price: 52, image: "images/products/thorne-basic-nutrients-2-day.webp" },
  { id: "thorne-vitamin-d-k2-liquid", brand: "Thorne", name: "Vitamin D + K2 Liquid", format: "30 mL", price: 38, image: "images/products/thorne-vitamin-d-k2-liquid.webp" },
  { id: "dfh-omegavail-hi-po", brand: "Designs for Health", name: "OmegAvail\u2122 Hi-Po", format: "120 softgels", price: 54, image: "images/products/dfh-omegavail-hi-po.png" },
  { id: "dfh-zinc-supreme", brand: "Designs for Health", name: "Zinc Supreme\u2122", format: "90 capsules", price: 32, image: "images/products/dfh-zinc-supreme.png" },
  { id: "dfh-magnesium-malate", brand: "Designs for Health", name: "Magnesium Malate", format: "180 capsules", price: 42, image: "images/products/dfh-magnesium-malate.png" },
  { id: "dfh-complete-multi", brand: "Designs for Health", name: "Complete Multi\u2122", format: "180 capsules", price: 62, image: "images/products/dfh-complete-multi.png" },
  { id: "aor-ortho-sleep", brand: "AOR", name: "Ortho Sleep\u2122", format: "60 capsules", price: 44, image: "images/products/aor-ortho-sleep.png" },
  { id: "aor-ortho-adapt", brand: "AOR", name: "Ortho Adapt\u00ae", format: "120 capsules", price: 56, image: "images/products/aor-ortho-adapt.png" },
  { id: "aor-ortho-core", brand: "AOR", name: "Ortho Core\u00ae", format: "180 capsules", price: 82, image: "images/products/aor-ortho-core.png" },
  { id: "aor-magnesium-glycinate", brand: "AOR", name: "Magnesium Glycinate", format: "90 capsules", price: 30, image: "images/products/aor-magnesium-glycinate.png" },
  { id: "aor-vitamin-d3", brand: "AOR", name: "Vitamin D3 1000 IU", format: "120 softgels", price: 16, image: "images/products/aor-vitamin-d3.png" },
];

window.PH_STACKS = [
  {
    id: "sleep",
    name: "Sleep",
    tagline: "Wind down, stay down.",
    image: "images/stacks/sleep.png",
    imageAlt: "A woman asleep on white linen in soft window light",
    summary: "A calm nervous system and relaxed muscles before bed. Built for clients who carry tension into the night.",
    items: [
      { id: "thorne-magnesium-bisglycinate", note: "Gentle, well-absorbed magnesium for muscle relaxation." },
      { id: "thorne-pharmagaba-250", note: "Natural-source GABA to quiet a busy mind." },
      { id: "aor-ortho-sleep", note: "Melatonin-free blend to support restful sleep." },
    ],
  },
  {
    id: "recovery",
    name: "Recovery",
    tagline: "Between sessions.",
    image: "images/stacks/recovery.png",
    imageAlt: "A massage therapist working on an athlete's shoulder",
    summary: "Our treatment-room staple. Supports muscle repair, joint comfort and a healthy inflammatory response after training or bodywork.",
    items: [
      { id: "thorne-creatine", note: "Strength, power and muscle recovery." },
      { id: "thorne-curcumin-phytosome-sr", note: "Highly bioavailable curcumin for joint and muscle comfort." },
      { id: "dfh-omegavail-hi-po", note: "Concentrated EPA and DHA for tissue health." },
      { id: "dfh-magnesium-malate", note: "Magnesium paired with malic acid for muscle energy." },
    ],
  },
  {
    id: "beauty",
    name: "Beauty",
    tagline: "From the inside.",
    image: "images/stacks/beauty.png",
    imageAlt: "Close-up profile of a woman with glowing skin",
    summary: "Structural support for skin, hair and nails, with the minerals and fats that keep them resilient.",
    items: [
      { id: "thorne-collagen-plus", note: "Collagen peptides with polyphenols for skin elasticity." },
      { id: "dfh-zinc-supreme", note: "Zinc for skin repair and clarity." },
      { id: "dfh-omegavail-hi-po", note: "Omega-3s for hydration and barrier function." },
    ],
  },
  {
    id: "calm",
    name: "Calm",
    tagline: "Steady under load.",
    image: "images/stacks/calm.png",
    imageAlt: "A man standing still on a foggy shoreline at dawn",
    summary: "Adaptogens and the nutrients stress burns through first. For long weeks and short fuses.",
    items: [
      { id: "aor-ortho-adapt", note: "Adaptogenic herbs to support the stress response." },
      { id: "thorne-stress-b-complex", note: "Active B vitamins depleted by chronic stress." },
      { id: "aor-magnesium-glycinate", note: "Daily magnesium for a settled nervous system." },
    ],
  },
  {
    id: "foundation",
    name: "Foundation",
    tagline: "The daily baseline.",
    image: "images/stacks/foundation.png",
    imageAlt: "A glass of water and capsules on a stone counter in morning light",
    summary: "The essentials most clients are missing. Start here before anything else.",
    items: [
      { id: "thorne-basic-nutrients-2-day", note: "A complete, two-capsule daily multivitamin." },
      { id: "thorne-vitamin-d-k2-liquid", note: "Vitamin D with K2, dosed by the drop." },
      { id: "dfh-omegavail-hi-po", note: "Professional-strength omega-3." },
    ],
  },
];
