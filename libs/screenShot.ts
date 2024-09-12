// abc.ts
import test, { Page } from "@playwright/test";

// Utility function to capture a screenshot
export async function takeScreenshot(page: Page, actionName: string) {
    const SS = await page.screenshot({ path: `screenshots/${actionName.replace(" ", "")}.png` });
    await test.info().attach('screenshot', { body: SS, contentType: 'image/png' })
}
