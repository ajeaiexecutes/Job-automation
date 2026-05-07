// src/utils/browser.js

import { chromium } from "playwright";
import path from "path";

export async function launchBrowser() {
  const userDataDir = path.join(process.cwd(), "storage/user_data");

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    executablePath: "/usr/bin/google-chrome",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    ignoreDefaultArgs: ["--enable-automation"],
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  // Persistent context usually opens one page automatically
  const page = context.pages().length > 0 
    ? context.pages()[0] 
    : await context.newPage();

  return {
    browser: context,
    context,
    page,
  };
}