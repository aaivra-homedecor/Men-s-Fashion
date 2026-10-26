import test from 'node:test';
import assert from 'node:assert/strict';
import { generateBloggerThemeXml } from '../data/themeXml';
import { validateBloggerXml } from './xmlValidator';

test('generated Blogger XML theme passes full structural validation', () => {
  const xml = generateBloggerThemeXml({
    gaMeasurementId: 'G-TEST123456',
    brandName: "MEN'S FASHION PICKS INDIA",
  });

  const result = validateBloggerXml(xml);

  assert.equal(result.isValid, true, `Validation errors: ${result.errors.join('; ')}`);
  assert.equal(result.errors.length, 0);
  assert.equal(result.stats.hasBloggerNamespaces, true);
  assert.equal(result.stats.hasLayoutsVersion3, true);
  assert.equal(result.stats.hasRequiredWidgets, true);
  assert.equal(result.stats.hasSkinCdata, true);
  assert.equal(result.stats.hasAffiliateTracking, true);
  assert.ok(result.stats.totalLines > 100);
});

test('validator catches mismatched tags or missing namespaces', () => {
  const brokenXml = '<?xml version="1.0" encoding="UTF-8" ?>\n<html><b:if cond="true"><div>unclosed</div></html>';
  const result = validateBloggerXml(brokenXml);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.length > 0);
});
