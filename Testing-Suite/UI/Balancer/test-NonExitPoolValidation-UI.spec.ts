import { test, Page, expect, } from "@playwright/test"
import { app } from "../../../pageObject/UI/App"
import * as testData from "../../../data/API/balancerGraphQL/API_TestData.json"
import { api } from "../../../pageObject/API/API"

let App: app
var API: api

test.beforeEach(async ({ page, request }) => {
    // test.slow()
    App = new app(page)
    await App.webPage.NavigateToUrl('https://balancer.fi/pools')
    API = new api(request)
})

test.afterEach(async ({ page }) => {
    // await page.close()
})

test.describe.configure({ mode: 'parallel' });

test.describe('Positive Scenario', async () => {

    // test.use({ storageState: "libs/auth.json" })

    test('TC1_Validate one Balancer Pool for All Network', { tag: '@Positive' }, async () => {
        //Validating the UI
        //Validating the User is on Pools Page or not
        await App.poolsPage.isUserOnPoolsPage(true)
        //Clicking the First Pool and capturing the Pool Type
        const PoolType = await App.poolPage.gotoFirstPoolAndReturnPoolType() ?? ""
        //Validating the Pool Type
        await App.poolPage.validatePoolType(PoolType)
    })

    test('TC2_Validate one Balancer Pool for Ethereum', { tag: '@Positive' }, async () => {
        //Validating the UI
        //Validating the User is on Pools Page or not
        await App.poolsPage.isUserOnPoolsPage(true)
        //Applying the Network Filter
        await App.poolsPage.networkFilter(testData.Ethereum)
        //Clicking the First Pool and capturing the Pool Type
        const PoolType = await App.poolPage.gotoFirstPoolAndReturnPoolType() ?? ""
        //Validating the Pool Type
        await App.poolPage.validatePoolType(PoolType)
    })

    test('TC3_Validate one Balancer Pool for Arbitrum', { tag: '@Positive' }, async () => {
        //Validating the UI
        //Validating the User is on Pools Page or not
        await App.poolsPage.isUserOnPoolsPage(true)
        //Applying the Network Filter
        await App.poolsPage.networkFilter(testData.Arbitrum)
        //Clicking the First Pool and capturing the Pool Type
        const PoolType = await App.poolPage.gotoFirstPoolAndReturnPoolType() ?? ""
        //Validating the Pool Type
        await App.poolPage.validatePoolType(PoolType)
    })

    test('TC4_Validate one Balancer Pool for Avalanche', { tag: '@Positive' }, async () => {
        //Validating the UI
        //Validating the User is on Pools Page or not
        await App.poolsPage.isUserOnPoolsPage(true)
        //Applying the Network Filter
        await App.poolsPage.networkFilter(testData.Avalanche)
        //Clicking the First Pool and capturing the Pool Type
        const PoolType = await App.poolPage.gotoFirstPoolAndReturnPoolType() ?? ""
        //Validating the Pool Type
        await App.poolPage.validatePoolType(PoolType)
    })

    test('TC5_Validate one Balancer Pool for Base', { tag: '@Positive' }, async () => {
        //Validating the UI
        //Validating the User is on Pools Page or not
        await App.poolsPage.isUserOnPoolsPage(true)
        //Applying the Network Filter
        await App.poolsPage.networkFilter(testData.Base)
        //Clicking the First Pool and capturing the Pool Type
        const PoolType = await App.poolPage.gotoFirstPoolAndReturnPoolType() ?? ""
        //Validating the Pool Type
        await App.poolPage.validatePoolType(PoolType)
    })

})

test.describe('Negative Scenario', async () => {


    test('TC6_Validate Non-Exit Pool for Ethereum', { tag: '@Negative' }, async () => {
        //Validating the User is on Pools Page or not
        await App.poolsPage.isUserOnPoolsPage(true)
        //Applying the Network Filter
        await App.poolsPage.networkFilter(testData.Ethereum)
        //Validating No Pools found Message
        await App.poolPage.validateNoPoolFound()
    })

    test('TC6_Validate Non-Exit Pool for Arbitrum', { tag: '@Negative' }, async () => {
        //Validating the User is on Pools Page or not
        await App.poolsPage.isUserOnPoolsPage(true)
        //Applying the Network Filter
        await App.poolsPage.networkFilter(testData.Arbitrum)
        //Validating No Pools found Message
        await App.poolPage.validateNoPoolFound()
    })

    test('TC6_Validate Non-Exit Pool for Avalanche', { tag: '@Negative' }, async () => {
        //Validating the UI
        //Validating the User is on Pools Page or not
        await App.poolsPage.isUserOnPoolsPage(true)
        //Applying the Network Filter
        await App.poolsPage.networkFilter(testData.Avalanche)
        //Validating No Pools found Message
        await App.poolPage.validateNoPoolFound()
    })

    test('TC6_Validate Non-Exit Pool for Base', { tag: '@Negative' }, async () => {
        //Validating the UI
        //Validating the User is on Pools Page or not
        await App.poolsPage.isUserOnPoolsPage(true)
        //Applying the Network Filter
        await App.poolsPage.networkFilter(testData.Base)
        //Validating No Pools found Message
        await App.poolPage.validateNoPoolFound()
    })

})
