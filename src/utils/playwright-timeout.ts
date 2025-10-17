import { Page } from "@playwright/test";

//Load env variables from .env file
import { config as loadEnv } from "dotenv"
const env = loadEnv({ path: './env/.env' });

export function setGlobalSettings(page: Page) {
    // Get navigation timeout from environment variable (default to '50000' if not set)
    const navigationTimeout = parseInt(env.parsed?.UI_AUTOMATION_NAVIGATION_TIMEOUT || '90000');

    // Get command timeout from environment variable (default to '30000' if not set)
    const commandTimeout = parseInt(env.parsed?.UI_AUTOMATION_COMMAND_TIMEOUT || '90000');

    //Set Global 'navigation' timeout
    page.setDefaultNavigationTimeout(navigationTimeout); //wait up to 50 seconds

    //Set Global 'command' timeout
    page.setDefaultTimeout(commandTimeout); //wait up to 30 seconds
}
