// src/sheets/appendApplication.js

import { appendToSheet }
from "./googleSheets.js";

export async function logApplication(
  job
) {

  const row = [

    new Date().toLocaleString(),

    job.platform,

    job.company,

    job.title,

    job.roleType,

    job.resumePath,

    job.link,
  ];


  await appendToSheet(row);
}