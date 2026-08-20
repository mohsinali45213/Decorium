export interface CatalogSubCategory {
  _id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface CatalogVariant {
  sku?: string;
  size?: string;
  finish?: string;
  price?: number;
  showPriceOnWebsite: boolean;
  unit?: string;
}

export interface CatalogProduct {
  _id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  subCategorySlug?: string;
  subCategoryName?: string;
  brand?: string;
  coverImage: string;
  spec: string;
  origin?: string;
  isFeatured: boolean;
  isActive: boolean;
  variants: CatalogVariant[];
  description: string;
  attributes?: Record<string, string>;
}

export interface CatalogCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  specimenCount: number;
  subCategories: CatalogSubCategory[];
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    _id: 'cat-marble',
    name: 'Italian Natural Marble',
    slug: 'marble',
    description: 'Direct quarry-imported natural blocks and bookmatched slabs from Carrara, Brescia, and Tuscany, curated for seamless architectural statements.',
    image: '/images/desktop/pexels-artbovich-7166636.jpg',
    specimenCount: 24,
    subCategories: [
      { _id: 'sub-m-bookmatch', name: 'Bookmatch Slabs', slug: 'bookmatch-slabs', count: 8 },
      { _id: 'sub-m-statuario', name: 'White Statuario', slug: 'statuario', count: 6 },
      { _id: 'sub-m-calacatta', name: 'Calacatta Gold', slug: 'calacatta', count: 5 },
      { _id: 'sub-m-travertine', name: 'Roman Travertine', slug: 'travertine', count: 4 },
      { _id: 'sub-m-onyx', name: 'Backlit Exotic Onyx', slug: 'onyx', count: 3 },
    ],
  },
  {
    _id: 'cat-tiles',
    name: 'Continuous Porcelain Slabs',
    slug: 'tiles',
    description: 'Ultra-large 3200×1600mm monolithic porcelain surfaces engineered with continuous veining and zero-joint precision.',
    image: '/images/desktop/pexels-artbovich-7534232.jpg',
    specimenCount: 38,
    subCategories: [
      { _id: 'sub-t-3200', name: '3200mm Continuous Slabs', slug: '3200mm-slabs', count: 14 },
      { _id: 'sub-t-matte', name: 'Matte Stone Slabs', slug: 'matte-stone', count: 10 },
      { _id: 'sub-t-terrazzo', name: 'Venetian Terrazzo', slug: 'terrazzo', count: 6 },
      { _id: 'sub-t-wood', name: 'Architectural Timber Planks', slug: 'wood-planks', count: 5 },
      { _id: 'sub-t-metal', name: 'Oxidized Metallic Finish', slug: 'metallic-finish', count: 3 },
    ],
  },
  {
    _id: 'cat-sanitaryware',
    name: 'Artisan Bathware & Tapware',
    slug: 'sanitaryware',
    description: 'Architectural freestanding baths, sculpted stone basins, and physical vapor deposition (PVD) tapware in brushed champagne and graphite.',
    image: '/images/desktop/pexels-artbovich-8082311.jpg',
    specimenCount: 31,
    subCategories: [
      { _id: 'sub-s-tubs', name: 'Freestanding Baths', slug: 'freestanding-tubs', count: 7 },
      { _id: 'sub-s-basins', name: 'Sculpted Basins', slug: 'matte-basins', count: 9 },
      { _id: 'sub-s-faucets', name: 'PVD Brushed Tapware', slug: 'pvd-faucets', count: 8 },
      { _id: 'sub-s-showers', name: 'Concealed Rain Systems', slug: 'concealed-showers', count: 4 },
      { _id: 'sub-s-toilets', name: 'Smart Ceramic Suites', slug: 'smart-toilets', count: 3 },
    ],
  },
  {
    _id: 'cat-furniture',
    name: 'Bespoke Architectural Furniture',
    slug: 'furniture',
    description: 'Custom stone-carved tables, bouclé lounge chairs, and precision-milled timber credenzas tailored to luxury residential master plans.',
    image: '/images/desktop/pexels-jack-davis-86003658-11408618.jpg',
    specimenCount: 19,
    subCategories: [
      { _id: 'sub-f-dining', name: 'Marble Dining Tables', slug: 'marble-dining', count: 6 },
      { _id: 'sub-f-lounge', name: 'Sculptural Loungers', slug: 'boucle-loungers', count: 5 },
      { _id: 'sub-f-credenzas', name: 'Fluted Credenzas', slug: 'credenzas', count: 4 },
      { _id: 'sub-f-vanities', name: 'Floating Stone Vanities', slug: 'custom-vanities', count: 4 },
    ],
  },
  {
    _id: 'cat-paint',
    name: 'Mineral Plasters & Limewash',
    slug: 'paint',
    description: 'Natural mineral plasters, breathable Italian limewash, and monolithic microcements creating textured tactile warmth on architectural walls.',
    image: '/images/desktop/pexels-yankrukov-5793642.jpg',
    specimenCount: 16,
    subCategories: [
      { _id: 'sub-p-limewash', name: 'Breathable Limewash', slug: 'limewash', count: 5 },
      { _id: 'sub-p-microcement', name: 'Seamless Microcement', slug: 'microcement', count: 4 },
      { _id: 'sub-p-stucco', name: 'Polished Venetian Stucco', slug: 'venetian-stucco', count: 4 },
      { _id: 'sub-p-glaze', name: 'Mineral Washes & Glazes', slug: 'metallic-glaze', count: 3 },
    ],
  },
  {
    _id: 'cat-hardware',
    name: 'Precision Hardware & Electricals',
    slug: 'hardware',
    description: 'Solid knurled brass door furniture, magnetic locksets, flush plate electrical toggles, and architectural trimless downlighting.',
    image: '/images/mobile/pexels-olenkabohovyk-5686479.jpg',
    specimenCount: 22,
    subCategories: [
      { _id: 'sub-h-handles', name: 'Solid Knurled Lever Sets', slug: 'knurled-handles', count: 8 },
      { _id: 'sub-h-locks', name: 'Concealed Magnetic Locks', slug: 'magnetic-locks', count: 4 },
      { _id: 'sub-h-switches', name: 'Architectural Switchplates', slug: 'architectural-switches', count: 6 },
      { _id: 'sub-h-lighting', name: 'Trimless Recessed Fixtures', slug: 'recessed-lighting', count: 4 },
    ],
  },
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // ── Marble ──────────────────────────────────────────
  {
    _id: 'prod-m-1',
    name: 'Calacatta Michelangelo Bookmatch',
    slug: 'calacatta-michelangelo-bookmatch',
    categorySlug: 'marble',
    categoryName: 'Italian Natural Marble',
    subCategorySlug: 'bookmatch-slabs',
    subCategoryName: 'Bookmatch Slabs',
    brand: 'Carrara Exclusive',
    coverImage: '/images/desktop/pexels-artbovich-7166636.jpg',
    spec: '3200 × 1600 × 20mm · Polished Finish',
    origin: 'Carrara, Italy',
    isFeatured: true,
    isActive: true,
    description: 'Flawless pair of mirror-veined Italian Calacatta slabs featuring dramatic gold and charcoal feathery veins on crisp crystalline white.',
    variants: [
      { sku: 'CAL-3216-20', size: '3200 × 1600 × 20mm', finish: 'High Gloss Polished', price: 950, showPriceOnWebsite: true, unit: 'sqft' },
      { sku: 'CAL-3216-30', size: '3200 × 1600 × 30mm', finish: 'Satin Silk Honed', price: 1250, showPriceOnWebsite: true, unit: 'sqft' },
    ],
  },
  {
    _id: 'prod-m-2',
    name: 'Statuario Extra Crystalline Slabs',
    slug: 'statuario-extra-crystalline-slabs',
    categorySlug: 'marble',
    categoryName: 'Italian Natural Marble',
    subCategorySlug: 'statuario',
    subCategoryName: 'White Statuario',
    brand: 'Apuan Quarries',
    coverImage: '/images/desktop/pexels-artbovich-7534232.jpg',
    spec: '3000 × 1800 × 20mm · Mirror Polish',
    origin: 'Mount Altissimo, Italy',
    isFeatured: true,
    isActive: true,
    description: 'Iconic pure white base with broad, deep graphite diagonal veining. Sourced from the historic Michelangelo quarry stratum.',
    variants: [
      { sku: 'STAT-EXT-20', size: '3000 × 1800 × 20mm', finish: 'Polished', price: 1400, showPriceOnWebsite: true, unit: 'sqft' },
    ],
  },
  {
    _id: 'prod-m-3',
    name: 'Roman Silver Vein-Cut Travertine',
    slug: 'roman-silver-vein-cut-travertine',
    categorySlug: 'marble',
    categoryName: 'Italian Natural Marble',
    subCategorySlug: 'travertine',
    subCategoryName: 'Roman Travertine',
    brand: 'Tivoli Stone Co.',
    coverImage: '/images/desktop/pexels-artbovich-8082311.jpg',
    spec: '2800 × 1500 × 20mm · Open Pore Honed',
    origin: 'Tivoli, Italy',
    isFeatured: false,
    isActive: true,
    description: 'Striated linear grey, ash, and warm taupe bands. Available with organic open pores or transparent resin fill.',
    variants: [
      { sku: 'TRAV-SIL-20', size: '2800 × 1500 × 20mm', finish: 'Open Pore Honed', price: 580, showPriceOnWebsite: true, unit: 'sqft' },
    ],
  },
  {
    _id: 'prod-m-4',
    name: 'Persian Emerald Green Backlit Onyx',
    slug: 'persian-emerald-green-backlit-onyx',
    categorySlug: 'marble',
    categoryName: 'Italian Natural Marble',
    subCategorySlug: 'onyx',
    subCategoryName: 'Backlit Exotic Onyx',
    brand: 'Exotic Gems',
    coverImage: '/images/desktop/pexels-jack-davis-86003658-11408618.jpg',
    spec: '2400 × 1400 × 16mm · Translucent Slabs',
    origin: 'Yazd Range',
    isFeatured: true,
    isActive: true,
    description: 'High light-transmittance gemstone onyx with natural concentric rings of emerald, mint, amber, and gold.',
    variants: [
      { sku: 'ONYX-EM-16', size: '2400 × 1400 × 16mm', finish: 'Polished / Backlit Glass Laminated', price: undefined, showPriceOnWebsite: false },
    ],
  },

  // ── Tiles ───────────────────────────────────────────
  {
    _id: 'prod-t-1',
    name: 'Continuous Monolithic Porcelain Slabs',
    slug: 'continuous-monolithic-porcelain-slabs',
    categorySlug: 'tiles',
    categoryName: 'Continuous Porcelain Slabs',
    subCategorySlug: '3200mm-slabs',
    subCategoryName: '3200mm Continuous Slabs',
    brand: 'Laminam Italia',
    coverImage: '/images/desktop/pexels-yankrukov-5793642.jpg',
    spec: '3200 × 1600 × 12mm · Zero Joint Edge',
    origin: 'Sassuolo, Italy',
    isFeatured: true,
    isActive: true,
    description: 'Continuous digital body porcelain slabs that span floor-to-ceiling with continuous veining across adjacent slabs.',
    variants: [
      { sku: 'LAM-3216-12', size: '3200 × 1600 × 12mm', finish: 'Velvet Matte', price: 420, showPriceOnWebsite: true, unit: 'sqft' },
    ],
  },
  {
    _id: 'prod-t-2',
    name: 'Venetian Terrazzo Grigio Chiaro',
    slug: 'venetian-terrazzo-grigio-chiaro',
    categorySlug: 'tiles',
    categoryName: 'Continuous Porcelain Slabs',
    subCategorySlug: 'terrazzo',
    subCategoryName: 'Venetian Terrazzo',
    brand: 'Marazzi Arch',
    coverImage: '/images/mobile/pexels-ahmetcotur-29702287.jpg',
    spec: '1200 × 1200 × 9mm · Micro-Beveled',
    origin: 'Modena, Italy',
    isFeatured: false,
    isActive: true,
    description: 'Coarse architectural marble aggregates suspended in a muted cement matrix. Perfect for heavy traffic boutique commercial and villa floors.',
    variants: [
      { sku: 'TERR-1212-GR', size: '1200 × 1200 × 9mm', finish: 'Honed R10', price: 290, showPriceOnWebsite: true, unit: 'sqft' },
    ],
  },

  // ── Sanitaryware ────────────────────────────────────
  {
    _id: 'prod-s-1',
    name: 'Minimalist Architectural Freestanding Bath',
    slug: 'minimalist-architectural-freestanding-bath',
    categorySlug: 'sanitaryware',
    categoryName: 'Artisan Bathware & Tapware',
    subCategorySlug: 'freestanding-tubs',
    subCategoryName: 'Freestanding Baths',
    brand: 'Antonio Lupi Design',
    coverImage: '/images/mobile/pexels-artbovich-6920611.jpg',
    spec: '1750 × 800 × 550mm · Cristalmood Matte',
    origin: 'Tuscany, Italy',
    isFeatured: true,
    isActive: true,
    description: 'Seamless cast solid-surface organic oval bathtub with integrated overflow and tactile warm-touch finish.',
    variants: [
      { sku: 'TUB-MIN-175', size: '1750 × 800 × 550mm', finish: 'Matte Cotton White', price: 185000, showPriceOnWebsite: true, unit: 'piece' },
      { sku: 'TUB-MIN-175-G', size: '1750 × 800 × 550mm', finish: 'Matte Basalt Grey', price: 210000, showPriceOnWebsite: true, unit: 'piece' },
    ],
  },
  {
    _id: 'prod-s-2',
    name: 'PVD Brushed Graphite Floor-Mounted Mixer',
    slug: 'pvd-brushed-graphite-floor-mounted-mixer',
    categorySlug: 'sanitaryware',
    categoryName: 'Artisan Bathware & Tapware',
    subCategorySlug: 'pvd-faucets',
    subCategoryName: 'PVD Brushed Tapware',
    brand: 'Gessi Architectural',
    coverImage: '/images/mobile/pexels-artdjartem-119108916-38800609.jpg',
    spec: 'Solid DZR Brass · PVD Titanium Coating',
    origin: 'Serravalle Sesia, Italy',
    isFeatured: false,
    isActive: true,
    description: 'Precision progressive thermostatic mixer with anti-fingerprint PVD surface and cylindrical pencil hand-shower.',
    variants: [
      { sku: 'MIX-PVD-GRP', finish: 'Brushed Graphite PVD', price: 78000, showPriceOnWebsite: true, unit: 'set' },
      { sku: 'MIX-PVD-CHM', finish: 'Champagne Warm Gold PVD', price: 82000, showPriceOnWebsite: true, unit: 'set' },
    ],
  },

  // ── Furniture ───────────────────────────────────────
  {
    _id: 'prod-f-0',
    name: 'Travertine Dining Table',
    slug: 'travertine-dining-table',
    categorySlug: 'furniture',
    categoryName: 'Bespoke Architectural Furniture',
    subCategorySlug: 'marble-dining',
    subCategoryName: 'Marble Dining Tables',
    brand: 'Natural Travertine',
    coverImage: '/images/desktop/pexels-artbovich-8082311.jpg',
    spec: 'Natural Travertine',
    origin: 'Italy',
    isFeatured: true,
    isActive: true,
    description: 'A sculptural dining table crafted from solid natural travertine. Its design combines the organic, porous character of the stone with a refined, modern silhouette. The monolithic pedestal base provides substantial visual weight, while the honed top offers a smooth, tactile surface for gathering.',
    variants: [
      { sku: 'TRAV-TAB-220', size: '220 x 100 x 75 cm', finish: 'Honed Natural', price: 125000, showPriceOnWebsite: true, unit: 'piece' },
    ],
  },
  {
    _id: 'prod-f-1',
    name: 'Monolithic Travertine 8-Seater Dining Table',
    slug: 'monolithic-travertine-8-seater-dining-table',
    categorySlug: 'furniture',
    categoryName: 'Bespoke Architectural Furniture',
    subCategorySlug: 'marble-dining',
    subCategoryName: 'Marble Dining Tables',
    brand: 'Decorium Atelier',
    coverImage: '/images/mobile/pexels-misbaa-eri-426041722-37252312.jpg',
    spec: '2600 × 1100 × 750mm · Solid Filled Travertine',
    origin: 'Siddhpur Atelier Handcrafted',
    isFeatured: true,
    isActive: true,
    description: 'Solid hand-carved Roman travertine tabletop supported by dual fluted cylindrical stone plinths.',
    variants: [
      { sku: 'FURN-TAB-260', size: '2600 × 1100 × 750mm', finish: 'Honed Matte Silk', price: 245000, showPriceOnWebsite: true, unit: 'piece' },
    ],
  },

  // ── Paint & Textures ────────────────────────────────
  {
    _id: 'prod-p-1',
    name: 'Tuscan Earth Mineral Limewash Paint',
    slug: 'tuscan-earth-mineral-limewash-paint',
    categorySlug: 'paint',
    categoryName: 'Mineral Plasters & Limewash',
    subCategorySlug: 'limewash',
    subCategoryName: 'Breathable Limewash',
    brand: 'Colorificio Veneziano',
    coverImage: '/images/mobile/pexels-olenkabohovyk-5686479.jpg',
    spec: 'Zero VOC Slaked Lime · Natural Earth Pigments',
    origin: 'Veneto, Italy',
    isFeatured: true,
    isActive: true,
    description: 'Authentic aged slaked lime wash that reacts with atmospheric CO2 to form a crystalline micro-textured mineral finish.',
    variants: [
      { sku: 'LIME-5L-TUSC', size: '5 Litre Bucket (~350 sqft)', finish: 'Suede Matte', price: 8500, showPriceOnWebsite: true, unit: 'box' },
    ],
  },

  // ── Hardware ────────────────────────────────────────
  {
    _id: 'prod-h-1',
    name: 'Precision Knurled Solid Brass Leverset',
    slug: 'precision-knurled-solid-brass-leverset',
    categorySlug: 'hardware',
    categoryName: 'Precision Hardware & Electricals',
    subCategorySlug: 'knurled-handles',
    subCategoryName: 'Solid Knurled Lever Sets',
    brand: 'Buster & Punch London',
    coverImage: '/images/mobile/pexels-sylwester-ficek-154797634-34369007.jpg',
    spec: 'Grade 304 Solid Brass · Diamond Knurl Pattern',
    origin: 'London, UK',
    isFeatured: true,
    isActive: true,
    description: 'Monolithic heavy-cast brass lever handles with diamond cross-knurled grip and sprung concealed rose.',
    variants: [
      { sku: 'HNDL-KNR-BRS', finish: 'Smoked Bronze', price: 14500, showPriceOnWebsite: true, unit: 'set' },
      { sku: 'HNDL-KNR-BLK', finish: 'Anodized Matte Black', price: 13500, showPriceOnWebsite: true, unit: 'set' },
    ],
  },
];

export interface CatalogBrand {
  _id: string;
  name: string;
  slug: string;
  categorySlug?: string;
  origin?: string;
  category?: string;
  logo?: string;
  image?: string;
  specimenCount?: number;
  isActive: boolean;
}

export const CATALOG_BRANDS: CatalogBrand[] = [
  {
    _id: 'brand-laminam',
    name: 'Laminam',
    slug: 'laminam',
    categorySlug: 'tiles',
    origin: 'Fiorano Modenese, Italy',
    category: 'Continuous Porcelain Surfaces',
    logo: '/images/desktop/pexels-artbovich-7166636.jpg',
    specimenCount: 14,
    isActive: true,
  },
  {
    _id: 'brand-antoniolupi',
    name: 'Antonio Lupi',
    slug: 'antonio-lupi',
    categorySlug: 'sanitaryware',
    origin: 'Stabbia, Tuscany',
    category: 'Architectural Bath Suites',
    logo: '/images/desktop/pexels-artbovich-7534232.jpg',
    specimenCount: 9,
    isActive: true,
  },
  {
    _id: 'brand-gessi',
    name: 'Gessi',
    slug: 'gessi',
    categorySlug: 'sanitaryware',
    origin: 'Serravalle Sesia, Italy',
    category: 'PVD Tapware & Wellness',
    logo: '/images/desktop/pexels-artbovich-8082311.jpg',
    specimenCount: 8,
    isActive: true,
  },
  {
    _id: 'brand-salvatori',
    name: 'Salvatori',
    slug: 'salvatori',
    categorySlug: 'marble',
    origin: 'Querceta, Lucca, Italy',
    category: 'Precision Textured Natural Stone',
    logo: '/images/desktop/pexels-jack-davis-86003658-11408618.jpg',
    specimenCount: 12,
    isActive: true,
  },
  {
    _id: 'brand-marazzi',
    name: 'Marazzi Arch',
    slug: 'marazzi',
    categorySlug: 'tiles',
    origin: 'Sassuolo, Italy',
    category: 'Monolithic Technical Ceramics',
    logo: '/images/desktop/pexels-yankrukov-5793642.jpg',
    specimenCount: 10,
    isActive: true,
  },
  {
    _id: 'brand-buster-punch',
    name: 'Buster + Punch',
    slug: 'buster-punch',
    categorySlug: 'hardware',
    origin: 'London, UK',
    category: 'Solid Knurled Hardware',
    logo: '/images/mobile/pexels-olenkabohovyk-5686479.jpg',
    specimenCount: 16,
    isActive: true,
  },
  {
    _id: 'brand-margraf',
    name: 'Margraf 1906',
    slug: 'margraf',
    categorySlug: 'marble',
    origin: 'Vicenza, Italy',
    category: 'Quarried Natural Marble Blocks',
    logo: '/images/mobile/pexels-sylwester-ficek-154797634-34369007.jpg',
    specimenCount: 11,
    isActive: true,
  },
  {
    _id: 'brand-flos',
    name: 'Flos Atelier',
    slug: 'flos-atelier',
    categorySlug: 'hardware',
    origin: 'Brescia, Italy',
    category: 'Architectural Lighting & Controls',
    logo: '/images/mobile/pexels-artdjartem-119108916-38800609.jpg',
    specimenCount: 7,
    isActive: true,
  },
];
