import { Page, expect, test } from "@playwright/test";
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
    private readonly poolAddress_loc = "(//p[text()='Pool address']/parent::div/parent::div//p)[2]//ancestor::a"
    private readonly poolName_loc = "(//p[text()='Name']/parent::div/parent::div//p)[2]"
    private readonly poolTypesListOnTable_Loc = '//p[@class="chakra-text css-qpgsy8"]'
    private readonly poolNotFound_Loc = "//p[text()='No pools found']"
    private readonly serachInput_Loc = '//input[@id="search"]'

    constructor(page: Page) {
        this.page = page
    }

    async gotoFirstPoolAndReturnID() {
        return await test.step('Clicking the First Pool and Returing the Pool ID', async () => {
            const firstElem = this.page.locator(this.firstPool_loc)
            const ID = await firstElem.getAttribute('href')
            await takeScreenshot(this.page, "First Pool")
            await firstElem.click()
            return ID?.split('/').pop()
        })
    }

    async gotoFirstPoolAndReturnPoolType() {
        return await test.step('Clicking the First Pool and Returing the Pool Type', async () => {
            const poolType = await this.page.locator(this.poolTypesListOnTable_Loc).first().textContent()
            await takeScreenshot(this.page, "First Pool")
            await this.page.locator(this.firstPool_loc).click()
            return poolType
        })
    }

    async isUserOnPoolPage(flag: boolean) {
        await test.step('Validating the User is on Pool Page', async () => {
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
        })

    }

    async validatePoolCreationDate(timestamp: number) {
        await test.step('Validating the Pool Creation Date', async () => {
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
            await takeScreenshot(this.page, "Pool Creation Date")
        })

    }

    async validatePoolType(type: string) {
        await test.step('Validating the Pool Type', async () => {
            await this.page.waitForSelector(this.poolType_loc, { state: 'attached' })
            await this.page.locator(this.poolType_loc).scrollIntoViewIfNeeded()
            const UIPoolType = await this.page.locator(this.poolType_loc).textContent()
            console.log(UIPoolType);
            expect(UIPoolType?.toLowerCase()).toEqual(type.toLowerCase())
            await takeScreenshot(this.page, "Pool Type")
        })
    }

    async validatePoolWeight(Weights: any) {
        await test.step('Validating the Pool Weight pool Token wise', async () => {
            for (var i = 0; i < Weights.length; i++) {
                await this.page.locator(`${this.poolWeight_loc}[${i + 1}]`).scrollIntoViewIfNeeded()
                const UIPoolWeightinPercentage = await this.page.locator(`${this.poolWeight_loc}[${i + 1}]`).textContent() ?? ""
                const UIPoolWeightinDecimal = (parseFloat(UIPoolWeightinPercentage) / 100).toString();
                console.log(UIPoolWeightinDecimal);
                expect(UIPoolWeightinDecimal).toEqual(Weights[i].weight)
                await takeScreenshot(this.page, "Pool Weight")
            }
        })

    }

    async validatePoolAddress(poolAddress: string) {
        await test.step('Validating the Pool Address', async () => {
            await this.page.locator(this.poolAddress_loc).scrollIntoViewIfNeeded()
            const actualPoolAddress = (await this.page.locator(this.poolAddress_loc).getAttribute('href'))?.split('/').pop()
            expect(actualPoolAddress).toEqual(poolAddress)
            await takeScreenshot(this.page, "Pool Address")
        })
    }

    async validatePoolName(poolName: string) {
        await test.step('Validating the Pool Name', async () => {
            const elm = this.page.locator(this.poolName_loc)
            await elm.scrollIntoViewIfNeeded()
            const actualPoolName = await elm.textContent()
            expect(actualPoolName).toEqual(poolName)
            await takeScreenshot(this.page, "Pool Name")
        })
    }

    async validateNoPoolFound() {
        await test.step('Validating the Pool Not Found Message', async () => {
            await this.page.locator(this.serachInput_Loc).fill("abcdefghijklm")
            await expect(this.page.locator(this.poolNotFound_Loc)).toBeVisible()
            await takeScreenshot(this.page, "No Pools Found")
        })

    }
}
