/**
 * XML Validation Utility for Blogger Themes
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalLines: number;
    hasBloggerNamespaces: boolean;
    hasLayoutsVersion3: boolean;
    hasRequiredWidgets: boolean;
    hasSkinCdata: boolean;
    hasAffiliateTracking: boolean;
  };
}

export function validateBloggerXml(xmlContent: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const lines = xmlContent.split('\n');
  const totalLines = lines.length;

  // 1. Check XML Declaration
  if (!xmlContent.trim().startsWith('<?xml version="1.0" encoding="UTF-8" ?>')) {
    errors.push('Missing or invalid XML declaration at beginning of file.');
  }

  // 2. Check Root <html ...> tag & required attributes
  const hasHtmlOpen = /<html[^>]*>/.test(xmlContent);
  const hasHtmlClose = xmlContent.includes('</html>');
  if (!hasHtmlOpen || !hasHtmlClose) {
    errors.push('Missing proper <html> root tags.');
  }

  const hasBloggerNamespaces =
    xmlContent.includes("xmlns:b='http://www.google.com/2005/gml/b'") ||
    xmlContent.includes('xmlns:b="http://www.google.com/2005/gml/b"');

  if (!hasBloggerNamespaces) {
    errors.push("Missing required Blogger XML namespace: xmlns:b='http://www.google.com/2005/gml/b'");
  }

  const hasLayoutsVersion3 =
    xmlContent.includes("b:layoutsVersion='3'") || xmlContent.includes('b:layoutsVersion="3"');
  if (!hasLayoutsVersion3) {
    errors.push("Missing required Blogger layout version attribute: b:layoutsVersion='3'");
  }

  const hasDefaultWidgetVersion2 =
    xmlContent.includes("b:defaultwidgetversion='2'") ||
    xmlContent.includes('b:defaultwidgetversion="2"');
  if (!hasDefaultWidgetVersion2) {
    warnings.push("Recommended Blogger widget version: b:defaultwidgetversion='2'");
  }

  // 3. Check <b:skin> with CDATA
  const hasSkinCdata = xmlContent.includes('<b:skin') && xmlContent.includes('<![CDATA[');
  if (!hasSkinCdata) {
    errors.push('Missing or malformed <b:skin> CDATA block for CSS styling.');
  }

  // 4. Check Required Widgets
  const hasBlogWidget = xmlContent.includes("type='Blog'") || xmlContent.includes('type="Blog"');
  if (!hasBlogWidget) {
    errors.push("Missing primary 'Blog' widget (<b:widget type='Blog' ...>)");
  }

  const hasHeaderOrBrand = xmlContent.includes("mfp-logo-link") || xmlContent.includes("type='Header'");
  if (!hasHeaderOrBrand) {
    warnings.push("Brand or header widget not detected.");
  }

  // 5. Check Single-Item Post Detail structure (Pinterest landing page)
  const hasPostViewBranch = xmlContent.includes('data:view.isPost');
  if (!hasPostViewBranch) {
    errors.push('Missing data:view.isPost branch for dedicated product detail pages.');
  }

  const hasAffiliateTracking =
    xmlContent.includes('affiliate_click') && xmlContent.includes('rel=\'sponsored');
  if (!hasAffiliateTracking) {
    warnings.push('Affiliate click tracking or sponsored link relations may be incomplete.');
  }

  // 6. Basic well-formedness: check balanced tags for key elements
  const openTags = (xmlContent.match(/<b:if\b/g) || []).length;
  const closeTags = (xmlContent.match(/<\/b:if>/g) || []).length;
  if (openTags !== closeTags) {
    errors.push(`Mismatched <b:if> tags: ${openTags} opened vs ${closeTags} closed.`);
  }

  const openLoops = (xmlContent.match(/<b:loop\b/g) || []).length;
  const closeLoops = (xmlContent.match(/<\/b:loop>/g) || []).length;
  if (openLoops !== closeLoops) {
    errors.push(`Mismatched <b:loop> tags: ${openLoops} opened vs ${closeLoops} closed.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      totalLines,
      hasBloggerNamespaces,
      hasLayoutsVersion3,
      hasRequiredWidgets: hasBlogWidget,
      hasSkinCdata,
      hasAffiliateTracking,
    },
  };
}
