// src/apply/applyHandler.js

import { safeNavigate } from "../utils/navigation.js";
import { safeClick } from "../utils/interaction.js";
import { screenshotOnFailure } from "../utils/screenshot.js";
import { delay } from "../utils/delay.js";

async function handleLinkedInSteps(page, job) {
  let steps = 0;
  while (steps < 5) {
    // 1. Try to find resume upload
    const fileInput = page.locator('input[type="file"]').first();
    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles(job.resumePath);
      console.log(`[LinkedIn] Resume uploaded.`);
      await delay(1000, 2000);
    }

    // 2. Look for 'Next', 'Review', or 'Submit'
    const nextButton = page.locator('button:has-text("Next"), button:has-text("Review"), button:has-text("Submit application")').first();
    
    if (await nextButton.isVisible()) {
      const text = await nextButton.innerText();
      if (text.includes("Submit application")) {
        console.log("[LinkedIn] Reached final submit step. Stopping for manual review.");
        return true;
      }
      await safeClick(nextButton);
      console.log(`[LinkedIn] Clicked ${text}`);
      await delay(1500, 2500);
      steps++;
    } else {
      break;
    }
  }
  return true;
}

async function handleIndeedSteps(page, job) {
  let steps = 0;
  while (steps < 5) {
    const fileInput = page.locator('input[type="file"]').first();
    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles(job.resumePath);
      console.log(`[Indeed] Resume uploaded.`);
      await delay(1000, 2000);
    }

    const continueButton = page.locator('button:has-text("Continue"), button:has-text("Submit your application")').first();
    
    if (await continueButton.isVisible()) {
      const text = await continueButton.innerText();
      if (text.includes("Submit your application")) {
        console.log("[Indeed] Reached final submit step. Stopping for manual review.");
        return true;
      }
      await safeClick(continueButton);
      console.log(`[Indeed] Clicked ${text}`);
      await delay(1500, 2500);
      steps++;
    } else {
      break;
    }
  }
  return true;
}

export async function applyToJob(page, job) {
  console.log(`\n[Apply] Starting process for: ${job.title} @ ${job.company}`);

  try {
    await safeNavigate(page, job.link);

    // Platform-specific logic
    if (job.platform === "LinkedIn") {
      const applyBtn = page.locator("button.jobs-apply-button").first();
      if (await applyBtn.isVisible()) {
        await safeClick(applyBtn);
        await handleLinkedInSteps(page, job);
        return { success: true };
      }
    }

    if (job.platform === "Indeed") {
      const applyBtn = page.locator("#indeedApplyButton, [data-testid='indeed-apply-button']").first();
      if (await applyBtn.isVisible()) {
        await safeClick(applyBtn);
        await handleIndeedSteps(page, job);
        return { success: true };
      }
    }

    // Default (Naukri/Generic)
    const applyButton = page.locator('button:has-text("Apply"), .apply-button').first();
    
    if (!(await applyButton.isVisible())) {
      console.log(`[Apply] No visible apply button for ${job.company}. Skipping.`);
      return { success: false, reason: "Apply button not found" };
    }

    await safeClick(applyButton);
    
    const fileInput = page.locator('input[type="file"]').first();
    try {
      await fileInput.waitFor({ state: "visible", timeout: 5000 });
      await fileInput.setInputFiles(job.resumePath);
      console.log(`[Apply] Resume uploaded: ${job.resumePath}`);
      await delay(1000, 2000);
    } catch (e) {
      console.log("[Apply] No immediate file input found, might be already uploaded.");
    }

    console.log(`[Apply] ${job.company} is ready for manual review.`);
    return { success: true };

  } catch (error) {
    console.error(`[Apply] Failed for ${job.company}:`, error.message);
    await screenshotOnFailure(page, `apply_fail_${job.company.replace(/\s+/g, "_")}`);
    return { success: false, error: error.message };
  }
}