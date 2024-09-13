import { test, APIRequestContext, APIResponse, expect } from "@playwright/test";

export class post {
  protected readonly request: APIRequestContext
  constructor(request: APIRequestContext) {
    this.request = request
  }

  async call_PostMethod_With_200_StatusCode(endpoint: string, requestBody: any) {
    let response: APIResponse
    let responseTime: number
    let responseBody = ""
    await test.step("Calling the API", async () => {
      const beforeCallTime: any = new Date();

      response = await this.request.post(endpoint, {
        data: requestBody
      })
      const afterCallTime: any = new Date();
      responseTime = (afterCallTime - beforeCallTime)
    })
    await test.step("Response Status Code Validation", async () => {
      expect.soft(response.status()).toEqual(200)
    })
    await test.step("Response status and msg field Validation", async () => {
      responseBody = await response.text()
      expect(JSON.parse(responseBody).id).toBe(requestBody.id)
      expect(JSON.parse(responseBody).jsonrpc).toBe(requestBody.jsonrpc)
    })
    await test.step("Test Report Log", async () => {
      console.log("*****".repeat(50));
      console.log("Response Time  ---> ", responseTime, "ms", '\n');
      console.log("Request URL :", '\n\n', response.url(), '\n');
      console.log("Request Body :", '\n\n', requestBody, '\n');
      console.log("Response Body :", '\n\n', JSON.parse(responseBody), '\n');
    })

    return JSON.parse(responseBody)
  }

  async call_PostMethod_With_400_StatusCode(endpoint: string, requestBody: any) {
    let response: APIResponse
    let responseTime: number
    let responseBody = ""
    await test.step("Calling the API", async () => {
      const beforeCallTime: any = new Date();

      response = await this.request.post(endpoint, {
        data: requestBody
      })
      const afterCallTime: any = new Date();
      responseTime = (afterCallTime - beforeCallTime)
    })
    await test.step("Response Status Code Validation", async () => {
      expect.soft(response.status()).toEqual(400)
    })
    await test.step("Response status and msg field Validation", async () => {
      responseBody = await response.text()
    })
    await test.step("Test Report Log", async () => {
      console.log("*****".repeat(50));
      console.log("Response Time  ---> ", responseTime, "ms", '\n');
      console.log("Request URL :", '\n\n', response.url(), '\n');
      console.log("Request Body :", '\n\n', requestBody, '\n');
      console.log("Response Body :", '\n\n', responseBody, '\n');
    })

    return JSON.parse(responseBody)
  }

  async call_BalancerAPI_toFetch_AllPoolsData(endpoint: string, requestBody: any) {
    let response: APIResponse
    let responseTime: number
    let responseBody = ""
    let payloadData: any
    // console.log(requestBody.chainIn);
    // console.log(requestBody.poolTypeIn);

    await test.step("Calling the API", async () => {
      payloadData = {
        query: `query GetPools($first: Int, $skip: Int, $orderBy: GqlPoolOrderBy, $orderDirection: GqlPoolOrderDirection, $where: GqlPoolFilter, $textSearch: String) {
                pools: poolGetPools(
                  first: $first
                  skip: $skip
                  orderBy: $orderBy
                  orderDirection: $orderDirection
                  where: $where
                  textSearch: $textSearch
                ) {
                  address
                  chain
                  createTime
                  decimals
                  protocolVersion
                  tags
                  displayTokens {
                    id
                    address
                    name
                    weight
                    symbol
                    nestedTokens {
                      id
                      address
                      name
                      weight
                      symbol
                      __typename
                    }
                    __typename
                  }
                  dynamicData {
                    totalLiquidity
                    lifetimeVolume
                    lifetimeSwapFees
                    volume24h
                    fees24h
                    holdersCount
                    swapFee
                    swapsCount
                    totalShares
                    aprItems {
                      id
                      title
                      apr
                      type
                      rewardTokenSymbol
                      rewardTokenAddress
                      __typename
                    }
                    __typename
                  }
                  staking {
                    id
                    type
                    chain
                    address
                    gauge {
                      id
                      gaugeAddress
                      version
                      status
                      workingSupply
                      otherGauges {
                        gaugeAddress
                        version
                        status
                        id
                        rewards {
                          id
                          tokenAddress
                          rewardPerSecond
                          __typename
                        }
                        __typename
                      }
                      rewards {
                        id
                        rewardPerSecond
                        tokenAddress
                        __typename
                      }
                      __typename
                    }
                    aura {
                      id
                      apr
                      auraPoolAddress
                      auraPoolId
                      isShutdown
                      __typename
                    }
                    __typename
                  }
                  factory
                  id
                  name
                  owner
                  symbol
                  type
                  userBalance {
                    totalBalance
                    totalBalanceUsd
                    walletBalance
                    walletBalanceUsd
                    stakedBalances {
                      balance
                      balanceUsd
                      stakingType
                      stakingId
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                count: poolGetPoolsCount(
                  first: $first
                  skip: $skip
                  orderBy: $orderBy
                  orderDirection: $orderDirection
                  where: $where
                  textSearch: $textSearch
                )
              }`,
        variables: { "first": 20, "skip": 0, "orderBy": "totalLiquidity", "orderDirection": "desc", "where": { "poolTypeIn": requestBody.poolTypeIn, "chainIn": requestBody.chainIn, "userAddress": null, "minTvl": parseInt(requestBody.TVL), "tagIn": null, "tagNotIn": ["BLACK_LISTED"] }, "textSearch": null }
      }
      const beforeCallTime: any = new Date();
      response = await this.request.post(endpoint, {
        data: payloadData
      })


      const afterCallTime: any = new Date();
      responseTime = (afterCallTime - beforeCallTime)
    })
    await test.step("Response Status Code Validation", async () => {
      expect.soft(response.status()).toEqual(200)
    })
    await test.step("Response status and msg field Validation", async () => {
      responseBody = await response.text()
    })
    await test.step("Test Report Log", async () => {
      console.log("*****".repeat(25));
      console.log("Response Time  ---> ", responseTime, "ms", '\n');
      console.log("Request URL :", '\n\n', response.url(), '\n');
      // console.log("Request Body :", '\n\n', payloadData, '\n');
      console.log("Response Body :", '\n\n', JSON.parse(responseBody), '\n');
    })

    return JSON.parse(responseBody)
  }

  async call_BalancerAPI_toFetch_OnePoolData(endpoint: string, chain: string, poolId: string) {
    let response: APIResponse
    let responseTime: number
    let responseBody = ""
    let payloadData: any
    // console.log(requestBody.chainIn);
    // console.log(requestBody.poolTypeIn);

    await test.step("Calling the API", async () => {
      payloadData = {
        query: `query GetPool($id: String!, $chain: GqlChain!, $userAddress: String) {
          pool: poolGetPool(id: $id, chain: $chain, userAddress: $userAddress) {
            id
            address
            name
            version
            owner
            decimals
            factory
            symbol
            createTime
            type
            chain
            protocolVersion
            tags
            dynamicData {
              poolId
              swapEnabled
              totalLiquidity
              totalShares
              fees24h
              surplus24h
              swapFee
              volume24h
              holdersCount
              isInRecoveryMode
              isPaused
              aprItems {
                id
                title
                apr
                type
                rewardTokenSymbol
                rewardTokenAddress
                __typename
              }
              __typename
            }
            allTokens {
              id
              address
              name
              symbol
              decimals
              isNested
              isPhantomBpt
              isMainToken
              __typename
            }
            displayTokens {
              id
              address
              name
              weight
              symbol
              nestedTokens {
                id
                address
                name
                weight
                symbol
                __typename
              }
              __typename
            }
            staking {
              id
              type
              chain
              address
              gauge {
                id
                gaugeAddress
                version
                status
                workingSupply
                otherGauges {
                  gaugeAddress
                  version
                  status
                  id
                  rewards {
                    id
                    tokenAddress
                    rewardPerSecond
                    __typename
                  }
                  __typename
                }
                rewards {
                  id
                  rewardPerSecond
                  tokenAddress
                  __typename
                }
                __typename
              }
              aura {
                id
                apr
                auraPoolAddress
                auraPoolId
                isShutdown
                __typename
              }
              __typename
            }
            userBalance {
              totalBalance
              totalBalanceUsd
              walletBalance
              walletBalanceUsd
              stakedBalances {
                balance
                balanceUsd
                stakingType
                stakingId
                __typename
              }
              __typename
            }
            ... on GqlPoolWeighted {
              nestingType
              poolTokens {
                ... on GqlPoolTokenDetail {
                  id
                  index
                  name
                  symbol
                  balance
                  balanceUSD
                  address
                  priceRate
                  decimals
                  weight
                  hasNestedPool
                  isAllowed
                  priceRateProvider
                  priceRateProviderData {
                    ...PriceRateProviderDataFields
                    __typename
                  }
                  nestedPool {
                    id
                    address
                    type
                    tokens {
                      index
                      address
                      decimals
                      __typename
                    }
                    __typename
                  }
                  isAllowed
                  __typename
                }
                __typename
              }
              __typename
            }
            ... on GqlPoolStable {
              amp
              poolTokens {
                ... on GqlPoolTokenDetail {
                  id
                  index
                  name
                  symbol
                  balance
                  balanceUSD
                  address
                  priceRate
                  decimals
                  weight
                  hasNestedPool
                  isAllowed
                  priceRateProvider
                  priceRateProviderData {
                    ...PriceRateProviderDataFields
                    __typename
                  }
                  nestedPool {
                    id
                    address
                    type
                    tokens {
                      index
                      address
                      decimals
                      __typename
                    }
                    __typename
                  }
                  isAllowed
                  __typename
                }
                __typename
              }
              __typename
            }
            ... on GqlPoolMetaStable {
              amp
              poolTokens {
                ... on GqlPoolTokenDetail {
                  id
                  index
                  name
                  symbol
                  balance
                  balanceUSD
                  address
                  priceRate
                  decimals
                  weight
                  hasNestedPool
                  isAllowed
                  priceRateProvider
                  priceRateProviderData {
                    ...PriceRateProviderDataFields
                    __typename
                  }
                  nestedPool {
                    id
                    address
                    type
                    tokens {
                      index
                      address
                      decimals
                      __typename
                    }
                    __typename
                  }
                  isAllowed
                  __typename
                }
                __typename
              }
              __typename
            }
            ... on GqlPoolElement {
              unitSeconds
              principalToken
              baseToken
              poolTokens {
                ... on GqlPoolTokenDetail {
                  id
                  index
                  name
                  symbol
                  balance
                  balanceUSD
                  address
                  priceRate
                  decimals
                  weight
                  hasNestedPool
                  isAllowed
                  priceRateProvider
                  priceRateProviderData {
                    ...PriceRateProviderDataFields
                    __typename
                  }
                  nestedPool {
                    id
                    address
                    type
                    tokens {
                      index
                      address
                      decimals
                      __typename
                    }
                    __typename
                  }
                  isAllowed
                  __typename
                }
                __typename
              }
              __typename
            }
            ... on GqlPoolComposableStable {
              amp
              nestingType
              bptPriceRate
              poolTokens {
                ... on GqlPoolTokenDetail {
                  id
                  index
                  name
                  symbol
                  balance
                  balanceUSD
                  address
                  priceRate
                  decimals
                  weight
                  hasNestedPool
                  isAllowed
                  priceRateProvider
                  priceRateProviderData {
                    ...PriceRateProviderDataFields
                    __typename
                  }
                  nestedPool {
                    id
                    address
                    type
                    tokens {
                      index
                      address
                      decimals
                      __typename
                    }
                    __typename
                  }
                  isAllowed
                  __typename
                }
                __typename
              }
              __typename
            }
            ... on GqlPoolLiquidityBootstrapping {
              name
              nestingType
              poolTokens {
                ... on GqlPoolTokenDetail {
                  id
                  index
                  name
                  symbol
                  balance
                  balanceUSD
                  address
                  priceRate
                  decimals
                  weight
                  hasNestedPool
                  isAllowed
                  priceRateProvider
                  priceRateProviderData {
                    ...PriceRateProviderDataFields
                    __typename
                  }
                  nestedPool {
                    id
                    address
                    type
                    tokens {
                      index
                      address
                      decimals
                      __typename
                    }
                    __typename
                  }
                  isAllowed
                  __typename
                }
                __typename
              }
              __typename
            }
            ... on GqlPoolGyro {
              alpha
              beta
              type
              c
              dSq
              lambda
              root3Alpha
              s
              sqrtAlpha
              sqrtBeta
              tauAlphaX
              tauAlphaY
              tauBetaX
              tauBetaY
              u
              v
              w
              z
              nestingType
              poolTokens {
                ... on GqlPoolTokenDetail {
                  id
                  index
                  name
                  symbol
                  balance
                  balanceUSD
                  address
                  priceRate
                  decimals
                  weight
                  hasNestedPool
                  isAllowed
                  priceRateProvider
                  priceRateProviderData {
                    ...PriceRateProviderDataFields
                    __typename
                  }
                  nestedPool {
                    id
                    address
                    type
                    tokens {
                      index
                      address
                      decimals
                      __typename
                    }
                    __typename
                  }
                  isAllowed
                  __typename
                }
                __typename
              }
              __typename
            }
            ... on GqlPoolFx {
              alpha
              beta
              delta
              epsilon
              lambda
              poolTokens {
                ... on GqlPoolTokenDetail {
                  id
                  index
                  name
                  symbol
                  balance
                  balanceUSD
                  address
                  priceRate
                  decimals
                  weight
                  hasNestedPool
                  isAllowed
                  priceRateProvider
                  priceRateProviderData {
                    ...PriceRateProviderDataFields
                    __typename
                  }
                  nestedPool {
                    id
                    address
                    type
                    tokens {
                      index
                      address
                      decimals
                      __typename
                    }
                    __typename
                  }
                  isAllowed
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }
        
        fragment PriceRateProviderDataFields on GqlPriceRateProviderData {
          address
          name
          summary
          reviewed
          warnings
          upgradeableComponents {
            entryPoint
            implementationReviewed
            __typename
          }
          reviewFile
          factory
          __typename
        }`,
        variables: { "id": poolId, "chain": chain, "userAddress": "" }
      }
      const beforeCallTime: any = new Date();
      response = await this.request.post(endpoint, {
        data: payloadData
      })




      const axios = require('axios');
      let data = JSON.stringify({

      });









      const afterCallTime: any = new Date();
      responseTime = (afterCallTime - beforeCallTime)
    })
    await test.step("Response Status Code Validation", async () => {
      expect.soft(response.status()).toEqual(200)
    })
    await test.step("Response status and msg field Validation", async () => {
      responseBody = await response.text()
    })
    await test.step("Test Report Log", async () => {
      console.log("*****".repeat(25));
      console.log("Response Time  ---> ", responseTime, "ms", '\n');
      console.log("Request URL :", '\n\n', response.url(), '\n');
      // console.log("Request Body :", '\n\n', payloadData, '\n');
      console.log("Response Body :", '\n\n', JSON.parse(responseBody), '\n');
    })

    return JSON.parse(responseBody)
  }
}  