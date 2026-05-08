// src/scraper/indeed/indeedSelectors.js

export const selectors = {
  jobCards: ".job_seen_beacon",
  title: "h2.jobTitle",
  company: "[data-testid='company-name']",
  location: "[data-testid='text-location']",
  link: "h2.jobTitle a",
  
  // Apply specific
  indeedApply: ".indeedApply",
  applyButton: "#indeedApplyButton",
};
