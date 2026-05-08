// src/apply/easyApplyDetector.js

export async function detectEasyApply(page) {

  const pageText =
    await page.textContent("body");

  const lowerText =
    pageText.toLowerCase();


  // keywords indicating simple apply
  const easyApplyKeywords = [
    "apply",
    "easy apply",
    "apply now",
  ];

  // Platform specific selector check
  const liEasyApply = await page.locator("button.jobs-apply-button--top-card").isVisible();
  const indeedEasyApply = await page.locator("[data-testid='indeed-apply-button']").isVisible();
  
  if (liEasyApply || indeedEasyApply) return true;


  // keywords indicating external redirects
  const blockedKeywords = [
    "workday",
    "taleo",
    "external",
    "redirect",
  ];


  const hasEasyApply =
    easyApplyKeywords.some((keyword) =>
      lowerText.includes(keyword)
    );


  const hasBlockedKeyword =
    blockedKeywords.some((keyword) =>
      lowerText.includes(keyword)
    );


  if (hasEasyApply && !hasBlockedKeyword) {
    return true;
  }

  return false;
}