import test from 'node:test';
import assert from 'node:assert/strict';
import { getRelatedProducts, filterProductsByLabel, Product } from './relatedProducts';

const sampleProducts: Product[] = [
  {
    id: 'prod-1',
    slug: 'retro-chunky-sneakers',
    title: 'Retro Chunky Streetwear Sneakers',
    category: 'Shoes & Sneakers',
    additionalLabels: ['Streetwear', 'Budget Finds'],
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Retro Chunky Streetwear Sneakers',
    description: 'Chunky sole sneakers with breathable mesh.',
    price: '₹1,799',
    retailer: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE1?tag=stylepick-21',
    isBudgetFind: true,
    isTrending: true,
    publishedDate: '2026-10-20',
  },
  {
    id: 'prod-2',
    slug: 'canvas-low-top-sneakers',
    title: 'Minimalist Canvas Low-Top Sneakers',
    category: 'Shoes & Sneakers',
    additionalLabels: ['Budget Finds', 'College Fits'],
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Minimalist Canvas Low-Top Sneakers',
    description: 'Everyday off-white canvas lace-ups.',
    price: '₹999',
    retailer: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE2?tag=stylepick-21',
    isBudgetFind: true,
    publishedDate: '2026-10-21',
  },
  {
    id: 'prod-3',
    slug: 'running-sports-shoes',
    title: 'Breathable Lightweight Running Shoes',
    category: 'Shoes & Sneakers',
    additionalLabels: ['Streetwear'],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Breathable Lightweight Running Shoes',
    description: 'Cushioned foam sole for daily walking and running.',
    price: '₹1,499',
    retailer: 'Flipkart',
    affiliateUrl: 'https://www.flipkart.com/item/EXAMPLE3',
    publishedDate: '2026-10-22',
  },
  {
    id: 'prod-4',
    slug: 'oversized-acid-wash-tee',
    title: 'Heavyweight Acid Wash T-Shirt',
    category: 'Streetwear',
    additionalLabels: ['T-Shirts & Shirts', 'Budget Finds'],
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Heavyweight Acid Wash T-Shirt',
    description: '240 GSM pure cotton relaxed boxy fit tee.',
    price: '₹699',
    retailer: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE4?tag=stylepick-21',
    isBudgetFind: true,
    publishedDate: '2026-10-18',
  },
  {
    id: 'prod-5',
    slug: 'matte-black-chronograph',
    title: 'Minimalist Matte Black Chronograph Watch',
    category: 'Watches & Accessories',
    additionalLabels: ['Budget Finds'],
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Minimalist Matte Black Chronograph Watch',
    description: 'Clean dial with stainless steel mesh strap.',
    price: '₹1,299',
    retailer: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE5?tag=stylepick-21',
    publishedDate: '2026-10-15',
  },
];

test('getRelatedProducts never includes the current product', () => {
  const current = sampleProducts[0]; // prod-1
  const related = getRelatedProducts(current, sampleProducts, 4);
  const containsSelf = related.some((p) => p.id === current.id);
  assert.equal(containsSelf, false);
});

test('getRelatedProducts prioritizes same category products', () => {
  const current = sampleProducts[0]; // Shoes & Sneakers
  const related = getRelatedProducts(current, sampleProducts, 2);
  assert.equal(related.length, 2);
  // Both top related must be Shoes & Sneakers (prod-2 and prod-3)
  assert.equal(related[0].category, 'Shoes & Sneakers');
  assert.equal(related[1].category, 'Shoes & Sneakers');
});

test('filterProductsByLabel filters by primary category and additional labels', () => {
  const streetwear = filterProductsByLabel(sampleProducts, 'Streetwear');
  // prod-1 (additional), prod-3 (additional), prod-4 (primary category)
  assert.equal(streetwear.length, 3);

  const budget = filterProductsByLabel(sampleProducts, 'Budget Finds');
  // prod-1, prod-2, prod-4, prod-5
  assert.equal(budget.length, 4);

  const all = filterProductsByLabel(sampleProducts, 'All');
  assert.equal(all.length, sampleProducts.length);
});
