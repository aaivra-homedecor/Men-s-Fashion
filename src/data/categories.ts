export interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  subcategories: string[];
  imageUrl: string;
  bloggerLabelUrl: string;
  badgeColor?: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'streetwear',
    name: 'Streetwear',
    slug: 'streetwear',
    tagline: 'Oversized fits, cargos, and relaxed urban aesthetics',
    description: 'Explore trending oversized graphic tees, utility cargo pants, heavyweight hoodies, and urban outfit essentials.',
    subcategories: ['Oversized T-shirts', 'Cargo pants', 'Hoodies', 'Streetwear outfits'],
    imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=700&q=80',
    bloggerLabelUrl: 'https://stylepickindia.blogspot.com/search/label/Streetwear',
  },
  {
    id: 'shoes-sneakers',
    name: 'Shoes & Sneakers',
    slug: 'shoes-sneakers',
    tagline: 'Everyday kicks, retro runners, and budget trainers',
    description: 'Find top-rated casual sneakers, lightweight running shoes, retro chunky silhouettes, and daily footwear.',
    subcategories: ['Casual sneakers', 'Running shoes', 'Sports shoes', 'Everyday footwear'],
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80',
    bloggerLabelUrl: 'https://stylepickindia.blogspot.com/search/label/Shoes%20%26%20Sneakers',
  },
  {
    id: 'tshirts-shirts',
    name: 'T-Shirts & Shirts',
    slug: 'tshirts-shirts',
    tagline: 'Heavyweight basics, boxy tees, textured resort shirts',
    description: 'Curated 220+ GSM solid t-shirts, classic pique polo shirts, Cuban collar linen shirts, and casual overshirts.',
    subcategories: ['Basic T-shirts', 'Oversized T-shirts', 'Polo T-shirts', 'Casual shirts'],
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    bloggerLabelUrl: 'https://stylepickindia.blogspot.com/search/label/T-Shirts%20%26%20Shirts',
  },
  {
    id: 'watches-accessories',
    name: 'Watches & Accessories',
    slug: 'watches-accessories',
    tagline: 'Minimalist timepieces, sunglasses, and leather goods',
    description: 'Subtle style amplifiers: matte chronograph watches, UV400 sunglasses, slim RFID leather wallets, and minimal belts.',
    subcategories: ['Watches', 'Sunglasses', 'Wallets', 'Belts', 'Other men\'s accessories'],
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80',
    bloggerLabelUrl: 'https://stylepickindia.blogspot.com/search/label/Watches%20%26%20Accessories',
  },
  {
    id: 'college-fits',
    name: 'College Fits',
    slug: 'college-fits',
    tagline: 'Effortless, comfortable campus outfits that don’t break the bank',
    description: 'Smart campus wardrobes: durable backpacks, casual shirts, easy denim, and comfortable low-tops made for Indian college life.',
    subcategories: ['College outfits', 'Casual everyday looks', 'Affordable outfit combinations'],
    imageUrl: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=700&q=80',
    bloggerLabelUrl: 'https://stylepickindia.blogspot.com/search/label/College%20Fits',
  },
  {
    id: 'budget-finds',
    name: 'Budget Finds',
    slug: 'budget-finds',
    tagline: 'High-value pieces under ₹999 & ₹1,499 with premium look',
    description: 'Curated deals and value-for-money wardrobe staples evaluated for fabric weight, stitching, and style longevity.',
    subcategories: ['Affordable fashion essentials', 'Value-for-money product selections', 'Budget-friendly shoes and accessories'],
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=80',
    bloggerLabelUrl: 'https://stylepickindia.blogspot.com/search/label/Budget%20Finds',
  },
];
