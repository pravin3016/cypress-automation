const report = require("multiple-cucumber-html-reporter"); // eslint-disable-line

report.generate({
  jsonDir: 'cypress/reports/cucumber-json', // ** Path of .json file **//
  reportPath: './cypress/reports/cucumber-html-report',
  displayDuration: true,
  useCDN: true,
  storeScreenshots: true,
  metadata: {
    browser: {
      name: 'chrome',
      version: '92',
    },
    device: 'Test machine',
    platform: {
      name: 'MacBook',
      version: '11.6',
    },
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Demo Nopcommerce Automation' },
      { label: 'Release', value: 'V1.0' },
      { label: 'Environment', value: 'Staging' },
      {
        label: 'Execution Start Time',
        value: `${new Date().toLocaleString()}`,
      },
    ],
  },
  customizedReportName: 'Demo Automation',
});
