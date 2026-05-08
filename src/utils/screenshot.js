// src/utils/screenshot.js

import path from "path";
import fs from "fs/promises";

/**
 * Takes a screenshot on failure and saves it to a debug folder.
 * @param {import('playwright').Page} page 
 * @param {string} label - A name for the screenshot.
 */
export async function screenshotOnFailure(page, label = "error") {
  try {
    const debugDir = path.join(process.cwd(), "storage/debug");
    await fs.mkdir(debugDir, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${label}_${timestamp}.png`;
    const filePath = path.join(debugDir, fileName);
    
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Screenshot saved to: ${filePath}`);
  } catch (error) {
    console.error("Failed to take screenshot:", error.message);
  }
}
