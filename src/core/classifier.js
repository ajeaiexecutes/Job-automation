// src/core/classifier.js

export function classifyJob(job) {
  const text = `
    ${job.title}
    ${job.skills?.join(" ") || ""}
  `.toLowerCase();

  // 1. Explicit Fullstack keywords
  const isFullstack = 
    text.includes("mern") || 
    text.includes("fullstack") || 
    text.includes("full stack") ||
    text.includes("full stack developer") ||
    text.includes("mern stack developer") ||
    text.includes("mern stack");

  if (isFullstack) {
    return "fullstack";
  }

  const hasReact =
    text.includes("react") ||
    text.includes("next") ||
    text.includes("frontend") ||
    text.includes("front end");

  const hasBackend =
    text.includes("node") ||
    text.includes("express") ||
    text.includes("api") ||
    text.includes("backend") ||
    text.includes("back end") ||
    text.includes("mongodb");

  if (hasReact && hasBackend) {
    return "fullstack";
  }

  if (hasReact) {
    return "frontend";
  }

  if (hasBackend) {
    return "backend";
  }

  return "unknown";
}