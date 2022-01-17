# cypress-cucumber-automation

Cypress Automation Test Framework with BDD (Cucumber)


## Table of contents

* Get started
  * Prerequisites
  * Installation
  * Folder Structure
  

* How to run the tests
  * Test exection
  * Generate HTML report with screenshots
  
* IDE used
  
### Prerequisites

- [Node.js](https://nodejs.org/) - Should be installed in the machine


### Installation

 Clone the repository usin below stpes:

 ```sh
 git clone https://github.com/pravin3016/cypress-automation.git
 cd cypress-bdd-automation

 ```

 Install dependencies:

 ```sh
 npm install
 ```
 
### Folder Structure

- `Fixtures`,  To maintain the test data.
- `Integration`, To maintain the `features`, `Step definition`files which hold the test cases.
- `Plugins` contains the events listeners. Logs the events.
- `Screenshot` failure screenshots are stored
- `Support` contains reusable scripts
- `Videos` 
- `node_modules` dependencies installed 
- `cypress.json` Cypress configurations. Overide default values


## How to run the tests

  ### Test exection
  ```
  npm run test 
  ```
  #### 'OR'
  ### Run tests on UI mode
  ```
  npm run cypress-ui
  ```
### Generate HTML report with screenshots

  ```shell
  npm run report
  ```
   - Report will be generated under the folder `Reports/cucumber-html-report/index.html`

## IDE used

### Visual Studio Code

  To get vscode to resolve your steps, install the [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) extension from the marketplace.

  You will also need to tell the extension the locations of your feature and step definition files [as described here](https://github.com/alexkrechik/VSCucumberAutoComplete#settings-example).


