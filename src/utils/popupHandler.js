// src/utils/popupHandler.js

export async function closePopups(
  page
) {

  const popupSelectors = [

    // generic close buttons
    'button[aria-label="Close"]',

    '.close',

    '.dismiss',

    '.cross',

    '.modal-close',

    // cookie banners
    '#onetrust-accept-btn-handler',

    // naukri examples
    '.crossIcon',

    // linkedin examples
    '.artdeco-modal__dismiss',
    'button[aria-label="Dismiss"]',
    '.msg-overlay-bubble-header__controls',

  ];


  for (const selector of popupSelectors) {

    try {

      const popup =
        page.locator(selector);

      const count =
        await popup.count();

      if (count > 0) {

        await popup.first().click();

        console.log(
          `Closed popup: ${selector}`
        );
      }

    } catch {

      // ignore failures
    }
  }
}