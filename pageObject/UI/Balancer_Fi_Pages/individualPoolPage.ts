import { Page, expect } from "@playwright/test";
import { takeScreenshot } from "../../../libs/screenShot";

export class individualPoolPage {

    protected readonly page: Page

    //Locators of the /Node page of Moralis Admin
    private readonly firstPool_loc = "//p[text()='Pool name']/parent::div/parent::div/parent::div//div[@class='css-1ki54i'][1]"
    private readonly totalLiquidityValue_loc = '(//h2[normalize-space()="Total liquidity"]/parent::div/parent::div//h2)[2]'
    private readonly poolStats_loc = "//div[normalize-space()='Pool stats']"
    private readonly poolActivity_loc = "//h2[normalize-space()='Pool activity']"
    private readonly poolComposition_loc = "//h2[normalize-space()='Pool composition']"
    private readonly poolAttributes_loc = "//h2[normalize-space()='Pool attributes']"
    private readonly poolContracts_loc = "//h2[normalize-space()='Pool contracts']"

    constructor(page: Page) {
        this.page = page
    }


    async isUserOnPoolPage(flag: boolean) { 
        await this.page.locator(this.firstPool_loc).click()
        if (flag) {
            await expect(this.page.locator(this.poolStats_loc).first()).toBeVisible()
            await expect(this.page.locator(this.poolActivity_loc).first()).toBeVisible()
            await expect(this.page.locator(this.poolComposition_loc).first()).toBeVisible()
            await expect(this.page.locator(this.poolAttributes_loc).first()).toBeVisible()
            await expect(this.page.locator(this.poolContracts_loc).first()).toBeVisible()
        }
        else {
            await expect(this.page.locator(this.poolStats_loc).first()).not.toBeVisible()
            await expect(this.page.locator(this.poolActivity_loc).first()).not.toBeVisible()
            await expect(this.page.locator(this.poolComposition_loc).first()).not.toBeVisible()
            await expect(this.page.locator(this.poolAttributes_loc).first()).not.toBeVisible()
            await expect(this.page.locator(this.poolContracts_loc).first()).not.toBeVisible()
        }
        await takeScreenshot(this.page, "Pool Page")
    }
}
