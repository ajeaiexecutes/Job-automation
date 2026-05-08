// src/utils/navigation.js

import { withRetry } from "./retry.js";

/**
 * Safely navigates to a URL with retries and state recovery.
 * @param {import('playwright').Page} page 
 * @param {string} url 
 * @param {Object} options 
 */
export async function safeNavigate(page, url, options = { waitUntil: "domcontentloaded", timeout: 30000 }) {
  return await withRetry(async () => {
    try {
      console.log(`Navigating to: ${url}`);
      await page.goto(url, options);
    } catch (error) {
      if (error.name === 'TimeoutError') {
        console.error(`Timeout while navigating to ${url}. Attempting to stop loading and proceed.`);
        await page.evaluate(() => window.stop());
      } else {
        throw error;
      }
    }
  }, { retries: 2 });
}
