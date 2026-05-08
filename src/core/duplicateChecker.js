// src/core/duplicateChecker.js

import fs from "fs/promises";


export async function loadAppliedJobs() {

  try {

    const data =
      await fs.readFile(
        "./src/data/appliedJobs.json",
        "utf-8"
      );

    return JSON.parse(data);

  } catch {

    return [];
  }
}


export async function isDuplicate(
  job
) {

  const appliedJobs =
    await loadAppliedJobs();


  return appliedJobs.some(
    (appliedJob) =>
      appliedJob.link === job.link
  );
}