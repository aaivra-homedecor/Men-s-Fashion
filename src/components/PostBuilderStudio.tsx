import React, { useState } from 'react';
import { Copy, Check, Sparkles, Code, Settings, Eye, ExternalLink, Info } from 'lucide-react';
import { Product } from '../utils/relatedProducts';
import { CATEGORIES } from '../data/categories';
import { generatePostHtml, generateBloggerSettingsSummary, PostTemplateInput } from '../utils/postTemplate';

interface PostBuilderStudioProps {
  sampleProducts: Product[];
}

export const PostBuilderStudio: React.FC<PostBuilderStudioProps> = ({ sampleProducts }) => {
  const [formData, setFormData] = useState<PostTemplateInput>({
    title: sampleProducts[0].title,
    productId: sampleProducts[0].id,
    primaryCategory: sampleProducts[0].category,
    additionalLabels: sampleProducts[0].additionalLabels,
    imageUrl: sampleProducts[0].imageUrl,
    imageAlt: sampleProducts[0].imageAlt,
    shortDescription: sampleProducts[0].description,
    price: sampleProducts[0].price,
    retailer: sampleProducts[0].retailer,
    affiliateUrl: sampleProducts[0].affiliateUrl,
  });

  const [activeOutputTab, setActiveOutputTab] = useState<'html' | 'settings' | 'preview'>('html');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedSettings, setCopiedSettings] = useState(false);

  const postHtml = generatePostHtml(formData);
  const settings = generateBloggerSettingsSummary(formData);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(postHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleCopySettings = () => {
    const text = `Post Title: ${settings.postTitle}
Labels: ${settings.labels}
Custom Permalink: ${settings.customPermalink}
Search Description: ${settings.searchDescription}`;
    navigator.clipboard.writeText(text);
    setCopiedSettings(true);
    setTimeout(() => setCopiedSettings(false), 2500);
  };

  const loadSample = (product: Product) => {
    setFormData({
      title: product.title,
      productId: product.id,
      primaryCategory: product.category,
      additionalLabels: product.additionalLabels,
      imageUrl: product.imageUrl,
      imageAlt: product.imageAlt,
      shortDescription: product.description,
      price: product.price,
      retailer: product.retailer,
      affiliateUrl: product.affiliateUrl,
    });
  };

  return (
    <div className="space-y-6">
      {/* Introduction Box */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E5E7EB] pb-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#17211F] uppercase tracking-wider">
              Blogger Product Post Generator &amp; Template Engine
            </h2>
            <p className="text-xs text-[#6B7280]">
              Create consistent, SEO-optimized, affiliate-ready posts using Blogger's native Post Editor
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#17211F] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
              Load Sample Pick:
            </span>
            <select
              onChange={(e) => {
                const found = sampleProducts.find((p) => p.id === e.target.value);
                if (found) loadSample(found);
              }}
              value={formData.productId}
              className="text-xs border border-[#E5E7EB] rounded px-3 py-1.5 bg-[#F5F1E8] text-[#17211F] font-medium outline-none focus:border-[#C6A66B]"
            >
              {sampleProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.retailer})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-[#17211F] block mb-1">Product Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#F5F1E8] border border-[#E5E7EB] rounded p-2 text-[#17211F] outline-none focus:border-[#C6A66B]"
              placeholder="e.g. Retro Chunky Streetwear Sneakers"
            />
          </div>

          <div>
            <label className="font-semibold text-[#17211F] block mb-1">Primary Category</label>
            <select
              value={formData.primaryCategory}
              onChange={(e) => setFormData({ ...formData, primaryCategory: e.target.value })}
              className="w-full bg-[#F5F1E8] border border-[#E5E7EB] rounded p-2 text-[#17211F] outline-none focus:border-[#C6A66B]"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#17211F] block mb-1">Retailer</label>
            <select
              value={formData.retailer}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  retailer: e.target.value as 'Amazon India' | 'Flipkart' | 'Myntra' | 'Other',
                })
              }
              className="w-full bg-[#F5F1E8] border border-[#E5E7EB] rounded p-2 text-[#17211F] outline-none focus:border-[#C6A66B]"
            >
              <option value="Amazon India">Amazon India (Amazon.in)</option>
              <option value="Flipkart">Flipkart (Flipkart.com)</option>
              <option value="Myntra">Myntra (Myntra.com)</option>
              <option value="Other">Other Approved Retailer</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#17211F] block mb-1">Price (Optional)</label>
            <input
              type="text"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-[#F5F1E8] border border-[#E5E7EB] rounded p-2 text-[#17211F] outline-none focus:border-[#C6A66B]"
              placeholder="e.g. ₹1,899"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold text-[#17211F] block mb-1">
              Affiliate Destination URL (Exact partner link)
            </label>
            <input
              type="url"
              value={formData.affiliateUrl}
              onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
              className="w-full bg-[#F5F1E8] border border-[#E5E7EB] rounded p-2 text-[#17211F] font-mono outline-none focus:border-[#C6A66B]"
              placeholder="https://www.amazon.in/dp/...?tag=stylepickindia-21"
            />
          </div>

          <div>
            <label className="font-semibold text-[#17211F] block mb-1">High-Res Main Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full bg-[#F5F1E8] border border-[#E5E7EB] rounded p-2 text-[#17211F] font-mono outline-none focus:border-[#C6A66B]"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="font-semibold text-[#17211F] block mb-1">Image Alt Text (SEO)</label>
            <input
              type="text"
              value={formData.imageAlt}
              onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
              className="w-full bg-[#F5F1E8] border border-[#E5E7EB] rounded p-2 text-[#17211F] outline-none focus:border-[#C6A66B]"
              placeholder="e.g. Retro Chunky Suede Streetwear Sneakers in Off-White"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold text-[#17211F] block mb-1">
              Editorial Short Description (2-4 concise lines)
            </label>
            <textarea
              rows={3}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full bg-[#F5F1E8] border border-[#E5E7EB] rounded p-2 text-[#17211F] outline-none focus:border-[#C6A66B]"
              placeholder="Explain the actual fabric, cut, silhouette, and use case..."
            />
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
        {/* Output Tabs Header */}
        <div className="flex items-center justify-between bg-[#F5F1E8] border-b border-[#E5E7EB] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveOutputTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeOutputTab === 'html'
                  ? 'bg-[#17211F] text-white'
                  : 'text-[#6B7280] hover:text-[#17211F]'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>1. Blogger Post HTML</span>
            </button>
            <button
              onClick={() => setActiveOutputTab('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeOutputTab === 'settings'
                  ? 'bg-[#17211F] text-white'
                  : 'text-[#6B7280] hover:text-[#17211F]'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>2. Blogger Post Settings</span>
            </button>
            <button
              onClick={() => setActiveOutputTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeOutputTab === 'preview'
                  ? 'bg-[#17211F] text-white'
                  : 'text-[#6B7280] hover:text-[#17211F]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>3. Live Card Preview</span>
            </button>
          </div>

          <div>
            {activeOutputTab === 'html' && (
              <button
                onClick={handleCopyHtml}
                className="flex items-center gap-1.5 bg-[#17211F] hover:bg-[#C6A66B] text-white hover:text-[#17211F] text-xs font-semibold px-3 py-1.5 rounded transition-colors"
              >
                {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHtml ? 'Copied HTML!' : 'Copy Post HTML'}</span>
              </button>
            )}
            {activeOutputTab === 'settings' && (
              <button
                onClick={handleCopySettings}
                className="flex items-center gap-1.5 bg-[#17211F] hover:bg-[#C6A66B] text-white hover:text-[#17211F] text-xs font-semibold px-3 py-1.5 rounded transition-colors"
              >
                {copiedSettings ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSettings ? 'Copied Settings!' : 'Copy Settings'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Post HTML */}
        {activeOutputTab === 'html' && (
          <div className="p-4 space-y-3">
            <div className="bg-[#17211F] text-[#F5F1E8] rounded p-4 font-mono text-xs overflow-x-auto max-h-[420px]">
              <pre>{postHtml}</pre>
            </div>
            <div className="bg-[#F5F1E8] p-3 rounded text-xs text-[#374151] flex items-start gap-2">
              <Info className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
              <div>
                <strong>How to use in Blogger:</strong> In Blogger Post Editor, switch the editor view from <em>"Compose view"</em> to <em>"HTML view"</em> (using the pencil/HTML icon on the top-left toolbar), paste this code, and click <strong>Publish</strong>.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Blogger Post Settings */}
        {activeOutputTab === 'settings' && (
          <div className="p-6 space-y-4 text-xs">
            <div className="border border-[#E5E7EB] rounded-lg p-4 bg-[#F5F1E8] space-y-3">
              <div>
                <span className="font-bold text-[#17211F] uppercase tracking-wider block">Post Title:</span>
                <code className="text-[#17211F] font-mono bg-white px-2 py-1 rounded block border border-[#E5E7EB] mt-1">
                  {settings.postTitle}
                </code>
              </div>

              <div>
                <span className="font-bold text-[#17211F] uppercase tracking-wider block">
                  Labels (Right Sidebar &rarr; Labels):
                </span>
                <code className="text-[#17211F] font-mono bg-white px-2 py-1 rounded block border border-[#E5E7EB] mt-1">
                  {settings.labels}
                </code>
                <p className="text-[11px] text-[#6B7280] mt-1">
                  These labels automatically route the product to the matching category pages and feed the related products widget.
                </p>
              </div>

              <div>
                <span className="font-bold text-[#17211F] uppercase tracking-wider block">
                  Custom Permalink (Right Sidebar &rarr; Permalink):
                </span>
                <code className="text-[#17211F] font-mono bg-white px-2 py-1 rounded block border border-[#E5E7EB] mt-1">
                  {settings.customPermalink}
                </code>
                <p className="text-[11px] text-[#6B7280] mt-1">
                  Gives your post a permanent, shareable URL for Pinterest: <code>https://stylepickindia.blogspot.com/2026/10/{settings.customPermalink}</code>
                </p>
              </div>

              <div>
                <span className="font-bold text-[#17211F] uppercase tracking-wider block">
                  Search Description (Right Sidebar &rarr; Search Description):
                </span>
                <div className="bg-white px-2 py-1.5 rounded border border-[#E5E7EB] mt-1 text-[#374151]">
                  {settings.searchDescription}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Card Preview */}
        {activeOutputTab === 'preview' && (
          <div className="p-6 max-w-xl mx-auto">
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm space-y-4">
              <div className="aspect-[4/5] bg-[#F5F1E8] rounded overflow-hidden">
                <img src={formData.imageUrl} alt={formData.imageAlt} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs text-[#C6A66B] font-bold uppercase">{formData.retailer}</span>
                <h3 className="text-base font-bold text-[#17211F] mt-1">{formData.title}</h3>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">{formData.shortDescription}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#17211F]">{formData.price || 'Check Store'}</span>
                  <a
                    href={formData.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="bg-[#17211F] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded"
                  >
                    Check Price &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
