import { Page } from "@playwright/test";
import path from "path";
import { Url } from "url";

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