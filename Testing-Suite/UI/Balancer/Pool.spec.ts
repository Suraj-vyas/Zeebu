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

  test('TC1_Validate Pool Page', { tag: '@Positive' }, async () => {
    //Validating the UI
    await App.poolPage.isUserOnPoolPage(true)
  })

})


test.describe('Negative Scenario', async () => {
})
