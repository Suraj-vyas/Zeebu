import { test, Page, expect, } from "@playwright/test"
import { app } from "../../../pageObject/UI/App"
import * as testData from "../../../data/API/balancerGraphQL/API_TestData.json"
import { api } from "../../../pageObject/API/API"

let App: app
var API: api

interface requestBody {
  chainIn: string[];
  poolTypeIn: string[];
}

const Endpoint = `https://api-v3.balancer.fi/graphql`

test.beforeEach(async ({ page, request }) => {
  test.slow()
  App = new app(page)
  await App.webPage.NavigateToUrl('https://balancer.fi/pools')
  API = new api(request)
})

test.afterEach(async ({ page, request }) => {
  // await page.close()
})

test.describe.configure({ mode: 'parallel' });

test.describe('Positive Scenario', async () => {

  // test.use({ storageState: "libs/auth.json" })

  test('TC1_Validate Ethereum One Balancer Pool data', { tag: '@Positive' }, async () => {
    //Validating the UI
    await App.poolsPage.networkFilter(testData.Ethereum)
    const PoolID = await App.poolPage.gotoFirstPoolAndReturnID() ?? ""
    await App.poolPage.isUserOnPoolPage(true)
    const responseBody = await API.post.call_BalancerAPI_toFetch_OnePoolData(Endpoint, "MAINNET", PoolID)
    // console.log(responseBody.data.count);
    App.assert.areEqual(PoolID, responseBody.data.pool.id, "Validation of Total pools in UI with API")
    await App.poolPage.validatePoolCreationDate(responseBody.data.pool.createTime)
    await App.poolPage.validatePoolType(responseBody.data.pool.type)
    if ((responseBody.data.pool.type).toLowerCase() == "weighted")
      await App.poolPage.validatePoolWeight(responseBody.data.pool.poolTokens)
  })

  test('TC2_Validate Arbitrum One Balancer Pool data', { tag: '@Positive' }, async () => {
    //Validating the UI
    await App.poolsPage.networkFilter(testData.Arbitrum)
    const PoolID = await App.poolPage.gotoFirstPoolAndReturnID() ?? ""
    await App.poolPage.isUserOnPoolPage(true)
    const responseBody = await API.post.call_BalancerAPI_toFetch_OnePoolData(Endpoint, testData.Arbitrum[0], PoolID)
    // console.log(responseBody.data.count);
    App.assert.areEqual(PoolID, responseBody.data.pool.id, "Validation of Total pools in UI with API")
    await App.poolPage.validatePoolCreationDate(responseBody.data.pool.createTime)
    await App.poolPage.validatePoolType(responseBody.data.pool.type)
  })

  test('TC3_Validate Avalanche One Balancer Pool data', { tag: '@Positive' }, async () => {
    //Validating the UI
    await App.poolsPage.networkFilter(testData.Avalanche)
    const PoolID = await App.poolPage.gotoFirstPoolAndReturnID() ?? ""
    await App.poolPage.isUserOnPoolPage(true)
    const responseBody = await API.post.call_BalancerAPI_toFetch_OnePoolData(Endpoint, testData.Avalanche[0], PoolID)
    // console.log(responseBody.data.count);
    App.assert.areEqual(PoolID, responseBody.data.pool.id, "Validation of Total pools in UI with API")
    await App.poolPage.validatePoolCreationDate(responseBody.data.pool.createTime)
  })

})


test.describe('Negative Scenario', async () => {
})
