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