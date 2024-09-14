import { Page, expect, test } from "@playwright/test";
import { takeScreenshot } from "../../../libs/screenShot";

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
    protected readonly poolsNetwork_Loc = "//div[@class='css-1n5opag']//img"
    protected readonly pools_Loc = "//a[text()='Pools']"
    constructor(page: Page) {
        this.page = page
    }

    async isUserOnPoolsPage(flag: boolean) {
        await test.step("Validating the User is on Pools Page or not", async () => {
            if (flag)
                await expect(this.page.locator(this.liquidityPoolsTxt_Loc)).toBeVisible()
            else
                await expect(this.page.locator(this.liquidityPoolsTxt_Loc)).toBeVisible()
        })
        await takeScreenshot(this.page, "Pools Page")
    }

    async totalPools() {
        var totalNoOfPools: string = await this.page.locator(this.totalPools_Loc).textContent() ?? ""
        var totalNoOfPools_Int = parseInt(totalNoOfPools?.replace('(', "").replace(")", "").replace(",", ""))
        return totalNoOfPools_Int
    }

    async networkFilter(network: string[]) {
        await test.step("Applying the Network Filter", async () => {
            await this.page.locator(this.filter_Loc).click()
            await this.page.locator(this.allNetwork_Loc).click()
            for (var net of network) {
                if (net == 'MAINNET')
                    net = 'ethereum'
                await this.page.locator(`${this.networkFilter_Loc}//span[contains(translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz") , '${net.toLowerCase()}')]`).click()
            }
            await this.page.waitForTimeout(5000)
            await takeScreenshot(this.page, "Network Filter")
            await this.page.locator(this.TVLSlide_Loc).scrollIntoViewIfNeeded();
            await this.page.locator(this.closeBtn_Loc).click()
        })

    }

    async validatePoolTypesFilter(poolType: any) {
        await test.step("Validating the Pool Type filter", async () => {
            await this.page.locator(this.filter_Loc).click()
            for (var type of poolType) {
                await this.page.locator(`${this.poolTypesFilter_Loc}//p[contains(text(),"${type}")]`).click()
                await this.page.waitForTimeout(1000)
            }
            await this.page.waitForTimeout(5000)
            await this.page.locator(this.closeBtn_Loc).click()
            const poolTypes = await this.page.locator(this.poolTypesListOnTable_Loc).all()
            const poolTypesList = await Promise.all(poolTypes.map((pools) => pools.textContent()))
            const isValid = poolTypesList.every(value => poolType.includes(value));
            await takeScreenshot(this.page, "Pools Types")
            expect(isValid, "PoolType Validation").toBeTruthy()
        })

    }

    async poolTypesFilter(poolType: any) {
        await test.step("Applying the Pool Type filter", async () => {
            await this.page.evaluate(() => window.scrollTo(0, 0));
            await this.page.locator(this.filter_Loc).click()
            for (var type of poolType) {
                await this.page.locator(`${this.poolTypesFilter_Loc}//p[contains(text(),"${type}")]`).click()
                await this.page.waitForTimeout(1000)
            }
            await this.page.waitForTimeout(5000)
            await takeScreenshot(this.page, "Pool Type Filter")
            await this.page.locator(this.closeBtn_Loc).click()
        })

    }

    async setTVLSlide(targetTVL: string) {
        await test.step("Moving the TVL Slider to target Value", async () => {
            await this.page.waitForSelector(this.TVLSlide_Loc);
            await this.page.locator(this.TVLSlide_Loc).scrollIntoViewIfNeeded();
            const s = await this.page.$(this.TVLSlide_Loc)
            // await this.page.locator(this.slideInput_Loc).scrollIntoViewIfNee ded()
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
            await takeScreenshot(this.page, "Slider of TVL")
            await this.page.locator(this.closeBtn_Loc).click()
            await this.page.waitForTimeout(5000)
        })
    }

    async validateNetworkFilter(network: string[]) {
        await test.step("Validating the Network Filter", async () => {
            const poolNetworkss = await this.page.locator(this.poolsNetwork_Loc).all()
            const poolNetworkList = await Promise.all(poolNetworkss.map((pools) => pools.getAttribute('alt')))
            network = network.map(value => value === "MAINNET" ? "Ethereum" : value);
            const isValid = poolNetworkList.every(value => network.map(item => item.toLowerCase()).includes((value ?? "").toLowerCase())
            );
            await takeScreenshot(this.page, "Pools Network")
            expect(isValid, "Pools Network Validation").toBeTruthy()
        })
    }
}    