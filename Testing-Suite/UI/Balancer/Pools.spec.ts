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

test.describe.configure({ mode: 'parallel' });

test.describe('Positive Scenario', async () => {

  // test.use({ storageState: "libs/auth.json" })

  test('TC1_Validate TotalPools for All Network', { tag: '@Positive' }, async () => {
    //Validating the UI
    await App.poolsPage.isUserOnPoolsPage(true)
    const totalPools = await App.poolsPage.totalPools()
    //Validating the API
    const requestPayload: requestBody = {
      chainIn: testData.AllChain,
      poolTypeIn: testData.AllPoolType
    };
    const responseBody = await API.post.call_BalancerAPI_toFetch_AllPoolsData(Endpoint, requestPayload)
    // console.log(responseBody.data.count);
    expect(totalPools).toEqual(responseBody.data.count)

  })

  test('TC2_Validate TotalPools for Ethereum', { tag: '@Positive' }, async () => {
    //Data Setup
    const requestPayload: requestBody = {
      chainIn: testData.Ethereum,
      poolTypeIn: testData.AllPoolType
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
      poolTypeIn: testData.AllPoolType
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
      poolTypeIn: testData.AllPoolType
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
      poolTypeIn: testData.AllPoolType
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
      poolTypeIn: testData.AllPoolType
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
      poolTypeIn: testData.AllPoolType
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
      poolTypeIn: testData.AllPoolType
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
      poolTypeIn: testData.AllPoolType
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
      poolTypeIn: testData.AllPoolType
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
      poolTypeIn: testData.AllPoolType
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

})


test.describe('Negative Scenario', async () => {
})
