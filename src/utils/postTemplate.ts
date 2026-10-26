import { Product } from './relatedProducts';

export interface PostTemplateInput {
  title: string;
  productId?: string;
  primaryCategory: string;
  additionalLabels: string[];
  imageUrl: string;
  imageAlt: string;
  shortDescription: string;
  price?: string;
  retailer: 'Amazon India' | 'Flipkart' | 'Myntra' | 'Other';
  affiliateUrl: string;
  searchDescription?: string;
}

/**
 * Generates the clean, standards-compliant HTML snippet
 * for pasting into the Blogger Post Editor (HTML View).
 */
export function generatePostHtml(input: PostTemplateInput): string {
  const priceDisplay = input.price ? input.price.trim() : 'Check Store';
  const pid = input.productId || 'mfp-' + Date.now().toString().slice(-6);

  return `<!-- MEN'S FASHION PICKS INDIA - PRODUCT POST TEMPLATE -->
<div class="affiliate-product-card" 
     id="${pid}"
     data-affiliate-store="${input.retailer}"
     data-affiliate-url="${input.affiliateUrl}"
     data-price="${priceDisplay}"
     data-category="${input.primaryCategory}">

  <!-- Main High-Resolution Product Image -->
  <div class="mfp-post-image-container" style="margin-bottom: 24px; text-align: center;">
    <img src="${input.imageUrl}" 
         alt="${input.imageAlt || input.title}" 
         style="max-width: 100%; height: auto; border-radius: 6px; aspect-ratio: 4/5; object-fit: cover;" 
         loading="eager" />
  </div>

  <!-- Editorial Short Description (2-4 concise lines) -->
  <div class="mfp-post-description" style="font-size: 16px; line-height: 1.7; color: #374151; margin-bottom: 24px;">
    <p>${input.shortDescription}</p>
  </div>

  <!-- Manual Price Box & Real-Time Availability Notice -->
  <div class="mfp-price-callout" style="background: #F5F1E8; border: 1px solid #E5E7EB; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
    <div style="display: flex; align-items: baseline; gap: 8px;">
      <span style="font-size: 22px; font-weight: 700; color: #17211F;">${priceDisplay}</span>
      <span style="font-size: 12px; color: #6B7280; text-transform: uppercase;">&bull; Best Retailer Price</span>
    </div>
    <p style="font-size: 11px; color: #6B7280; margin-top: 4px; line-height: 1.4;">
      Pricing and inventory availability fluctuate frequently on ${input.retailer}. Please verify final price, coupon discounts, and delivery dates directly on the merchant store.
    </p>
  </div>

  <!-- Direct Fallback Affiliate Button (Visible in RSS / basic feeds) -->
  <div class="mfp-button-fallback" style="margin-bottom: 24px;">
    <a href="${input.affiliateUrl}" 
       target="_blank" 
       rel="sponsored nofollow noopener noreferrer"
       style="display: inline-block; background-color: #17211F; color: #FFFFFF; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em; padding: 14px 28px; border-radius: 4px; text-decoration: none;">
      Check Price on ${input.retailer} &rarr;
    </a>
  </div>

  <!-- Mandatory FTC / ASCI Affiliate Disclosure -->
  <div class="mfp-post-disclosure" style="font-size: 11px; color: #6B7280; background: #FAFAF9; border-left: 3px solid #C6A66B; padding: 10px 14px; margin-top: 20px;">
    <em>Disclosure: When you buy through links on our site, Men's Fashion Picks India may earn an affiliate commission from qualifying purchases at no extra cost to you.</em>
  </div>
</div>`;
}

/**
 * Blogger Post Metadata & Settings helper
 */
export function generateBloggerSettingsSummary(input: PostTemplateInput) {
  const allLabels = [input.primaryCategory, ...input.additionalLabels].filter(Boolean);
  const uniqueLabels = Array.from(new Set(allLabels)).join(', ');
  const permalinkSlug = input.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 48);

  const searchDesc =
    input.searchDescription ||
    `${input.title} - Curated Men's Fashion Pick on ${input.retailer}. ${input.shortDescription.slice(0, 95)}...`;

  return {
    postTitle: input.title,
    labels: uniqueLabels,
    customPermalink: `${permalinkSlug}.html`,
    searchDescription: searchDesc.slice(0, 150),
    featuredImageAlt: input.imageAlt || input.title,
  };
}
