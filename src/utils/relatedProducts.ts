export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  additionalLabels: string[];
  imageUrl: string;
  imageAlt: string;
  description: string;
  price?: string;
  retailer: 'Amazon India' | 'Flipkart' | 'Myntra' | 'Other';
  affiliateUrl: string;
  isBudgetFind?: boolean;
  isTrending?: boolean;
  publishedDate: string;
}

/**
 * Computes related products for a given target product.
 * Selection priority:
 * 1. Same category first
 * 2. Shared additional labels second
 * 3. Never includes the target product itself
 * 4. Deduplicated
 * 5. Capped at target limit (default 4)
 */
export function getRelatedProducts(
  currentProduct: Product,
  allProducts: Product[],
  limit: number = 4
): Product[] {
  // Exclude current product
  const candidates = allProducts.filter((p) => p.id !== currentProduct.id);

  // Score candidates
  const scored = candidates.map((p) => {
    let score = 0;
    // Direct category match: 10 points
    if (p.category === currentProduct.category) {
      score += 10;
    }
    // Shared category in additional labels: 5 points each
    if (p.additionalLabels.includes(currentProduct.category)) {
      score += 5;
    }
    if (currentProduct.additionalLabels.includes(p.category)) {
      score += 5;
    }
    // Common labels: 2 points each
    for (const label of p.additionalLabels) {
      if (currentProduct.additionalLabels.includes(label)) {
        score += 2;
      }
    }
    // Budget find overlap: 1 point
    if (p.isBudgetFind && currentProduct.isBudgetFind) {
      score += 1;
    }
    return { product: p, score };
  });

  // Sort by score descending, then by recency
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.product.publishedDate).getTime() - new Date(a.product.publishedDate).getTime();
  });

  // Return top products up to limit
  return scored.slice(0, limit).map((s) => s.product);
}

/**
 * Filter products by category or label
 */
export function filterProductsByLabel(products: Product[], label: string): Product[] {
  if (!label || label === 'All') return products;
  const normalized = label.toLowerCase().trim();
  return products.filter((p) => {
    return (
      p.category.toLowerCase().trim() === normalized ||
      p.additionalLabels.some((l) => l.toLowerCase().trim() === normalized)
    );
  });
}
