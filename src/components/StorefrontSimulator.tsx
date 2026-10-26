import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Search, ExternalLink, ArrowRight, ArrowLeft, Check, Sparkles, Tag } from 'lucide-react';
import { Product, getRelatedProducts, filterProductsByLabel } from '../utils/relatedProducts';
import { CATEGORIES } from '../data/categories';

interface StorefrontSimulatorProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product | null) => void;
  onOpenLegalPage?: (slug: string) => void;
}

export const StorefrontSimulator: React.FC<StorefrontSimulatorProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
  onOpenLegalPage,
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gaEventToast, setGaEventToast] = useState<{
    event: string;
    store: string;
    product: string;
    url: string;
  } | null>(null);

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchesCat =
      activeCategory === 'All' ||
      p.category === activeCategory ||
      p.additionalLabels.includes(activeCategory);
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const budgetPicks = products.filter((p) => p.isBudgetFind);
  const trendingPicks = products.filter((p) => p.isTrending);

  // Handle Affiliate CTA click
  const handleAffiliateClick = (e: React.MouseEvent, product: Product) => {
    // Show simulated GA4 event toast
    setGaEventToast({
      event: 'affiliate_click',
      store: product.retailer,
      product: product.title,
      url: product.affiliateUrl,
    });

    // Auto dismiss toast after 4s
    setTimeout(() => {
      setGaEventToast(null);
    }, 4000);
  };

  const getViewportWidthClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[390px] shadow-2xl rounded-3xl border-8 border-[#17211F] overflow-hidden my-6';
      case 'tablet':
        return 'max-w-[768px] shadow-xl rounded-xl border border-[#E5E7EB] overflow-hidden my-4';
      case 'desktop':
      default:
        return 'w-full rounded-lg border border-[#E5E7EB] overflow-hidden';
    }
  };

  return (
    <div className="space-y-6">
      {/* Simulation Controls Toolbar */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#17211F]">
            Simulate Viewport:
          </span>
          <div className="inline-flex rounded-md border border-[#E5E7EB] p-0.5 bg-[#F5F1E8]">
            <button
              onClick={() => setViewport('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                viewport === 'desktop'
                  ? 'bg-[#17211F] text-white shadow'
                  : 'text-[#6B7280] hover:text-[#17211F]'
              }`}
              title="Desktop View (1200px+)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                viewport === 'tablet'
                  ? 'bg-[#17211F] text-white shadow'
                  : 'text-[#6B7280] hover:text-[#17211F]'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                viewport === 'mobile'
                  ? 'bg-[#17211F] text-white shadow'
                  : 'text-[#6B7280] hover:text-[#17211F]'
              }`}
              title="Mobile View (390px - Pinterest Standard)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile (Pinterest)</span>
            </button>
          </div>
        </div>

        {/* Pinterest Exact Landing Simulator Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C6A66B] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
            Test Pinterest Pin Landing:
          </span>
          <select
            value={selectedProduct ? selectedProduct.id : ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                onSelectProduct(null);
              } else {
                const found = products.find((p) => p.id === val);
                if (found) onSelectProduct(found);
              }
            }}
            className="text-xs border border-[#E5E7EB] rounded px-3 py-1.5 bg-[#F5F1E8] text-[#17211F] font-medium outline-none focus:border-[#C6A66B]"
          >
            <option value="">-- View Full Homepage --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                Pin Match: {p.title} ({p.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GA4 Tracking Event Simulator Toast */}
      {gaEventToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17211F] text-white border border-[#C6A66B] rounded-lg p-4 shadow-2xl max-w-md animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C6A66B]/20 text-[#C6A66B] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider text-[#C6A66B]">
                  GA4 Event Fired:
                </span>
                <span className="bg-white/10 text-white font-mono text-[11px] px-1.5 py-0.5 rounded">
                  {gaEventToast.event}
                </span>
              </div>
              <p className="text-xs text-[#D1D5DB]">
                Destination: <strong className="text-white">{gaEventToast.store}</strong>
              </p>
              <p className="text-xs text-[#D1D5DB] truncate max-w-[280px]">
                Product: {gaEventToast.product}
              </p>
              <p className="text-[10px] text-[#6B7280] font-mono truncate max-w-[300px]">
                Target: {gaEventToast.url}
              </p>
              <p className="text-[10px] text-[#C6A66B] italic pt-1">
                rel="sponsored nofollow noopener noreferrer" enforced
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Frame Container */}
      <div className="flex justify-center bg-[#E5E7EB]/40 p-2 sm:p-6 rounded-xl border border-dashed border-[#D1D5DB] min-h-[800px]">
        <div className={`bg-[#F5F1E8] transition-all duration-300 ${getViewportWidthClass()}`}>
          {/* 1. Announcement Bar */}
          <div className="bg-[#17211F] text-[#F5F1E8] text-[11px] sm:text-xs tracking-wider uppercase py-2 px-4 text-center font-medium border-b border-[#C6A66B]/30 flex items-center justify-center gap-1.5">
            <span className="text-[#C6A66B] font-bold tracking-widest uppercase">STYLE PICK INDIA:</span>
            <span>Trending Streetwear, Sneakers, &amp; Budget Wardrobe Finds</span>
          </div>

          {/* 2. Brand Header */}
          <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <button
                  onClick={() => {
                    onSelectProduct(null);
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-left group"
                >
                  <h1 className="text-sm sm:text-lg font-bold text-[#17211F] tracking-widest uppercase transition-colors group-hover:text-[#C6A66B]">
                    MEN'S FASHION PICKS INDIA
                  </h1>
                  <p className="text-[9px] sm:text-[10px] text-[#6B7280] tracking-wide">
                    Discover Your Style. Shop Smarter.
                  </p>
                </button>
              </div>

              {/* Navigation Links (Hidden if mobile viewport simulation is active or on smaller screens) */}
              {viewport !== 'mobile' && (
                <nav className="hidden md:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-[#17211F]">
                  <button
                    onClick={() => {
                      onSelectProduct(null);
                      setActiveCategory('All');
                    }}
                    className={`hover:text-[#C6A66B] transition-colors ${
                      activeCategory === 'All' && !selectedProduct ? 'text-[#C6A66B]' : ''
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      onSelectProduct(null);
                      setActiveCategory('All');
                    }}
                    className="hover:text-[#C6A66B] transition-colors"
                  >
                    Shop All
                  </button>
                  <button
                    onClick={() => {
                      onSelectProduct(null);
                      setActiveCategory('Streetwear');
                    }}
                    className={`hover:text-[#C6A66B] transition-colors ${
                      activeCategory === 'Streetwear' ? 'text-[#C6A66B]' : ''
                    }`}
                  >
                    Streetwear
                  </button>
                  <button
                    onClick={() => {
                      onSelectProduct(null);
                      setActiveCategory('Shoes & Sneakers');
                    }}
                    className={`hover:text-[#C6A66B] transition-colors ${
                      activeCategory === 'Shoes & Sneakers' ? 'text-[#C6A66B]' : ''
                    }`}
                  >
                    Shoes &amp; Sneakers
                  </button>
                  <button
                    onClick={() => {
                      onSelectProduct(null);
                      setActiveCategory('Budget Finds');
                    }}
                    className={`hover:text-[#C6A66B] transition-colors ${
                      activeCategory === 'Budget Finds' ? 'text-[#C6A66B]' : ''
                    }`}
                  >
                    Budget Finds
                  </button>
                </nav>
              )}

              {/* Search Form */}
              <div className="flex items-center bg-[#F5F1E8] border border-[#E5E7EB] rounded px-2.5 py-1 shrink-0">
                <Search className="w-3.5 h-3.5 text-[#6B7280] mr-1.5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (selectedProduct) onSelectProduct(null);
                  }}
                  className={`bg-transparent text-xs text-[#17211F] placeholder-[#6B7280] outline-none transition-all ${
                    viewport === 'mobile' ? 'w-16 focus:w-24' : 'w-24 sm:w-32 focus:w-40'
                  }`}
                />
              </div>
            </div>
          </header>

          {/* 3. Category Strip (Scrollable) */}
          <div className="bg-white border-b border-[#E5E7EB] overflow-x-auto scrollbar-none">
            <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 whitespace-nowrap">
              <button
                onClick={() => {
                  setActiveCategory('All');
                  onSelectProduct(null);
                }}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                  activeCategory === 'All' && !selectedProduct
                    ? 'bg-[#17211F] text-white'
                    : 'bg-[#F5F1E8] text-[#17211F] hover:bg-[#E5E7EB]'
                }`}
              >
                All Picks ({products.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    onSelectProduct(null);
                  }}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                    activeCategory === cat.name
                      ? 'bg-[#17211F] text-white'
                      : 'bg-[#F5F1E8] text-[#17211F] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* MAIN BODY: SWITCH BETWEEN EXACT PRODUCT PAGE OR HOMEPAGE/ARCHIVE */}
          {selectedProduct ? (
            /* ===================================================
               EXACT MATCH PRODUCT DETAIL VIEW (PINTEREST DESTINATION)
               =================================================== */
            <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
              {/* Breadcrumb Navigation */}
              <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
                <button
                  onClick={() => onSelectProduct(null)}
                  className="hover:text-[#17211F] transition-colors"
                >
                  Home
                </button>
                <span className="text-[#C6A66B]">&gt;</span>
                <button
                  onClick={() => {
                    setActiveCategory(selectedProduct.category);
                    onSelectProduct(null);
                  }}
                  className="hover:text-[#17211F] transition-colors font-medium"
                >
                  {selectedProduct.category}
                </button>
                <span className="text-[#C6A66B]">&gt;</span>
                <span className="text-[#17211F] font-semibold truncate max-w-[240px]">
                  {selectedProduct.title}
                </span>
              </nav>

              {/* Editorial Two-Column Product Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 sm:p-8 shadow-sm mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Left: Main Product Image */}
                  <div className="space-y-3">
                    <div className="aspect-[4/5] bg-[#F5F1E8] rounded-md overflow-hidden border border-[#E5E7EB] relative">
                      <img
                        src={selectedProduct.imageUrl}
                        alt={selectedProduct.imageAlt}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#17211F]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm">
                        {selectedProduct.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] text-center italic">
                      High-Resolution Verified Product Photo
                    </p>
                  </div>

                  {/* Right: Product Editorial & Conversion Details */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#F5F1E8] text-[#17211F] text-xs font-semibold px-2.5 py-0.5 rounded">
                        {selectedProduct.category}
                      </span>
                      <span className="bg-[#17211F] text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                        {selectedProduct.retailer}
                      </span>
                      {selectedProduct.isBudgetFind && (
                        <span className="bg-[#C6A66B]/20 text-[#17211F] border border-[#C6A66B]/40 text-xs font-semibold px-2 py-0.5 rounded">
                          Budget Pick
                        </span>
                      )}
                    </div>

                    <h1 className="text-xl sm:text-2xl font-bold text-[#17211F] mb-4 leading-snug">
                      {selectedProduct.title}
                    </h1>

                    {/* Short Description (2-4 lines) */}
                    <div className="text-sm text-[#4B5563] leading-relaxed mb-6 pb-6 border-b border-[#E5E7EB]">
                      <p>{selectedProduct.description}</p>
                    </div>

                    {/* Manual Price Info & Volatility Notice */}
                    <div className="bg-[#F5F1E8] border border-[#E5E7EB] rounded-md p-4 mb-6">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-[#17211F]">
                          {selectedProduct.price || 'Check Store'}
                        </span>
                        <span className="text-xs text-[#6B7280] uppercase tracking-wide">
                          &bull; Recorded Online Price
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7280] leading-normal">
                        Retailer pricing and inventory status may vary dynamically. Please check the current price, sizes, and ongoing coupons directly on {selectedProduct.retailer}.
                      </p>
                    </div>

                    {/* Primary Outbound Affiliate CTA */}
                    <a
                      href={selectedProduct.affiliateUrl}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      onClick={(e) => handleAffiliateClick(e, selectedProduct)}
                      className="w-full bg-[#17211F] hover:bg-[#C6A66B] text-white hover:text-[#17211F] text-sm font-bold uppercase tracking-wider py-4 px-6 rounded-md flex items-center justify-center gap-2 transition-all shadow active:scale-[0.99] mb-4 group"
                    >
                      <span>Visit Store &amp; Check Availability</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>

                    {/* Transparent Affiliate Disclosure */}
                    <div className="bg-[#FAFAF9] border border-dashed border-[#D1D5DB] rounded p-3 text-[11px] text-[#6B7280] leading-relaxed mb-6">
                      <strong>Affiliate Disclosure:</strong> When you click the link above and make a purchase, Men's Fashion Picks India may receive an affiliate commission at zero additional cost to you. We only recommend pieces we genuinely value.
                    </div>

                    {/* Secondary Navigation */}
                    <div className="flex items-center justify-between text-xs font-semibold pt-4 border-t border-[#E5E7EB]">
                      <button
                        onClick={() => {
                          setActiveCategory(selectedProduct.category);
                          onSelectProduct(null);
                        }}
                        className="text-[#17211F] hover:text-[#C6A66B] flex items-center gap-1"
                      >
                        Explore More in {selectedProduct.category} &rarr;
                      </button>
                      <button
                        onClick={() => onSelectProduct(null)}
                        className="text-[#6B7280] hover:text-[#17211F] flex items-center gap-1"
                      >
                        &larr; Back to Shop
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exact Related Products (Category priority, excludes current product) */}
              <div className="mt-8">
                <div className="border-b border-[#E5E7EB] pb-3 mb-6 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#17211F]">
                      Related {selectedProduct.category} Picks
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      Complementary styles curated to match this aesthetic
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveCategory(selectedProduct.category);
                      onSelectProduct(null);
                    }}
                    className="text-xs text-[#C6A66B] font-semibold hover:underline"
                  >
                    View All in Category &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {getRelatedProducts(selectedProduct, products, 4).map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectProduct(rel)}
                      className="bg-white border border-[#E5E7EB] rounded-md overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col"
                    >
                      <div className="aspect-[4/5] bg-[#E5E7EB] overflow-hidden relative">
                        <img
                          src={rel.imageUrl}
                          alt={rel.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 bg-[#17211F]/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {rel.retailer}
                        </span>
                      </div>
                      <div className="p-3 flex flex-col flex-grow">
                        <h4 className="text-xs font-semibold text-[#17211F] line-clamp-2 mb-2 group-hover:text-[#C6A66B] transition-colors">
                          {rel.title}
                        </h4>
                        <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#F5F1E8]">
                          <span className="text-xs font-bold text-[#17211F]">
                            {rel.price || 'Check'}
                          </span>
                          <span className="text-[10px] text-[#C6A66B] font-semibold group-hover:underline">
                            View Pick &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ===================================================
               HOMEPAGE & CATEGORY ARCHIVE VIEW
               =================================================== */
            <div>
              {/* Hero Banner (Only when on Homepage & not searching) */}
              {activeCategory === 'All' && searchQuery.trim() === '' && (
                <section className="bg-[#17211F] text-white py-12 px-6 sm:px-10 mb-10 text-center">
                  <div className="max-w-3xl mx-auto space-y-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
                      Curated Menswear Edit &bull; India
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                      Upgrade Your Everyday Style.
                    </h2>
                    <p className="text-xs sm:text-sm text-[#D1D5DB] max-w-xl mx-auto leading-relaxed">
                      Discover trending streetwear, affordable sneakers, everyday essentials, and men's accessories curated for modern Indian lifestyles.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          const target = document.getElementById('mfp-products-grid');
                          target?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-block bg-[#C6A66B] hover:bg-[#d6ba85] text-[#17211F] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded transition-all shadow-md active:scale-95"
                      >
                        Explore Collections
                      </button>
                    </div>
                  </div>
                </section>
              )}

              <div className="max-w-6xl mx-auto px-4 pb-12 space-y-12">
                {/* Shop by Category (6 Visual Luxury Cards) */}
                {activeCategory === 'All' && searchQuery.trim() === '' && (
                  <div>
                    <div className="border-b border-[#E5E7EB] pb-2.5 mb-6 flex items-baseline justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#17211F]">Shop by Category</h3>
                        <p className="text-xs text-[#6B7280]">
                          Targeted collections curated by garment and aesthetic
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {CATEGORIES.map((cat, idx) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.name)}
                          className="bg-white border border-[#E5E7EB] rounded-lg p-3 text-center hover:border-[#C6A66B] hover:-translate-y-1 transition-all group flex flex-col items-center"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#F5F1E8] flex items-center justify-center text-[#C6A66B] font-bold text-xs mb-2 group-hover:bg-[#17211F] group-hover:text-white transition-colors">
                            0{idx + 1}
                          </div>
                          <span className="text-xs font-bold text-[#17211F] group-hover:text-[#C6A66B] transition-colors">
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-[#6B7280] line-clamp-1 mt-0.5">
                            {cat.subcategories[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Products Grid */}
                <div id="mfp-products-grid">
                  <div className="border-b border-[#E5E7EB] pb-2.5 mb-6 flex items-baseline justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#17211F]">
                        {searchQuery ? `Search Results for "${searchQuery}"` : `${activeCategory} Collection`}
                      </h3>
                      <p className="text-xs text-[#6B7280]">
                        Showing {filteredProducts.length} curated style picks
                      </p>
                    </div>

                    {activeCategory !== 'All' && (
                      <button
                        onClick={() => setActiveCategory('All')}
                        className="text-xs text-[#C6A66B] font-semibold hover:underline"
                      >
                        Reset to All &rarr;
                      </button>
                    )}
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 text-center space-y-3">
                      <p className="text-sm text-[#6B7280]">
                        No fashion picks found matching your criteria.
                      </p>
                      <button
                        onClick={() => {
                          setActiveCategory('All');
                          setSearchQuery('');
                        }}
                        className="text-xs bg-[#17211F] text-white px-4 py-2 rounded font-semibold uppercase tracking-wider"
                      >
                        Clear Filters &amp; View All
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredProducts.map((p) => (
                        <article
                          key={p.id}
                          className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col"
                        >
                          <div
                            onClick={() => onSelectProduct(p)}
                            className="aspect-[4/5] bg-[#E5E7EB] overflow-hidden relative cursor-pointer"
                          >
                            <img
                              src={p.imageUrl}
                              alt={p.imageAlt}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <span className="absolute top-2.5 left-2.5 bg-[#17211F]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm">
                              {p.category}
                            </span>
                            {p.isBudgetFind && (
                              <span className="absolute bottom-2.5 left-2.5 bg-[#C6A66B] text-[#17211F] text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow">
                                Under ₹999
                              </span>
                            )}
                          </div>

                          <div className="p-4 flex flex-col flex-grow">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A66B] mb-1">
                              {p.retailer}
                            </span>
                            <h4
                              onClick={() => onSelectProduct(p)}
                              className="text-sm font-semibold text-[#17211F] line-clamp-2 mb-2 cursor-pointer group-hover:text-[#C6A66B] transition-colors"
                            >
                              {p.title}
                            </h4>

                            <div className="mt-auto pt-3 border-t border-[#F5F1E8] flex items-center justify-between">
                              <div>
                                <span className="text-sm font-bold text-[#17211F]">
                                  {p.price || 'Check'}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => onSelectProduct(p)}
                                  className="text-xs font-semibold text-[#17211F] hover:text-[#C6A66B] px-2 py-1"
                                >
                                  Details
                                </button>
                                <a
                                  href={p.affiliateUrl}
                                  target="_blank"
                                  rel="sponsored nofollow noopener noreferrer"
                                  onClick={(e) => handleAffiliateClick(e, p)}
                                  className="bg-[#17211F] hover:bg-[#C6A66B] text-white hover:text-[#17211F] text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-colors"
                                >
                                  Store &rarr;
                                </a>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                {/* Budget-Friendly Picks Section */}
                {activeCategory === 'All' && searchQuery.trim() === '' && (
                  <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E5E7EB]">
                      <div>
                        <h3 className="text-base font-bold text-[#17211F] flex items-center gap-2">
                          <Tag className="w-4 h-4 text-[#C6A66B]" />
                          Budget-Friendly Wardrobe Picks
                        </h3>
                        <p className="text-xs text-[#6B7280]">
                          Substantial cottons, sturdy shoes, and daily accessories under ₹1,499
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveCategory('Budget Finds')}
                        className="text-xs text-[#C6A66B] font-semibold hover:underline"
                      >
                        View All Budget &rarr;
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {budgetPicks.slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => onSelectProduct(p)}
                          className="border border-[#E5E7EB] rounded p-2.5 hover:border-[#C6A66B] cursor-pointer group transition-all"
                        >
                          <div className="aspect-[4/5] bg-[#F5F1E8] rounded overflow-hidden mb-2">
                            <img
                              src={p.imageUrl}
                              alt={p.imageAlt}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <span className="text-[10px] text-[#C6A66B] font-bold uppercase block">
                            {p.retailer}
                          </span>
                          <h4 className="text-xs font-semibold text-[#17211F] line-clamp-1 mb-1">
                            {p.title}
                          </h4>
                          <span className="text-xs font-bold text-[#17211F]">{p.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. Footer */}
          <footer className="bg-[#17211F] text-[#D1D5DB] border-t-2 border-[#C6A66B] mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">
                    MEN'S FASHION PICKS INDIA
                  </h4>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    An independent menswear curation project helping Indian men discover wearable streetwear, quality wardrobe essentials, and comfortable footwear.
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#C6A66B] mb-3">
                    Collections
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#9CA3AF]">
                    {CATEGORIES.map((c) => (
                      <li key={c.id}>
                        <button
                          onClick={() => {
                            setActiveCategory(c.name);
                            onSelectProduct(null);
                          }}
                          className="hover:text-white transition-colors"
                        >
                          {c.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#C6A66B] mb-3">
                    Information &amp; Legal
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#9CA3AF]">
                    <li>
                      <button
                        onClick={() => onOpenLegalPage && onOpenLegalPage('about-us')}
                        className="hover:text-white transition-colors"
                      >
                        About Us
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onOpenLegalPage && onOpenLegalPage('contact-us')}
                        className="hover:text-white transition-colors"
                      >
                        Contact Us
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onOpenLegalPage && onOpenLegalPage('privacy-policy')}
                        className="hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onOpenLegalPage && onOpenLegalPage('affiliate-disclosure')}
                        className="hover:text-white transition-colors"
                      >
                        Affiliate Disclosure
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onOpenLegalPage && onOpenLegalPage('disclaimer')}
                        className="hover:text-white transition-colors"
                      >
                        Disclaimer
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onOpenLegalPage && onOpenLegalPage('terms-and-conditions')}
                        className="hover:text-white transition-colors"
                      >
                        Terms &amp; Conditions
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 text-center text-[11px] text-[#6B7280] space-y-1">
                <p>&copy; 2026 Men's Fashion Picks India. Hosted on Google Blogger.</p>
                <p>
                  Affiliate Disclosure: This site contains affiliate links to verified partner retailers including Amazon.in and Flipkart.com. We may earn a commission from qualifying purchases at no extra cost to you.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
