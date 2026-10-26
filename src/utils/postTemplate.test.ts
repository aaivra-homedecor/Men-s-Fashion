import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePostHtml, generateBloggerSettingsSummary } from './postTemplate';

test('generatePostHtml outputs valid attributes for affiliate parsing', () => {
  const html = generatePostHtml({
    title: 'Retro Chunky Sneakers',
    primaryCategory: 'Shoes & Sneakers',
    additionalLabels: ['Streetwear', 'Budget Finds'],
    imageUrl: 'https://images.unsplash.com/test.jpg',
    imageAlt: 'Retro Chunky Sneakers in white',
    shortDescription: 'High quality retro sneakers with cushioned sole.',
    price: '₹1,899',
    retailer: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B0TEST?tag=stylepick-21',
  });

  assert.ok(html.includes('data-affiliate-store="Amazon India"'));
  assert.ok(html.includes('data-affiliate-url="https://www.amazon.in/dp/B0TEST?tag=stylepick-21"'));
  assert.ok(html.includes('data-price="₹1,899"'));
  assert.ok(html.includes('rel="sponsored nofollow noopener noreferrer"'));
});

test('generateBloggerSettingsSummary generates clean labels and slug', () => {
  const summary = generateBloggerSettingsSummary({
    title: 'Heavyweight Acid Wash T-Shirt',
    primaryCategory: 'Streetwear',
    additionalLabels: ['Budget Finds', 'Streetwear'],
    imageUrl: 'https://test.com/img.jpg',
    imageAlt: 'T-shirt alt',
    shortDescription: 'Nice boxy fit t-shirt.',
    retailer: 'Amazon India',
    affiliateUrl: 'https://amazon.in/dp/123',
  });

  assert.equal(summary.postTitle, 'Heavyweight Acid Wash T-Shirt');
  assert.equal(summary.labels, 'Streetwear, Budget Finds');
  assert.ok(summary.customPermalink.includes('heavyweight-acid-wash-t-shirt'));
});
