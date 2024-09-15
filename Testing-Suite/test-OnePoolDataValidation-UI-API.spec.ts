import { test, Page, expect, } from "@playwright/test"
import { app } from "../pageObject/UI/App"
import * as testData from "../data/API/balancerGraphQL/API_TestData.json"
import { api } from "../pageObject/API/API"

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
    //Applying the Network Filter
    await App.poolsPage.networkFilter(testData.Ethereum)
    //Clicking the first pool from the list
    const PoolID = await App.poolPage.gotoFirstPoolAndReturnID() ?? ""
    //Verifying the user is on Pool Page or not
    await App.poolPage.isUserOnPoolPage(true)
    //Calling the API for same pool Data and same network
    const responseBody = await API.post.call_BalancerAPI_toFetch_OnePoolData(Endpoint, "MAINNET", PoolID)
    //Validating the Pool Id with UI and API
    App.assert.areEqual(PoolID, responseBody.data.pool.id, "Validation of Total pools in UI with API")
    //Validating the Pool Creation Time with UI and API
    await App.poolPage.validatePoolCreationDate(responseBody.data.pool.createTime)
    //Validating the Pool Type with UI and API
    await App.poolPage.validatePoolType(responseBody.data.pool.type)
    //Validating the Pool Weight if pool type is weighted with UI and API
    if ((responseBody.data.pool.type).toLowerCase() == "weighted")
      await App.poolPage.validatePoolWeight(responseBody.data.pool.poolTokens)
    //Validating the Pool address with UI and API
    await App.poolPage.validatePoolAddress(responseBody.data.pool.address)
    //Validating the Pool Name with UI and API
    await App.poolPage.validatePoolName(responseBody.data.pool.name)
  })

  test('TC2_Validate Arbitrum One Balancer Pool data', { tag: '@Positive' }, async () => {
    //Applying the Network Filter
    await App.poolsPage.networkFilter(testData.Arbitrum)
    //Clicking the first pool from the list
    const PoolID = await App.poolPage.gotoFirstPoolAndReturnID() ?? ""
    //Verifying the user is on Pool Page or not
    await App.poolPage.isUserOnPoolPage(true)
    //Calling the API for same pool Data and same network
    const responseBody = await API.post.call_BalancerAPI_toFetch_OnePoolData(Endpoint, testData.Arbitrum[0], PoolID)
    //Validating the Pool Id with UI and API
    App.assert.areEqual(PoolID, responseBody.data.pool.id, "Validation of Total pools in UI with API")
    //Validating the Pool Creation Time with UI and API
    await App.poolPage.validatePoolCreationDate(responseBody.data.pool.createTime)
    //Validating the Pool Type with UI and API
    await App.poolPage.validatePoolType(responseBody.data.pool.type)
    //Validating the Pool Weight if pool type is weighted with UI and API
    if ((responseBody.data.pool.type).toLowerCase() == "weighted")
      await App.poolPage.validatePoolWeight(responseBody.data.pool.poolTokens)
    //Validating the Pool address with UI and API
    await App.poolPage.validatePoolAddress(responseBody.data.pool.address)
    //Validating the Pool Name with UI and API
    await App.poolPage.validatePoolName(responseBody.data.pool.name)
  })

  test('TC3_Validate Avalanche One Balancer Pool data', { tag: '@Positive' }, async () => {
    //Applying the Network Filter
    await App.poolsPage.networkFilter(testData.Avalanche)
    //Clicking the first pool from the list
    const PoolID = await App.poolPage.gotoFirstPoolAndReturnID() ?? ""
    //Verifying the user is on Pool Page or not
    await App.poolPage.isUserOnPoolPage(true)
    //Calling the API for same pool Data and same network
    const responseBody = await API.post.call_BalancerAPI_toFetch_OnePoolData(Endpoint, testData.Avalanche[0], PoolID)
    //Validating the Pool Id with UI and API
    App.assert.areEqual(PoolID, responseBody.data.pool.id, "Validation of Total pools in UI with API")
    //Validating the Pool Creation Time with UI and API
    await App.poolPage.validatePoolCreationDate(responseBody.data.pool.createTime)
    //Validating the Pool Type with UI and API
    await App.poolPage.validatePoolType(responseBody.data.pool.type)
    //Validating the Pool Weight if pool type is weighted with UI and API
    if ((responseBody.data.pool.type).toLowerCase() == "weighted")
      await App.poolPage.validatePoolWeight(responseBody.data.pool.poolTokens)
    //Validating the Pool address with UI and API
    await App.poolPage.validatePoolAddress(responseBody.data.pool.address)
    //Validating the Pool Name with UI and API
    await App.poolPage.validatePoolName(responseBody.data.pool.name)
  })

})

test.describe('Negative Scenario', async () => {

})
