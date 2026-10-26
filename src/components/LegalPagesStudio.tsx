import React, { useState } from 'react';
import { Shield, Copy, Check, Info, FileText } from 'lucide-react';
import { LEGAL_PAGES, LegalPage } from '../data/legalPages';

interface LegalPagesStudioProps {
  initialSlug?: string;
}

export const LegalPagesStudio: React.FC<LegalPagesStudioProps> = ({ initialSlug }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(initialSlug || 'privacy-policy');
  const [copied, setCopied] = useState(false);

  const currentPage = LEGAL_PAGES.find((p) => p.slug === selectedSlug) || LEGAL_PAGES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPage.contentHtml.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#17211F] uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C6A66B]" />
              Blogger Static Legal &amp; Information Pages
            </h2>
            <p className="text-xs text-[#6B7280]">
              Customizable policy drafts compliant with Indian IT guidelines, FTC affiliate disclosures, and consumer protection standards
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-[#17211F] hover:bg-[#C6A66B] text-white hover:text-[#17211F] text-xs font-semibold px-4 py-2.5 rounded transition-all shadow-sm active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied HTML!' : `Copy ${currentPage.title} HTML`}</span>
          </button>
        </div>

        {/* Notice on customizing placeholders */}
        <div className="bg-[#F5F1E8] border-l-4 border-[#C6A66B] p-3 text-xs text-[#374151] rounded-r">
          <strong>Important Customization Reminder:</strong> Replace the placeholder <code>[YOUR_EMAIL_HERE]</code> with your actual contact or business email address before publishing on Blogger.
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] px-3 py-2 block">
            Select Document
          </span>
          {LEGAL_PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => setSelectedSlug(page.slug)}
              className={`w-full text-left px-3 py-2.5 rounded text-xs font-semibold flex items-center justify-between transition-colors ${
                selectedSlug === page.slug
                  ? 'bg-[#17211F] text-white shadow'
                  : 'text-[#374151] hover:bg-[#F5F1E8]'
              }`}
            >
              <span>{page.title}</span>
              <FileText className={`w-3.5 h-3.5 ${selectedSlug === page.slug ? 'text-[#C6A66B]' : 'text-[#9CA3AF]'}`} />
            </button>
          ))}

          <div className="pt-4 border-t border-[#E5E7EB] px-3 text-[11px] text-[#6B7280] space-y-2">
            <span className="font-bold text-[#17211F] uppercase block">How to Publish:</span>
            <p>1. Open Blogger &rarr; <strong>Pages</strong></p>
            <p>2. Click <strong>+ New Page</strong></p>
            <p>3. Enter Title: <em>"{currentPage.title}"</em></p>
            <p>4. Switch to HTML view and paste</p>
            <p>5. Click <strong>Publish</strong></p>
          </div>
        </div>

        {/* Document Content Viewer */}
        <div className="md:col-span-3 bg-white border border-[#E5E7EB] rounded-lg p-6 sm:p-8 shadow-sm space-y-4">
          <div className="border-b border-[#E5E7EB] pb-3 flex items-baseline justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#17211F]">{currentPage.title}</h3>
              <p className="text-xs text-[#6B7280] mt-1">{currentPage.summary}</p>
            </div>
            <span className="text-xs text-[#6B7280]">Last Updated: {currentPage.lastUpdated}</span>
          </div>

          {/* Rendered HTML */}
          <div
            className="prose prose-sm max-w-none text-xs sm:text-sm text-[#374151] space-y-3 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentPage.contentHtml }}
          />
        </div>
      </div>
    </div>
  );
};
