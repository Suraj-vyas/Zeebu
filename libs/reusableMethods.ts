import { Page } from "@playwright/test";

export class resuableMethods {

    protected readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async NavigateToUrl(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' })
        await this.page.waitForTimeout(5000)
    }
} 