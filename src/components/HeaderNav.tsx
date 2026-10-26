import React from 'react';
import { ShoppingBag, FileCode, Edit3, Shield, BookOpen, CheckCircle, ExternalLink, Download } from 'lucide-react';

export type StudioTab = 'storefront' | 'xml-theme' | 'post-builder' | 'legal-pages' | 'guide' | 'checklist';

interface HeaderNavProps {
  activeTab: StudioTab;
  onTabChange: (tab: StudioTab) => void;
  onDownloadXml: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeTab, onTabChange, onDownloadXml }) => {
  return (
    <header className="bg-[#17211F] text-[#F5F1E8] border-b border-[#C6A66B]/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#C6A66B] flex items-center justify-center text-[#17211F] font-bold text-lg shadow-sm">
              MFP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-wider text-sm sm:text-base text-white uppercase">
                  Men's Fashion Picks India
                </span>
                <span className="hidden sm:inline-block bg-[#C6A66B]/20 text-[#C6A66B] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-[#C6A66B]/40">
                  Blogger Studio
                </span>
              </div>
              <p className="text-xs text-[#6B7280] font-mono hidden sm:block">
                stylepickindia.blogspot.com &bull; Pinterest India Affiliate Engine
              </p>
            </div>
          </div>

          {/* Quick Action XML Download */}
          <div className="flex items-center gap-2">
            <a
              href="https://stylepickindia.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs text-[#D1D5DB] hover:text-[#C6A66B] px-3 py-1.5 rounded transition-colors"
            >
              <span>Visit Live Blog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onDownloadXml}
              className="flex items-center gap-2 bg-[#C6A66B] hover:bg-[#d6ba85] text-[#17211F] font-semibold text-xs tracking-wider uppercase px-3.5 py-2 rounded transition-all shadow-sm active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Theme XML</span>
              <span className="sm:hidden">XML</span>
            </button>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex overflow-x-auto gap-1 sm:gap-2 border-t border-[#FFFFFF]/10 py-2 scrollbar-none">
          <button
            onClick={() => onTabChange('storefront')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'storefront'
                ? 'bg-[#C6A66B] text-[#17211F] shadow'
                : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Live Storefront Preview</span>
          </button>

          <button
            onClick={() => onTabChange('xml-theme')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'xml-theme'
                ? 'bg-[#C6A66B] text-[#17211F] shadow'
                : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Blogger XML Theme</span>
          </button>

          <button
            onClick={() => onTabChange('post-builder')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'post-builder'
                ? 'bg-[#C6A66B] text-[#17211F] shadow'
                : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Post Template Generator</span>
          </button>

          <button
            onClick={() => onTabChange('legal-pages')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'legal-pages'
                ? 'bg-[#C6A66B] text-[#17211F] shadow'
                : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Legal & Policy Drafts</span>
          </button>

          <button
            onClick={() => onTabChange('guide')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'guide'
                ? 'bg-[#C6A66B] text-[#17211F] shadow'
                : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pinterest & Blogger Guide</span>
          </button>

          <button
            onClick={() => onTabChange('checklist')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'checklist'
                ? 'bg-[#C6A66B] text-[#17211F] shadow'
                : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Acceptance Checklist</span>
          </button>
        </div>
      </div>
    </header>
  );
};
