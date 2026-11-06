import { Product, Category, Review } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-hoodies',
    name: 'Hoodies',
    slug: 'hoodies',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    itemCount: 8
  },
  {
    id: 'cat-shirts',
    name: 'Shirts',
    slug: 'shirts',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    itemCount: 12
  },
  {
    id: 'cat-tshirts',
    name: 'T-Shirts',
    slug: 't-shirts',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    itemCount: 15
  },
  {
    id: 'cat-pants',
    name: 'Pants',
    slug: 'pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    itemCount: 9
  },
  {
    id: 'cat-jackets',
    name: 'Jackets',
    slug: 'jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    itemCount: 7
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    itemCount: 14
  },
  {
    id: 'cat-footwear',
    name: 'Footwear',
    slug: 'footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    itemCount: 6
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Classic Forest Hoodie',
    slug: 'classic-forest-hoodie',
    description: 'Crafted from 100% heavyweight 420 GSM French Terry cotton, the Classic Forest Hoodie combines minimalist tailoring with unmatched warmth. Features subtle tonal embroidery on the chest, custom antique silver eyelets, pre-shrunk organic yarn, and a double-layered structured hood that holds its shape effortlessly.',
    shortDescription: 'Heavyweight organic cotton hoodie with tailored modern fit.',
    originalPrice: 2999,
    discountedPrice: 899,
    discountPercentage: 70,
    category: 'Hoodies',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.8,
    reviewsCount: 1240,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Forest Green', hex: '#20392F' },
      { name: 'Warm Cream', hex: '#E9DFD3' },
      { name: 'Onyx Black', hex: '#1C1C1A' }
    ],
    isBestseller: true,
    isNewArrival: false,
    isActive: true,
    stock: 48,
    sku: 'VT-HD-001',
    createdAt: '2026-10-15T00:00:00Z',
    details: [
      '420 GSM 100% Combed Organic Cotton',
      'Double-stitched ribbed cuffs & hem',
      'Kangaroo front pocket with reinforced bar-tacks',
      'Custom dyed using low-impact botanical dyes'
    ],
    fabric: '100% Organic French Terry Cotton',
    careInstructions: ['Machine wash cold inside out', 'Do not tumble dry', 'Warm iron if needed', 'Dry flat in shade']
  },
  {
    id: 'prod-002',
    name: 'Linen Casual Shirt',
    slug: 'linen-casual-shirt',
    description: 'A contemporary wardrobe quintessential woven from premium European flax linen. Soft washed for that lived-in texture and draped relaxed silhouette. Features natural shell buttons, a tailored camp collar, and chest patch pocket.',
    shortDescription: 'Breathable European flax linen with relaxed spread collar.',
    originalPrice: 1999,
    discountedPrice: 799,
    discountPercentage: 60,
    category: 'Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.7,
    reviewsCount: 986,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Sand Beige', hex: '#D7C7B3' },
      { name: 'Crisp White', hex: '#F9F9F8' },
      { name: 'Olive Drab', hex: '#4A5340' }
    ],
    isBestseller: true,
    isNewArrival: false,
    isActive: true,
    stock: 35,
    sku: 'VT-SH-002',
    createdAt: '2026-10-18T00:00:00Z',
    details: [
      '100% Pure Normandy Flax Linen',
      'Natural river-shell buttons',
      'Pre-washed for tactile softness',
      'Curved hemline for untucked styling'
    ],
    fabric: '100% Normandy Flax Linen',
    careInstructions: ['Hand wash or delicate machine cycle', 'Hang to dry', 'Steam while damp']
  },
  {
    id: 'prod-003',
    name: 'Tactical Cargo Pants',
    slug: 'tactical-cargo-pants',
    description: 'Engineered for street utility and timeless ease. Tailored from high-density cotton ripstop with articulated knees and structured bellows cargo pockets. The adjustable bungee drawstring cuffs allow you to customize between wide-leg and tapered styles.',
    shortDescription: 'High-density ripstop cargo pants with dual utility pockets.',
    originalPrice: 2599,
    discountedPrice: 1299,
    discountPercentage: 50,
    category: 'Pants',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.6,
    reviewsCount: 743,
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Midnight Black', hex: '#1C1C1D' },
      { name: 'Dark Moss', hex: '#2A342B' },
      { name: 'Desert Khaki', hex: '#C2B299' }
    ],
    isBestseller: true,
    isNewArrival: false,
    isActive: true,
    stock: 28,
    sku: 'VT-PT-003',
    createdAt: '2026-10-20T00:00:00Z',
    details: [
      'Military-spec 100% cotton ripstop weave',
      '6 utility cargo and welt pockets',
      'YKK metal zip fly and button fastening',
      'Adjustable hem pull-tabs'
    ],
    fabric: 'Heavyweight Cotton Ripstop',
    careInstructions: ['Machine wash warm', 'Do not bleach', 'Tumble dry low']
  },
  {
    id: 'prod-004',
    name: 'Striped Heritage Knit Sweater',
    slug: 'striped-heritage-knit-sweater',
    description: 'A cozy statement knit inspired by Nordic coastal heritage. Featuring bold horizontal stripes of deep forest green and warm ecru. Spun from ultra-soft lambswool blend with a ribbed crew neck, dropped shoulders, and chunky ribbed trims.',
    shortDescription: 'Chunky wool-blend knit with classic horizontal stripe motif.',
    originalPrice: 3699,
    discountedPrice: 1099,
    discountPercentage: 70,
    category: 'Jackets',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.8,
    reviewsCount: 1120,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ecru & Forest', hex: '#20392F' },
      { name: 'Navy & Cream', hex: '#1B263B' }
    ],
    isBestseller: true,
    isNewArrival: false,
    isActive: true,
    stock: 19,
    sku: 'VT-SW-004',
    createdAt: '2026-10-22T00:00:00Z',
    details: [
      '70% Australian Merino Wool, 30% Recycled Cashmere Blend',
      'Thermal micro-insulation',
      'Zero itchy feel, cloud-soft finish',
      'Anti-pilling treatment'
    ],
    fabric: 'Merino & Cashmere blend',
    careInstructions: ['Dry clean or hand wash cold gently', 'Dry flat only', 'Do not wring']
  },
  {
    id: 'prod-005',
    name: 'Vintage Wash Boxy T-Shirt',
    slug: 'vintage-wash-boxy-tshirt',
    description: 'The definitive everyday tee. Cut with dropped shoulders, a wider boxy chest, and a snug ribbed crew neck collar that does not bacon over time. Pigment-dyed and stone-washed for authentic vintage character.',
    shortDescription: '260 GSM heavyweight cotton tee with relaxed boxy silhouette.',
    originalPrice: 1499,
    discountedPrice: 699,
    discountPercentage: 53,
    category: 'T-Shirts',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.9,
    reviewsCount: 1540,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sage Green', hex: '#637061' },
      { name: 'Washed Ash', hex: '#4B4C4E' },
      { name: 'Vintage Off-White', hex: '#ECE8DF' }
    ],
    isBestseller: true,
    isNewArrival: true,
    isActive: true,
    stock: 64,
    sku: 'VT-TS-005',
    createdAt: '2026-10-25T00:00:00Z',
    details: [
      '260 GSM combed jersey cotton',
      'Relaxed drop-shoulder boxy cut',
      '1x1 thick bound collar',
      'Reinforced shoulder-to-shoulder taping'
    ],
    fabric: '100% Combed Compact Cotton',
    careInstructions: ['Machine wash cold', 'Wash with similar colors', 'Do not tumble dry']
  },
  {
    id: 'prod-006',
    name: 'Minimalist Corduroy Overshirt',
    slug: 'minimalist-corduroy-overshirt',
    description: 'An essential layering piece cut from fine 14-wale pure cotton corduroy. Soft, supple, and insulated for brisk transitional mornings. Works styled open over a graphic tee or buttoned cleanly under an overcoat.',
    shortDescription: 'Fine-wale velvety corduroy overshirt with horn buttons.',
    originalPrice: 2899,
    discountedPrice: 1399,
    discountPercentage: 51,
    category: 'Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.6,
    reviewsCount: 420,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Chestnut Brown', hex: '#664228' },
      { name: 'Deep Olive', hex: '#313C2F' }
    ],
    isBestseller: false,
    isNewArrival: true,
    isActive: true,
    stock: 22,
    sku: 'VT-SH-006',
    createdAt: '2026-10-27T00:00:00Z',
    details: [
      '100% cotton fine wale corduroy',
      'Dual chest flap pockets',
      'Custom embossed matte buttons',
      'Buttoned cuff vent'
    ],
    fabric: 'Pure Cotton Corduroy',
    careInstructions: ['Wash gentle cycle cold', 'Turn inside out', 'Hang dry']
  },
  {
    id: 'prod-007',
    name: 'Wool Blend Tailored Overcoat',
    slug: 'wool-blend-tailored-overcoat',
    description: 'The cornerstone of elevated winter outerwear. Impeccably structured with notched lapels, a single-breasted horn-button closure, and a satin lining for effortless layering over heavy knitwear.',
    shortDescription: 'Structural Italian wool-blend overcoat with clean sartorial lines.',
    originalPrice: 6999,
    discountedPrice: 2999,
    discountPercentage: 57,
    category: 'Jackets',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.9,
    reviewsCount: 810,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Charcoal Grey', hex: '#363839' }
    ],
    isBestseller: true,
    isNewArrival: true,
    isActive: true,
    stock: 15,
    sku: 'VT-JK-007',
    createdAt: '2026-10-28T00:00:00Z',
    details: [
      '60% Melton Wool, 40% Viscose blend',
      'Fully lined with silky cupro lining',
      'Back vent for fluid movement',
      'Dual exterior welt pockets & interior ticket pocket'
    ],
    fabric: 'Melton Wool Blend',
    careInstructions: ['Specialist dry clean only', 'Store on structured wooden hanger']
  },
  {
    id: 'prod-008',
    name: 'Washed Twill Minimalist Cap',
    slug: 'washed-twill-minimalist-cap',
    description: 'Low-profile unstructured 6-panel silhouette finished with an antique brass adjuster and subtle tone-on-tone mountain needlework. Made with breathable 100% garment-dyed cotton twill.',
    shortDescription: 'Garment-dyed cotton twill cap with brass buckle strap.',
    originalPrice: 999,
    discountedPrice: 499,
    discountPercentage: 50,
    category: 'Accessories',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.7,
    reviewsCount: 612,
    sizes: ['One Size'],
    colors: [
      { name: 'Forest Green', hex: '#20392F' },
      { name: 'Oatmeal', hex: '#DDD3C4' }
    ],
    isBestseller: false,
    isNewArrival: false,
    isActive: true,
    stock: 40,
    sku: 'VT-AC-008',
    createdAt: '2026-10-12T00:00:00Z',
    details: [
      '100% Bio-washed Cotton Twill',
      'Curved brim with stitched detailing',
      'Custom engraved buckle strapback'
    ],
    fabric: '100% Bio-washed Cotton',
    careInstructions: ['Spot clean with damp cloth', 'Do not machine wash']
  },
  {
    id: 'prod-009',
    name: 'Retro Court Leather Sneakers',
    slug: 'retro-court-leather-sneakers',
    description: 'Handcrafted low-top sneakers pairing full-grain calf leather with butter-soft suede overlays. Features an ergonomic memory foam insole and vulcanized natural rubber cupsole for all-day comfort.',
    shortDescription: 'Calfskin leather court sneakers with stitched gum sole.',
    originalPrice: 4999,
    discountedPrice: 2199,
    discountPercentage: 56,
    category: 'Footwear',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.8,
    reviewsCount: 380,
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Chalk White & Black', hex: '#F0EFEA' },
      { name: 'Triple White', hex: '#FFFFFF' }
    ],
    isBestseller: true,
    isNewArrival: true,
    isActive: true,
    stock: 24,
    sku: 'VT-FW-009',
    createdAt: '2026-10-29T00:00:00Z',
    details: [
      'Italian full-grain calf leather',
      'Reinforced toe box and heel counter',
      'Removable cushioned antimicrobial insole',
      'High-traction rubber cupsole'
    ],
    fabric: 'Full-Grain Leather & Suede',
    careInstructions: ['Wipe clean with soft damp cloth', 'Treat with neutral leather balm']
  },
  {
    id: 'prod-010',
    name: 'Pleated Relaxed Trousers',
    slug: 'pleated-relaxed-trousers',
    description: 'Elevated sartorial elegance meeting effortless everyday ease. Double front pleats create a graceful drape that cascades gently over sneakers or boots. Crafted in a wrinkle-resistant wool-blend twill.',
    shortDescription: 'Double front pleat trousers with fluid drape and tailored waistband.',
    originalPrice: 2999,
    discountedPrice: 1499,
    discountPercentage: 50,
    category: 'Pants',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.7,
    reviewsCount: 520,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Warm Taupe', hex: '#9E8D7C' },
      { name: 'Forest Olive', hex: '#2A362C' }
    ],
    isBestseller: false,
    isNewArrival: true,
    isActive: true,
    stock: 31,
    sku: 'VT-PT-010',
    createdAt: '2026-10-30T00:00:00Z',
    details: [
      'Poly-viscose wool-feel weave',
      'Deep slash side pockets',
      'Interior waistband curtain for comfort',
      'Extended tab button closure'
    ],
    fabric: 'Fine Twill Blend',
    careInstructions: ['Dry clean or machine wash cold on delicate', 'Hang dry']
  },
  {
    id: 'prod-011',
    name: 'Structured Utility Canvas Tote',
    slug: 'structured-utility-canvas-tote',
    description: 'Built for city commute and weekend getaways. Spun from 20oz paraffin waxed cotton canvas that resists rain and abrasion. Finished with genuine bridle leather handles and magnetic security clasp.',
    shortDescription: 'Heavy-duty waxed canvas tote with full-grain leather straps.',
    originalPrice: 2499,
    discountedPrice: 1199,
    discountPercentage: 52,
    category: 'Accessories',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.9,
    reviewsCount: 450,
    sizes: ['One Size'],
    colors: [
      { name: 'Olive Canvas', hex: '#4B5320' },
      { name: 'Natural Khaki', hex: '#C2B280' }
    ],
    isBestseller: false,
    isNewArrival: true,
    isActive: true,
    stock: 18,
    sku: 'VT-AC-011',
    createdAt: '2026-11-01T00:00:00Z',
    details: [
      '20oz water-resistant waxed duck canvas',
      'Full-grain vegetable-tanned leather handles',
      'Dedicated padded 15-inch laptop compartment',
      'Reinforced solid brass rivets'
    ],
    fabric: 'Waxed Cotton Duck Canvas',
    careInstructions: ['Brush clean with cold water', 'Do not detergent wash']
  },
  {
    id: 'prod-012',
    name: 'Chunky Ribbed Wool Beanie',
    slug: 'chunky-ribbed-wool-beanie',
    description: 'A cozy fisherman beanie knit in a thick 3x3 ribbed gauge. Knitted with ultra-fine Merino wool that traps heat without itching your forehead. Can be worn cuffed high or relaxed.',
    shortDescription: 'Pure Merino wool fisherman beanie with adjustable cuff.',
    originalPrice: 1199,
    discountedPrice: 599,
    discountPercentage: 50,
    category: 'Accessories',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85'
    ],
    rating: 4.8,
    reviewsCount: 310,
    sizes: ['One Size'],
    colors: [
      { name: 'Forest Green', hex: '#20392F' },
      { name: 'Warm Cream', hex: '#EAE4D9' },
      { name: 'Burnt Ochre', hex: '#C95745' }
    ],
    isBestseller: false,
    isNewArrival: false,
    isActive: true,
    stock: 55,
    sku: 'VT-AC-012',
    createdAt: '2026-10-10T00:00:00Z',
    details: [
      '100% Extrafine Australian Merino wool',
      'Seamless 3D knit construction',
      'Double turn-up hem'
    ],
    fabric: '100% Extrafine Merino Wool',
    careInstructions: ['Hand wash cold with wool detergent', 'Dry flat']
  }
];

export const sampleReviews: Record<string, Review[]> = {
  'prod-001': [
    {
      id: 'rev-1',
      productId: 'prod-001',
      userName: 'Aarav Malhotra',
      rating: 5,
      comment: 'The quality of this hoodie is exceptional. Fabric is genuinely heavy and doesn’t lose shape after multiple washes. The forest green hue is even richer in person!',
      date: '3 days ago',
      verified: true
    },
    {
      id: 'rev-2',
      productId: 'prod-001',
      userName: 'Priya Sharma',
      rating: 5,
      comment: 'Ordered an L for an oversized cozy look. Perfectly captures that high-fashion editorial streetwear vibe. Fast delivery too.',
      date: '1 week ago',
      verified: true
    },
    {
      id: 'rev-3',
      productId: 'prod-001',
      userName: 'Vikram Mehta',
      rating: 4,
      comment: 'Super warm and very comfortable. The hood sits nicely structured on the shoulders. Highly recommended at this discount.',
      date: '2 weeks ago',
      verified: true
    }
  ],
  'prod-002': [
    {
      id: 'rev-4',
      productId: 'prod-002',
      userName: 'Rohan Deshmukh',
      rating: 5,
      comment: 'Authentic pure linen feel. Perfect for both casual dinners and vacation vibes. Drapes gracefully.',
      date: '5 days ago',
      verified: true
    }
  ]
};
