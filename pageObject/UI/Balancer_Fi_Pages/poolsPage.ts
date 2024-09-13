import { Page, expect } from "@playwright/test";

export class poolsPage {

    protected readonly page: Page
    protected readonly liquidityPoolsTxt_Loc = '//h2[text()="Liquidity pools"]'
    protected readonly totalPools_Loc = '//h2[text()="Liquidity pools"]/parent::div//h2[2]'
    protected readonly filter_Loc = '//button[@type="button" and contains(text(),"Filters")]'
    protected readonly allNetwork_Loc = '//div[text()="All networks"]/ancestor::button[@type="button"]'
    protected readonly networkFilter_Loc = '//p[text()="Filters"]//ancestor::div[@data-popper-placement="bottom-end"]'
    protected readonly poolTypesListOnTable_Loc = '//p[@class="chakra-text css-qpgsy8"]'
    protected readonly poolTypesFilter_Loc = '//h3[text()="Pool types"]/parent::div'
    protected readonly closeBtn_Loc = '//button[@aria-label="Close"]'
    protected readonly TVLSlide_Loc = '//div[@role="slider"]'
    protected readonly slideInput_Loc = '//input[@type="hidden"]'
    constructor(page: Page) {
        this.page = page
    }

    async isUserOnPoolsPage(flag: boolean) {
        if (flag)
            expect(await this.page.locator(this.liquidityPoolsTxt_Loc)).toBeVisible()
        else
            expect(await this.page.locator(this.liquidityPoolsTxt_Loc)).toBeVisible()

    }

    async totalPools() {
        var totalNoOfPools: string = await this.page.locator(this.totalPools_Loc).textContent() ?? ""
        var totalNoOfPools_Int = parseInt(totalNoOfPools?.replace('(', "").replace(")", "").replace(",", ""))

        return totalNoOfPools_Int
    }

    async networkFilter(network: string[]) {
        await this.page.locator(this.filter_Loc).click()
        await this.page.locator(this.allNetwork_Loc).click()
        for (var net of network) {
            if (net == 'MAINNET')
                net = 'ethereum'
            await this.page.locator(`${this.networkFilter_Loc}//span[contains(translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz") , '${net.toLowerCase()}')]`).click()
        }
        await this.page.waitForTimeout(5000)
        await this.page.locator(this.TVLSlide_Loc).scrollIntoViewIfNeeded();
        await this.page.locator(this.closeBtn_Loc).click()
    }

    async validatePoolTypesFilter(poolType: any) {
        await this.page.locator(this.filter_Loc).click()
        // await this.page.locator(this.allNetwork_Loc).click()
        for (var type of poolType) {
            await this.page.locator(`${this.poolTypesFilter_Loc}//p[contains(text(),"${type}")]`).click()
            await this.page.waitForTimeout(1000)
        }
        await this.page.waitForTimeout(5000)
        await this.page.locator(this.closeBtn_Loc).click()
        const poolTypes = await this.page.locator(this.poolTypesListOnTable_Loc).all()
        const poolTypesList = await Promise.all(poolTypes.map((pools) => pools.textContent()))
        const isValid = poolTypesList.every(value => poolType.includes(value));
        expect(isValid, "PoolType Validation").toBeTruthy()
    }

    async setTVLSlide(targetTVL: string) {
        await this.page.waitForSelector(this.TVLSlide_Loc);
        await this.page.locator(this.TVLSlide_Loc).scrollIntoViewIfNeeded();
        const s = await this.page.$(this.TVLSlide_Loc)
        // await this.page.locator(this.slideInput_Loc).scrollIntoViewIfNeeded()
        let ele = this.page.locator(this.slideInput_Loc)
        let text = await ele.inputValue();
        let targetAmount = targetTVL;
        let isCompleted = false;
        if (s) {
            while (!isCompleted) {
                let srcBound = await s.boundingBox();
                if (srcBound) {
                    await this.page.mouse.move(srcBound.x + srcBound.width / 2,
                        srcBound.y + srcBound.height / 2)
                    await this.page.mouse.down();
                    await this.page.mouse.move(srcBound.x + 15, srcBound.y + srcBound.height / 2);
                    await this.page.mouse.up();
                    await this.page.waitForTimeout(1000)
                    let text = await ele.inputValue();
                    // console.log(text);
                    if (text == targetAmount) {
                        isCompleted = true;
                    }
                }
            }

        }
        await this.page.locator(this.closeBtn_Loc).click()
        await this.page.waitForTimeout(5000)
    }
}    