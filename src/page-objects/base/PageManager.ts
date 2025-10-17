import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";
import { JobTitlePage } from "../JobTitlePage";
import { LoginPage } from "../LoginPage";

export class PageManager {
    // constructor(private page: Page) {}
    get page(): Page {
        return pageFixture.page;
    }

    createBasePage(): BasePage {
        return new BasePage();
    }

    createJobTitlePage() {
        return new JobTitlePage();
    }

    createLoginPage() {
        return new LoginPage();
    }
}