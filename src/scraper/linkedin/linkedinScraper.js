// src/scraper/linkedin/linkedinScraper.js

import { selectors } from "./linkedinSelectors.js";
import { createJob } from "../../core/jobSchema.js";
import { safeNavigate } from "../../utils/navigation.js";

/**
 * Scrapes job listings from LinkedIn based on a search term.
 * @param {import('playwright').Page} page 
 * @param {string} role - The job role to search for.
 */
export async function scrapeLinkedInJobs(page, role = "MERN Stack Developer", location = "Kerala") {
  const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}&f_AL=true`; // f_AL=true for Easy Apply
  
  console.log(`\n[LinkedIn] Scraping: ${role} in ${location}`);
  await safeNavigate(page, url);

  try {
    await page.waitForSelector(selectors.jobCards, { timeout: 10000 });
  } catch (e) {
    console.error("[LinkedIn] No job cards found. Ensure you are logged in.");
    return [];
  }

  const jobs = await page.$$eval(selectors.jobCards, (cards, sel) => {
    return cards.map(card => {
      const getTxt = (s) => card.querySelector(s)?.innerText?.trim() || "";
      const getHref = (s) => card.querySelector(s)?.href || "";
      
      return {
        title: getTxt(sel.title),
        company: getTxt(sel.company),
        location: getTxt(sel.location),
        link: getHref(sel.link),
        platform: "LinkedIn",
        easyApply: true // Since we use f_AL=true
      };
    });
  }, selectors);

  return jobs.map(j => createJob(j));
}
