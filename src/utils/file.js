// src/utils/file.js

import fs from "fs/promises";


export async function saveJson(
  filePath,
  data
) {

  try {

    await fs.writeFile(
      filePath,

      JSON.stringify(
        data,
        null,
        2
      )
    );

    console.log(
      `Saved: ${filePath}`
    );

  } catch (error) {

    console.error(
      "Save JSON Error:",
      error.message
    );
  }
}