import { Page, Locator } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";

//Load env variables from .env file
import { config as loadEnv } from "dotenv"
import { time } from "console";
import { TIMEOUT } from "dns";
const env = loadEnv({ path: './env/.env', override: true });

//Create a configuration object for easy access to env variables
const config = {
    width: parseInt(env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(env.parsed?.BROWSER_HEIGHT || '1080'),
}

export class BasePage {
    // constructor(protected page: Page) {
    //     return pageFixture.page;
    // }

    get page(): Page {
        return pageFixture.page;
    }

    //Promise<void> in TypeScript when you’re defining an async function that doesn’t explicitly return a value.
    public async navigate(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        console.log('Page is:', this.page);
    }

    public async waitAndClickByRole(role: string, name: string): Promise<void> {
        const element = await this.page.getByRole(role as any, { name: name });
        await element.click();
    }

    // Wait for the locator to be visible and then click on it
    public async waitAndClick(locator: Locator): Promise<void> {
        await locator.isVisible();
        await locator.click();
    }

    // Wait for the selector to be visible and then click on it
    public async waitAndClickSelector(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    public async switchToNewTab(): Promise<void> {
        await this.page.context().waitForEvent("page", {timeout: 90000}); //reintialise the page > new tab > page
        console.log('Clicked link, waiting for new tab...');
        //Retrieve all current open pages (tabs)
        const allPages = await this.page.context().pages();
    
        //Assign the most recent tab to pageFixture.page
        pageFixture.page = allPages[allPages.length - 1];
    
        //Bring the newly assigned tab to the front (Make it active)
        await this.page.bringToFront();
    
        //Ensure the newly assigned tab is also fully maximised 
        await this.page.setViewportSize({ width: config.width, height: config.height });
    } 
}