// src/utils/interaction.js

import { withRetry } from "./retry.js";
import { delay } from "./delay.js";

/**
 * Safely clicks an element after ensuring it's visible and enabled.
 * @param {import('playwright').Locator} locator 
 */
export async function safeClick(locator) {
  await withRetry(async () => {
    await locator.waitFor({ state: "visible", timeout: 10000 });
    await locator.scrollIntoViewIfNeeded();
    await delay(500, 1000); // Small human-like pause before click
    await locator.click({ force: false });
  }, { retries: 2 });
}

/**
 * Safely types text into an input field.
 * @param {import('playwright').Locator} locator 
 * @param {string} text 
 */
export async function safeType(locator, text) {
  await withRetry(async () => {
    await locator.waitFor({ state: "visible", timeout: 10000 });
    await locator.scrollIntoViewIfNeeded();
    await locator.fill(""); // Clear existing
    await locator.type(text, { delay: 100 }); // Type with human-like delay
  }, { retries: 2 });
}
