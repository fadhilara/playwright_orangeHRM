import { setDefaultTimeout } from "@cucumber/cucumber";

//Load env variables from .env file
import { config as loadEnv } from "dotenv"
const env = loadEnv({ path: './env/.env' });

const customTimeout = parseInt(env.parsed?.CUCUMBER_CUSTOM_TIMEOUT || '60000');

//If too low this will affect playwright timeouts
//Example exception: 'Error: function timed out, ensure the promise resolves within 20000 milliseconds'
setDefaultTimeout(customTimeout); //60 seconds