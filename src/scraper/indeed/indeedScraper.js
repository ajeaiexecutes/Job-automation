// src/scraper/indeed/indeedScraper.js

import { selectors } from "./indeedSelectors.js";
import { createJob } from "../../core/jobSchema.js";
import { safeNavigate } from "../../utils/navigation.js";

/**
 * Scrapes job listings from Indeed.
 * @param {import('playwright').Page} page 
 * @param {string} role - Job role.
 */
export async function scrapeIndeedJobs(page, role = "MERN Stack Developer", location = "Kerala") {
  const url = `https://www.indeed.com/jobs?q=${encodeURIComponent(role)}&l=${encodeURIComponent(location)}&from=searchOnHP`;
  
  console.log(`\n[Indeed] Scraping: ${role} in ${location}`);
  await safeNavigate(page, url);

  try {
    await page.waitForSelector(selectors.jobCards, { timeout: 10000 });
  } catch (e) {
    console.error("[Indeed] No job cards found.");
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
        platform: "Indeed"
      };
    });
  }, selectors);

  return jobs.map(j => createJob(j));
}
