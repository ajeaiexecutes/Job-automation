// src/scraper/linkedin/linkedinSelectors.js

export const selectors = {
  jobCards: ".job-card-container",
  title: ".job-card-list__title",
  company: ".job-card-container__primary-description",
  location: ".job-card-container__metadata-item",
  link: "a.job-card-list__title",
  
  // Apply specific
  easyApplyBadge: ".job-card-container__footer-item:has-text('Easy Apply')",
  applyButton: "button.jobs-apply-button",
  
  // Modal specific
  modal: ".jobs-details-premium-insight",
  nextButton: "button:has-text('Next')",
  reviewButton: "button:has-text('Review')",
  submitButton: "button:has-text('Submit application')",
};
