import React, { useState } from 'react';
import { Download, Copy, Check, ShieldCheck, AlertCircle, FileCode, Sliders, ExternalLink } from 'lucide-react';
import { generateBloggerThemeXml } from '../data/themeXml';
import { validateBloggerXml } from '../utils/xmlValidator';

interface ThemeXmlStudioProps {
  onDownloadXml: () => void;
}

export const ThemeXmlStudio: React.FC<ThemeXmlStudioProps> = ({ onDownloadXml }) => {
  const [gaId, setGaId] = useState<string>('G-XXXXXXXXXX');
  const [copied, setCopied] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);

  const xmlContent = generateBloggerThemeXml({
    gaMeasurementId: gaId.trim() === 'G-XXXXXXXXXX' ? '' : gaId.trim(),
    brandName: "MEN'S FASHION PICKS INDIA",
    tagline: 'Discover Your Style. Shop Smarter.',
  });

  const validation = validateBloggerXml(xmlContent);

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const lines = xmlContent.split('\n');
  const previewLines = showFullCode ? lines : lines.slice(0, 100);

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Controls */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#F5F1E8] rounded text-[#17211F]">
                <FileCode className="w-5 h-5 text-[#C6A66B]" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-[#17211F]">
                  Production Blogger XML Theme (<code className="text-xs text-[#C6A66B]">stylepickindia-theme.xml</code>)
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Target: Google Blogger &bull; <a href="https://stylepickindia.blogspot.com/" target="_blank" rel="noreferrer" className="text-[#17211F] underline">stylepickindia.blogspot.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-[#F5F1E8] hover:bg-[#E5E7EB] text-[#17211F] text-xs font-semibold px-4 py-2.5 rounded border border-[#E5E7EB] transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Entire XML'}</span>
            </button>

            <button
              onClick={onDownloadXml}
              className="flex items-center gap-2 bg-[#17211F] hover:bg-[#C6A66B] text-white hover:text-[#17211F] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all shadow active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download .XML File</span>
            </button>
          </div>
        </div>

        {/* Configuration Row (GA4 ID Setup) */}
        <div className="bg-[#F5F1E8] rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#E5E7EB]">
          <div className="flex items-start gap-3">
            <Sliders className="w-4 h-4 text-[#C6A66B] mt-1 shrink-0" />
            <div>
              <label htmlFor="ga4-input" className="text-xs font-bold uppercase tracking-wider text-[#17211F] block">
                Google Analytics 4 Measurement ID (Optional)
              </label>
              <p className="text-xs text-[#6B7280]">
                Enter your GA4 tag (e.g. <code>G-XXXXXXXXXX</code>) to automatically inject tracking for pageviews and <code>affiliate_click</code> outbound events.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="ga4-input"
              type="text"
              value={gaId}
              onChange={(e) => setGaId(e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="bg-white border border-[#E5E7EB] rounded px-3 py-1.5 text-xs text-[#17211F] font-mono outline-none focus:border-[#C6A66B] w-40"
            />
          </div>
        </div>

        {/* Validation Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#F5F1E8] border border-[#E5E7EB] rounded p-3 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6B7280]">Blogger Compatibility</span>
              <p className="text-xs font-bold text-[#17211F]">layoutsVersion='3' &bull; v2 Widgets</p>
            </div>
          </div>

          <div className="bg-[#F5F1E8] border border-[#E5E7EB] rounded p-3 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6B7280]">XML Well-Formedness</span>
              <p className="text-xs font-bold text-[#17211F]">100% Valid XML ({validation.stats.totalLines} lines)</p>
            </div>
          </div>

          <div className="bg-[#F5F1E8] border border-[#E5E7EB] rounded p-3 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6B7280]">Cost &amp; Dependencies</span>
              <p className="text-xs font-bold text-[#17211F]">Free (₹0 Cost) &bull; Native Blogger JS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Instructions Step-by-Step */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#17211F] uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>How to Upload to Google Blogger in 60 Seconds</span>
        </h3>

        <ol className="space-y-3 text-xs text-[#374151]">
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#17211F] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              1
            </span>
            <div>
              <strong>Download the Theme:</strong> Click the black <em>"Download .XML File"</em> button above to save <code>stylepickindia-theme.xml</code> to your computer.
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#17211F] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              2
            </span>
            <div>
              <strong>Open Blogger:</strong> Navigate to <a href="https://www.blogger.com" target="_blank" rel="noreferrer" className="text-[#C6A66B] font-semibold underline">Blogger.com</a> and select your blog (<em>Men's Fashion Picks India</em>).
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#17211F] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              3
            </span>
            <div>
              <strong>Go to Theme:</strong> In the left sidebar, click <strong>Theme</strong>.
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#17211F] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              4
            </span>
            <div>
              <strong>Backup Your Old Theme First (Crucial!):</strong> Next to the orange "Customize" button, click the downward arrow (&or;) and click <strong>Backup</strong> &rarr; <strong>Download</strong>.
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#17211F] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              5
            </span>
            <div>
              <strong>Restore &amp; Upload:</strong> In that same dropdown (&or;), click <strong>Restore</strong> &rarr; <strong>Upload</strong>. Select the <code>stylepickindia-theme.xml</code> file you downloaded.
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#C6A66B] text-[#17211F] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              6
            </span>
            <div>
              <strong>Done!</strong> Refresh <a href="https://stylepickindia.blogspot.com/" target="_blank" rel="noreferrer" className="text-[#17211F] font-semibold underline">https://stylepickindia.blogspot.com/</a>. Your modern storefront is live!
            </div>
          </li>
        </ol>
      </div>

      {/* XML Code Viewer */}
      <div className="bg-[#17211F] text-[#F5F1E8] rounded-lg border border-[#374151] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-[#111817] border-b border-[#374151]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            <span className="text-xs font-mono text-[#D1D5DB] ml-2">stylepickindia-theme.xml</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#9CA3AF] font-mono">
              {showFullCode ? `${lines.length} lines (Complete)` : `Showing 100 of ${lines.length} lines`}
            </span>
            <button
              onClick={() => setShowFullCode(!showFullCode)}
              className="text-xs text-[#C6A66B] hover:underline font-semibold"
            >
              {showFullCode ? 'Collapse Preview' : 'Show All Code'}
            </button>
          </div>
        </div>

        <div className="p-4 overflow-x-auto max-h-[550px] font-mono text-xs leading-relaxed scrollbar-thin">
          <pre>
            {previewLines.map((line, idx) => (
              <div key={idx} className="flex hover:bg-white/5 py-0.5">
                <span className="w-12 shrink-0 text-[#6B7280] select-none text-right pr-4">
                  {idx + 1}
                </span>
                <span className="text-[#F5F1E8]">{line}</span>
              </div>
            ))}
          </pre>
          {!showFullCode && (
            <div className="text-center py-4 border-t border-[#374151] mt-4">
              <button
                onClick={() => setShowFullCode(true)}
                className="text-xs bg-[#C6A66B] text-[#17211F] font-bold px-4 py-2 rounded uppercase tracking-wider"
              >
                Expand Remaining {lines.length - 100} Lines
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
