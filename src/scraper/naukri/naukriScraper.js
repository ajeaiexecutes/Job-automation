// src/scraper/naukri/naukriScraper.js

import { selectors } from "./naukriSelectors.js";

import { createJob } from "../../core/jobSchema.js";

export async function scrapeNaukriJobs(page, role = "mern-stack-developer") {
  const url = `https://www.naukri.com/${role}-jobs`;
  console.log(`\n--- Scraping Naukri: ${role} ---`);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });




  // wait for jobs to appear
  await page.waitForSelector(selectors.jobCards);

  // scrape jobs
  const jobs = await page.$$eval(
    selectors.jobCards,
    (cards, selectors) => {

      return cards.map((card) => {

        const getText = (selector) =>
          card.querySelector(selector)
            ?.innerText
            ?.trim() || "";

        const getHref = (selector) =>
          card.querySelector(selector)
            ?.href || "";

        return {
          title: getText(selectors.title),

          company: getText(selectors.company),

          experience: getText(selectors.experience),

          location: getText(selectors.location),

          link: getHref(selectors.link),
        };
      });
    },
    selectors
  );

  // convert to job schema
  return jobs.map((job) =>
    createJob({
      ...job,
      platform: "Naukri",
    })
  );
}

