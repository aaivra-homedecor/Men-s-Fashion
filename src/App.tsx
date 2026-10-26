import React, { useState } from 'react';
import { HeaderNav, StudioTab } from './components/HeaderNav';
import { StorefrontSimulator } from './components/StorefrontSimulator';
import { ThemeXmlStudio } from './components/ThemeXmlStudio';
import { PostBuilderStudio } from './components/PostBuilderStudio';
import { LegalPagesStudio } from './components/LegalPagesStudio';
import { GuideStudio } from './components/GuideStudio';
import { ChecklistStudio } from './components/ChecklistStudio';
import { SAMPLE_PRODUCTS } from './data/products';
import { generateBloggerThemeXml } from './data/themeXml';
import { Product } from './utils/relatedProducts';

export default function App() {
  const [activeTab, setActiveTab] = useState<StudioTab>('storefront');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedLegalSlug, setSelectedLegalSlug] = useState<string>('privacy-policy');

  // Download XML directly
  const handleDownloadXml = () => {
    const xml = generateBloggerThemeXml({
      brandName: "MEN'S FASHION PICKS INDIA",
      tagline: 'Discover Your Style. Shop Smarter.',
    });
    const blob = new Blob([xml], { type: 'text/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'stylepickindia-theme.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenLegalPage = (slug: string) => {
    setSelectedLegalSlug(slug);
    setActiveTab('legal-pages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col font-sans text-[#222222]">
      {/* Studio Header & Tab Navigation */}
      <HeaderNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDownloadXml={handleDownloadXml}
      />

      {/* Main Content Workspace */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'storefront' && (
          <StorefrontSimulator
            products={SAMPLE_PRODUCTS}
            selectedProduct={selectedProduct}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenLegalPage={handleOpenLegalPage}
          />
        )}

        {activeTab === 'xml-theme' && (
          <ThemeXmlStudio onDownloadXml={handleDownloadXml} />
        )}

        {activeTab === 'post-builder' && (
          <PostBuilderStudio sampleProducts={SAMPLE_PRODUCTS} />
        )}

        {activeTab === 'legal-pages' && (
          <LegalPagesStudio initialSlug={selectedLegalSlug} />
        )}

        {activeTab === 'guide' && <GuideStudio />}

        {activeTab === 'checklist' && <ChecklistStudio />}
      </main>

      {/* Studio Workspace Footer */}
      <footer className="bg-white border-t border-[#E5E7EB] py-4 text-center text-xs text-[#6B7280]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Men's Fashion Picks India &bull; Custom Blogger Theme Engine
          </span>
          <span className="font-mono text-[11px] text-[#17211F]">
            100% Free Hosting &bull; Zero Server Dependencies &bull; Ready to Upload
          </span>
        </div>
      </footer>
    </div>
  );
}
