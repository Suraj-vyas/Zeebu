import { Page, expect } from "@playwright/test";
import { takeScreenshot } from "../../../libs/screenShot";
import { assert } from "../../../libs/assert";

export class individualPoolPage {

    protected readonly page: Page

    //Locators of the /Node page of Moralis Admin
    private readonly firstPool_loc = "//p[text()='Pool name']/parent::div/parent::div/parent::div//div[@class='css-1ki54i'][1]//a"
    private readonly totalLiquidityValue_loc = '(//h2[normalize-space()="Total liquidity"]/parent::div/parent::div//h2)[2]'
    private readonly poolStats_loc = "//div[normalize-space()='Pool stats']"
    private readonly poolActivity_loc = "//h2[normalize-space()='Pool activity']"
    private readonly poolComposition_loc = "//h2[normalize-space()='Pool composition']"
    private readonly poolAttributes_loc = "//h2[normalize-space()='Pool attributes']"
    private readonly poolContracts_loc = "//h2[normalize-space()='Pool contracts']"
    private readonly poolCreationDate_loc = "(//p[text()='Creation date']/parent::div/parent::div//p)[2]"
    private readonly poolType_loc = "(//p[text()='Type']/parent::div/parent::div//p)[2]"
    private readonly poolWeight_loc = "(//div[@class='chakra-stack css-1dbqolu']//p)"
    // private readonly poolContracts_loc = "//h2[normalize-space()='Pool contracts']"
    // private readonly poolContracts_loc = "//h2[normalize-space()='Pool contracts']"
    // private readonly poolContracts_loc = "//h2[normalize-space()='Pool contracts']"

    constructor(page: Page) {
        this.page = page
    }

    async gotoFirstPoolAndReturnID() {

        const firstElem = this.page.locator(this.firstPool_loc)
        const ID = await firstElem.getAttribute('href')
        await firstElem.click()
        return ID?.split('/').pop()
    }

    async isUserOnPoolPage(flag: boolean) {
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

    async validatePoolCreationDate(timestamp: number) {
        const date = new Date(timestamp * 1000);

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const year = date.getFullYear();
        const monthIndex = date.getMonth();
        const day = date.getDate();
        const monthName = months[monthIndex];

        const APIcreatedDate = (`${day} ${monthName} ${year}`);
        console.log(APIcreatedDate);

        await this.page.locator(this.poolCreationDate_loc).scrollIntoViewIfNeeded()
        const UICreatedDate = await this.page.locator(this.poolCreationDate_loc).textContent()
        console.log(UICreatedDate);

        expect(APIcreatedDate).toEqual(UICreatedDate)
    }

    async validatePoolType(type: string) {
        await this.page.locator(this.poolType_loc).scrollIntoViewIfNeeded()
        const UIPoolType = await this.page.locator(this.poolType_loc).textContent()
        console.log(UIPoolType);
        expect(UIPoolType?.toLowerCase()).toEqual(type.toLowerCase())
    }

    async validatePoolWeight(Weights: any) {
        for (var i = 0; i < Weights.length; i++) {
            await this.page.locator(`${this.poolWeight_loc}[${i+1}]`).scrollIntoViewIfNeeded()
            const UIPoolWeightinPercentage = await this.page.locator(`${this.poolWeight_loc}[${i+1}]`).textContent() ?? ""
            const UIPoolWeightinDecimal = (parseFloat(UIPoolWeightinPercentage) / 100).toString();
            console.log(UIPoolWeightinDecimal);
            expect(UIPoolWeightinDecimal).toEqual(Weights[i].weight)
        }
    }
}
  