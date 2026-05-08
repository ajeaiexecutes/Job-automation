// src/utils/retry.js

import { delay } from "./delay.js";

/**
 * Retries an async function with exponential backoff or fixed delay.
 * @param {Function} fn - The async function to retry.
 * @param {Object} options - Retry options.
 * @param {number} options.retries - Number of retries.
 * @param {number} options.minDelay - Minimum delay between retries in ms.
 * @param {Function} options.onRetry - Callback function called on each retry.
 */
export async function withRetry(fn, { retries = 3, minDelay = 2000, onRetry = null } = {}) {
  let lastError;
  
  for (let i = 0; i < retries + 1; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < retries) {
        console.warn(`Attempt ${i + 1} failed. Retrying in ${minDelay}ms...`);
        if (onRetry) onRetry(error, i + 1);
        await delay(minDelay, minDelay * 1.5);
      }
    }
  }
  
  throw lastError;
}
