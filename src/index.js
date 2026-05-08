// src/index.js

import { launchBrowser } from "./utils/browser.js";
import { scrapeNaukriJobs } from "./scraper/naukri/naukriScraper.js";
import { scrapeLinkedInJobs } from "./scraper/linkedin/linkedinScraper.js";
import { scrapeIndeedJobs } from "./scraper/indeed/indeedScraper.js";
import { classifyJob } from "./core/classifier.js";
import { getResumePath } from "./core/resumeMapper.js";
import { filterJobs } from "./core/filters.js";
import { detectEasyApply } from "./apply/easyApplyDetector.js";
import { applyToJob } from "./apply/applyHandler.js";
import { logApplication } from "./sheets/appendApplication.js";
import { saveJson } from "./utils/file.js";
import { isDuplicate, loadAppliedJobs } from "./core/duplicateChecker.js";
import { safeNavigate } from "./utils/navigation.js";

async function runAutomation() {
  let context, page;
  
  try {
    const browserInfo = await launchBrowser();
    context = browserInfo.context;
    page = browserInfo.page;

    console.log("\n[Main] Step 1: Scraping Jobs (Naukri, LinkedIn, Indeed) in Kerala...");
    
    const naukriJobs = await scrapeNaukriJobs(page, "mern-stack-developer", "kerala");
    const linkedinJobs = await scrapeLinkedInJobs(page, "MERN Stack Developer", "Kerala");
    const indeedJobs = await scrapeIndeedJobs(page, "MERN Stack Developer", "Kerala");
    
    const jobs = [...naukriJobs, ...linkedinJobs, ...indeedJobs];
    await saveJson("./src/data/jobs.json", jobs);
    console.log(`[Main] Scraped ${jobs.length} jobs.`);

    console.log("\n[Main] Step 2: Classifying and Filtering...");
    for (const job of jobs) {
      job.roleType = classifyJob(job);
      job.resumePath = getResumePath(job.roleType);
    }

    const filteredJobs = filterJobs(jobs);
    await saveJson("./src/data/filteredJobs.json", filteredJobs);
    console.log(`[Main] ${filteredJobs.length} jobs remaining after filtering.`);

    console.log("\n[Main] Step 3: Detecting Easy Apply & Applying...");
    const appliedJobs = await loadAppliedJobs();
    
    for (const job of filteredJobs) {
      // 1. Check for duplicates
      if (await isDuplicate(job)) {
        console.log(`[Main] Skipping duplicate: ${job.company}`);
        continue;
      }

      // 2. Visit job page to detect Easy Apply
      await safeNavigate(page, job.link);
      const isEasyApply = await detectEasyApply(page);
      
      if (isEasyApply) {
        console.log(`[Main] Easy Apply detected for ${job.company}. Staging application...`);
        
        const result = await applyToJob(page, job);
        
        if (result.success) {
          job.applied = true;
          // Log to Google Sheets
          await logApplication(job);
          // Add to local persistence
          appliedJobs.push(job);
          await saveJson("./src/data/appliedJobs.json", appliedJobs);
        }
      } else {
        console.log(`[Main] Not an Easy Apply flow for ${job.company}. Skipping.`);
      }
    }

    console.log("\n[Main] Automation run completed.");

  } catch (error) {
    console.error("\n[Main] Fatal Error:", error);
  } finally {
    // Keep browser open for manual review as per requirements
    console.log("[Main] Browser kept open for manual review. Close it when done.");
  }
}

runAutomation();