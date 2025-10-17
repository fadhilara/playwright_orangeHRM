import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CucumberWorld } from "./world/CucumberWorld";

Given('user is logged in and navigated to Job Titles page', async function (this: CucumberWorld) {
    await this.loginPage.navigateToLoginPage();
    await this.loginPage.fillUsername('Admin');
    await this.loginPage.fillPassword('admin123');
    await this.loginPage.clickLoginButton();
    await this.loginPage.directToDashboard();
    await this.jobTitlePage.navigateToJobTitlesPage();
});

When('user click add button', async function (this: CucumberWorld) {
    await this.jobTitlePage.clickAddButton();
});

When('user type job title {string}', async function (this: CucumberWorld, jobTitle: string) {
        await this.jobTitlePage.fillJobTitle(jobTitle);
});

When('user type job description {string}', async function (this: CucumberWorld, jobDesc: string) {
    await this.jobTitlePage.fillJobDescription(jobDesc);
});
        
When('user upload job specification {string}', async function (this: CucumberWorld, jobSpecFile: string) {
    await this.jobTitlePage.uploadJobFile(jobSpecFile);
});

When('user type note {string}', async function (this: CucumberWorld, note: string) {
    await this.jobTitlePage.fillNote(note);
});

When('user click save button', async function (this: CucumberWorld) {
    await this.jobTitlePage.clickSaveButton();
});

Then('user should be able to directed to Job Titles page', async function (this: CucumberWorld) {
    await this.jobTitlePage.directToJobTitles();
});

When('user click sort job title by {string}', async function (this: CucumberWorld, sort: string) {
    if (sort === 'ascending') {
        await this.jobTitlePage.clickSortButton();
        await this.jobTitlePage.clickSortAscButton();
    } else {
        await this.jobTitlePage.clickSortButton();
        await this.jobTitlePage.clickSortDescButton();
    }
    await this.jobTitlePage.waitForLoadState('networkidle');
  });
  
  Then('user should be able to see job titles in {string}', async function (this: CucumberWorld, result: string) {
    await this.jobTitlePage.verifySortedOrder(result);
  });