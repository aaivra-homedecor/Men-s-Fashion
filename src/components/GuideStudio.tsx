import React from 'react';
import { BookOpen, Pin, Layers, DollarSign, BarChart3, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const GuideStudio: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#17211F] uppercase tracking-wider flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-[#C6A66B]" />
          Men's Fashion Picks India &bull; Complete Operational Playbook
        </h2>
        <p className="text-xs text-[#6B7280]">
          Standard operating procedures for managing your Blogger affiliate storefront, linking Pinterest India pins, and tracking earnings without server costs.
        </p>
      </div>

      {/* Guide Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: The Exact Pinterest Pin to Post Matching Flow */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#17211F] font-bold text-sm uppercase tracking-wide border-b border-[#E5E7EB] pb-2">
            <Pin className="w-4 h-4 text-rose-600" />
            <span>1. Pinterest Pin &rarr; Exact Product Landing Flow</span>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Pinterest India users expect to immediately see the exact garment or shoe from the pin image when they tap through. Never link all pins to your homepage.
          </p>
          <div className="bg-[#F5F1E8] rounded p-3 text-xs space-y-2 border border-[#E5E7EB]">
            <p className="font-semibold text-[#17211F]">Follow this exact 3-step publishing routine:</p>
            <ol className="list-decimal list-inside space-y-1.5 text-[#374151]">
              <li><strong>Publish in Blogger First:</strong> Publish your post (e.g. <em>"Retro Chunky Suede Streetwear Sneakers"</em>) and copy its live published URL: <code>https://stylepickindia.blogspot.com/2026/10/retro-chunky-suede-sneakers.html</code>.</li>
              <li><strong>Create Pinterest Pin:</strong> Upload the matching product photograph to Pinterest India. Use an engaging pin title and description.</li>
              <li><strong>Set Destination Link:</strong> Paste the <em>exact post URL</em> into the Destination Link field. When users tap your Pin, they land directly on that specific shoe page with the "Visit Store" button ready!</li>
            </ol>
          </div>
        </div>

        {/* Module 2: Managing Products in Blogger */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#17211F] font-bold text-sm uppercase tracking-wide border-b border-[#E5E7EB] pb-2">
            <Layers className="w-4 h-4 text-[#C6A66B]" />
            <span>2. Adding, Editing &amp; Hiding Products</span>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Google Blogger acts as your zero-cost headless CMS. You do not need a paid database or rebuild step to manage inventory.
          </p>
          <div className="space-y-2 text-xs text-[#374151]">
            <div className="border border-[#E5E7EB] rounded p-2.5">
              <strong className="text-[#17211F] block mb-1">To Add a Product:</strong>
              Use our Post Template Generator to copy the HTML snippet. In Blogger &rarr; <em>Posts</em> &rarr; <em>New Post</em>, switch editor to HTML view, paste, add Labels, and click Publish.
            </div>
            <div className="border border-[#E5E7EB] rounded p-2.5">
              <strong className="text-[#17211F] block mb-1">To Update Prices or Links:</strong>
              Open the post in Blogger, edit the <code>data-price="₹1,299"</code> or <code>data-affiliate-url</code> attribute, and click Update. Changes reflect instantly!
            </div>
            <div className="border border-[#E5E7EB] rounded p-2.5">
              <strong className="text-[#17211F] block mb-1">To Hide or Remove Out-of-Stock Items:</strong>
              Click "Revert to draft" to hide the item from your storefront while preserving its content for later restocks, or click "Delete" to remove permanently.
            </div>
          </div>
        </div>

        {/* Module 3: Strict Label & Category Taxonomy */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#17211F] font-bold text-sm uppercase tracking-wide border-b border-[#E5E7EB] pb-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>3. Label Taxonomy &amp; Category Routing</span>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Blogger creates dynamic category archive pages based on labels. Maintain strict spelling to prevent broken navigation or duplicate buckets.
          </p>
          <div className="bg-[#F5F1E8] rounded p-3 text-xs space-y-2 border border-[#E5E7EB]">
            <p className="font-semibold text-[#17211F]">The 6 Canonical Category Labels:</p>
            <ul className="grid grid-cols-2 gap-1.5 font-mono text-[11px] text-[#17211F]">
              <li>&bull; Streetwear</li>
              <li>&bull; Shoes &amp; Sneakers</li>
              <li>&bull; T-Shirts &amp; Shirts</li>
              <li>&bull; Watches &amp; Accessories</li>
              <li>&bull; College Fits</li>
              <li>&bull; Budget Finds</li>
            </ul>
            <p className="text-[11px] text-[#6B7280] pt-1">
              Tip: A single product can carry multiple labels (e.g. <code>Shoes &amp; Sneakers, Budget Finds, College Fits</code>).
            </p>
          </div>
        </div>

        {/* Module 4: Google Analytics 4 (GA4) Click Tracking */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#17211F] font-bold text-sm uppercase tracking-wide border-b border-[#E5E7EB] pb-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>4. GA4 Affiliate Tracking &amp; Measurement</span>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Our Blogger XML theme automatically fires a custom GA4 event whenever a visitor clicks "Visit Store":
          </p>
          <div className="bg-[#17211F] text-[#F5F1E8] rounded p-3 font-mono text-[11px] space-y-1">
            <p className="text-[#C6A66B]">// Fired automatically on outbound affiliate clicks:</p>
            <p>gtag('event', 'affiliate_click', &#123;</p>
            <p>&nbsp;&nbsp;event_category: 'Affiliate',</p>
            <p>&nbsp;&nbsp;event_label: 'Retro Chunky Sneakers',</p>
            <p>&nbsp;&nbsp;affiliate_store: 'Amazon India',</p>
            <p>&nbsp;&nbsp;outbound_url: 'https://www.amazon.in/dp/...'</p>
            <p>&#125;);</p>
          </div>
          <p className="text-[11px] text-[#6B7280]">
            Note: Actual orders and commissions must be monitored in your Amazon Associates or Flipkart Affiliate dashboards, as third-party retailers do not share sales attribution back to client-side scripts.
          </p>
        </div>
      </div>

      {/* Module 5: Transparency on Blogger Automation Boundaries */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#17211F] font-bold text-sm uppercase tracking-wide border-b border-[#E5E7EB] pb-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>5. Honest Explanation: What Blogger Can and Cannot Automate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 rounded p-4 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What is 100% Automated by Blogger:</span>
            </div>
            <ul className="space-y-1 text-emerald-950 list-disc list-inside">
              <li>Category archives update instantly when labels are added.</li>
              <li>Related products query updates dynamically via JSON feeds.</li>
              <li>Free SSL certificate (HTTPS) and Google global CDN hosting.</li>
              <li>Sitemap generation and Google Search Console indexing.</li>
              <li>Search engine clean permalinks.</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded p-4 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>What Requires Manual Management (By Design):</span>
            </div>
            <ul className="space-y-1 text-amber-950 list-disc list-inside">
              <li><strong>No Automatic Retailer Scraping:</strong> Amazon &amp; Flipkart strictly forbid unauthorized scraping. Prices must be manually noted at time of curation.</li>
              <li><strong>No External Database Sync:</strong> Google Blogger has no server-side backend or webhook receiver. Changes must be made in the Blogger post editor.</li>
              <li><strong>Stock Verification:</strong> If a piece goes out of stock, toggle it to "Draft" in Blogger.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
