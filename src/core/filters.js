// src/core/filters.js

export function filterJobs(jobs) {

  return jobs.filter((job) => {

    const text = `
      ${job.title}
      ${job.skills?.join(" ")}
    `.toLowerCase();


    // reject unknown roles
    if (job.roleType === "unknown") {
      return false;
    }


    // reject high experience
    if (
      job.experience.includes("3") ||
      job.experience.includes("4") ||
      job.experience.includes("5")
    ) {
      return false;
    }


    // reject unrelated stacks
    const blockedKeywords = [
      "java",
      "spring",
      "django",
      "laravel",
      ".net",
      "php",
      "android",
      "ios",
    ];

    const hasBlockedKeyword =
      blockedKeywords.some((keyword) =>
        text.includes(keyword)
      );

    if (hasBlockedKeyword) {
      return false;
    }


    // keep job
    return true;
  });
}