// src/sheets/googleSheets.js

import { google } from "googleapis";

import dotenv from "dotenv";

dotenv.config();


// authenticate service account
const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,

  null,

  process.env.GOOGLE_PRIVATE_KEY.replace(
    /\\n/g,
    "\n"
  ),

  [
    "https://www.googleapis.com/auth/spreadsheets",
  ]
);


// create sheets client
const sheets = google.sheets({
  version: "v4",
  auth,
});


// append row function
export async function appendToSheet(
  values
) {

  try {

    await sheets.spreadsheets.values.append({

      spreadsheetId:
        process.env.GOOGLE_SHEET_ID,

      range: "Sheet1!A:G",

      valueInputOption:
        "USER_ENTERED",

      requestBody: {
        values: [values],
      },
    });


    console.log(
      "Row added to Google Sheet"
    );

  } catch (error) {

    console.error(
      "Google Sheets Error:",
      error.message
    );
  }
}

// src/sheets/googleSheets.js

