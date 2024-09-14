# ZEEBU UI/API Automation Framework by Suraj

## Overview

This repository contains an UI/API test cases of :
1. Balancer Pools Page for Ethereum, Avalanche, Arbitrum and many more.
2. Balancer Individual Pool page Validation
3. Balancer API's data validation with UI

## Features

- **Flexible UI Handling:** Interact with Balancer UI using Page Fixture to handle UI data effectively for both Positive and Negative testing scenarion
- **Flexible Request Handling:** Interact with APIs using HTTP requests (GET and POST) and handle responses effectively for both Positive and Negative testing scenarion
- **Data-Driven Testing:** Perform data-driven testing
- **Assertions and Validations:** Validate API responses using built-in assertions.
- **Environment Management:** Manage multiple environments (e.g., Develop, UAT, API(Production)) seamlessly.
- **Comprehensive Reporting:** Generate detailed reports to track test execution results and identify issues.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system
- [Playwright](https://playwright.dev/)

### Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/Suraj-vyas/Zeebu.git
    ```

2. Navigate to the project directory which you want to run, for example :

    ```bash
    cd Zeebu
    ```

3. Install dependencies:

    ```bash
    npm init playwright@latest
    ```
    and 
     ```bash
    npm i
    ```

### Running Tests

* To run tests of particular testing file, execute the following command:

```bash
npx playwright test Zeebu/Testing-Suite/UI/Balancer/test-NonExitPoolValidation-UI.spec.ts
```

* To run tests for all positive Scenario , execute the following command:

```bash
npx playwright test -g "@Positive"
```

* To run tests in UI Mode, execute the following command:

```bash
npx playwright test --ui
```
### Test HTML Report of test execution
* To View tests HTML Report go to Zeebu/playwright-html-report path

### Changing of test execution Environment

> To run tests in specific environment, go to playwright.config.ts and change the baseURL value.
