// src/core/jobSchema.js

export function createJob({
  title = "",
  company = "",
  location = "",
  experience = "",
  skills = [],
  link = "",
  platform = "",
}) {
  return {
    title,
    company,
    location,
    experience,
    skills,
    link,
    platform,

    roleType: null,
    resumePath: null,

    easyApply: false,
    applied: false,

    createdAt: new Date().toISOString(),
  };
}