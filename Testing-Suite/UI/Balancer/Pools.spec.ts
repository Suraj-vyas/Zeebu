import { test, Page, expect, } from "@playwright/test"
import { app } from "../../../pageObject/UI/App"
import * as testData from "../../../data/API/balancerGraphQL/API_TestData.json"
import { api } from "../../../pageObject/API/API"

let App: app
var API: api

interface requestBody {
  chainIn: string[];
  poolTypeIn: string[];
  TVL: string;
}

const Endpoint = `https://api-v3.balancer.fi/graphql`

test.beforeEach(async ({ page, request }) => {
  // test.slow()
  App = new app(page)
  await App.webPage.NavigateToUrl('https://balancer.fi/pools')
  API = new api(request)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe.configure({ mode: 'serial' });

test.describe('Positive Scenario', async () => {

  // test.use({ storageState: "libs/auth.json" })

  test('TC1_Validate TotalPools for All Network', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.AllChain,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")

  })

  test('TC2_Validate TotalPools for Ethereum', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Ethereum,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")

  })

  test('TC3_Validate TotalPools for Arbitrum', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Arbitrum,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

  test('TC4_Validate TotalPools for Avalanche', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Avalanche,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

  test('TC5_Validate TotalPools for Base', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Base,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

  test('TC6_Validate TotalPools for Fraxtal', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Fraxtal,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

  test('TC7_Validate TotalPools for Gnosis', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Gnosis,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

  test('TC8_Validate TotalPools for Mode', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Mode,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

  test('TC9_Validate TotalPools for Optimism', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Optimism,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

  test('TC10_Validate TotalPools for Polygon', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Polygon,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

  test('TC11_Validate TotalPools for Polygon zkEVM', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.PolygonzkEVM,
      poolTypeIn: testData.AllPoolType,
      TVL: "0"
    };
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    const totalPools = await App.poolsPage.totalPools()
    //Calling the API
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    //Validating the Values of Total Pools
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

  test('TC12_Validate PoolType Filter for Weighted', { tag: '@Positive' }, async () => {
    //Data Setup
    const poolType = testData.Weighted
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.validatePoolTypesFilter(poolType)
  })

  test('TC13_Validate PoolType Filter for Stable', { tag: '@Positive' }, async () => {
    //Data Setup
    const poolType = testData.Stable
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.validatePoolTypesFilter(poolType)
  })

  test('TC14_Validate PoolType Filter for LBP', { tag: '@Positive' }, async () => {
    //Data Setup
    const poolType = testData.LBP
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.validatePoolTypesFilter(poolType)
  })

  test('TC15_Validate PoolType Filter for Cow', { tag: '@Positive' }, async () => {
    //Data Setup
    const poolType = testData.Cow
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.validatePoolTypesFilter(poolType)
  })

  test('TC16_Validate TotalPools Filter for Min TVL', async ({ page }) => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Ethereum,
      poolTypeIn: testData.AllPoolType,
      TVL: testData.TVL
    };
    await App.poolsPage.isUserOnPoolsPage(true)
    await App.poolsPage.networkFilter(requestPayload.chainIn)
    await App.poolsPage.setTVLSlide(requestPayload.TVL)
    const totalPools = await App.poolsPage.totalPools()
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    App.assert.areEqual(totalPools, responseBody.data.count, "Validation of Total pools in UI with API")
  })

})


test.describe('Negative Scenario', async () => {

})
