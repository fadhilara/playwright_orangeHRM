import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import {expect} from "@playwright/test";
import { chromium, Browser, Page } from "playwright"
import { CucumberWorld } from "./world/CucumberWorld";

const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/';
let alertText: string;
let page: Page; 

Given('I navigate to the orangehrm', async function (this: CucumberWorld) {
    await this.loginPage.navigateToLoginPage();
});

When('I type a username {word}', async function (this: CucumberWorld, username: string) {
    await this.loginPage.fillUsername(username);
});

When('I type a password {word}', async function (this: CucumberWorld, password: string) {
    await this.loginPage.fillPassword(password);
});

When('I click on the login button', async function (this: CucumberWorld) {
    await this.loginPage.clickLoginButton();
});


Then('I should be presented {string}', async function (this: CucumberWorld, message: string) {
    if (message === 'success') {
        await this.loginPage.directToDashboard();
    } else {
        await this.loginPage.errorMessage();
        
    }
});