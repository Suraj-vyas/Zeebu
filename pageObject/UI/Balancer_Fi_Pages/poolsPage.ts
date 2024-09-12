import { Page, expect } from "@playwright/test";

export class poolsPage {

    protected readonly page: Page
    protected readonly liquidityPoolsTxt_Loc = '//h2[text()="Liquidity pools"]'
    protected readonly totalPools_Loc = '//h2[text()="Liquidity pools"]/parent::div//h2[2]'
    protected readonly filter_Loc = '//button[@type="button" and contains(text(),"Filters")]'
    protected readonly allNetwork_Loc = '//div[text()="All networks"]/ancestor::button[@type="button"]'
    protected readonly networkFilter_Loc = '//p[text()="Filters"]//ancestor::div[@data-popper-placement="bottom-end"]'
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
        var totalNoOfPools: string = await this.page.locator(this.totalPools_Loc).textContent({ timeout: 1000 }) ?? ""
        var totalNoOfPools_Int = parseInt(totalNoOfPools?.replace('(', "").replace(")", "").replace(",", ""))

        return totalNoOfPools_Int
    }

    async networkFilter(network: string[]) {
        await this.page.locator(this.filter_Loc).click({ timeout: 1000 })
        await this.page.locator(this.allNetwork_Loc).click({ timeout: 1000 })
        for (var net of network) {
            if (net == 'MAINNET')
                net = 'ethereum'
            await this.page.locator(`${this.networkFilter_Loc}//span[translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz") = '${net.toLowerCase()}']`).click({ timeout: 1000 })
        }
        await this.page.waitForTimeout(5000)
    }
}     