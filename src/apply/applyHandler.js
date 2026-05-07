// src/apply/applyHandler.js

export async function applyToJob(
  page,
  job
) {

  console.log(
    `Applying to: ${job.title}`
  );


  // open job page
  await page.goto(job.link, {
    waitUntil: "domcontentloaded",
  });


  // small wait
  await page.waitForTimeout(3000);


  // click apply button
  const applyButton =
    page.locator(
      'button:has-text("Apply")'
    );

  const count =
    await applyButton.count();

  if (count === 0) {

    console.log(
      "No apply button found"
    );

    return false;
  }


  await applyButton.first().click();


  // wait for modal/form
  await page.waitForTimeout(3000);


  // upload resume
  const fileInput =
    page.locator('input[type="file"]');

  const fileCount =
    await fileInput.count();

  if (fileCount > 0) {

    await fileInput.first().setInputFiles(
      job.resumePath
    );

    console.log(
      "Resume uploaded"
    );
  }


  // STOP before submit
  console.log(
    "Ready for manual review"
  );


  return true;
}