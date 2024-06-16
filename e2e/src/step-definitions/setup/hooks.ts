import {Before, After, setDefaultTimeout} from "@cucumber/cucumber";
import { ScenarioWorld } from "./world";
import { env, envNumber } from '..\\..\\env\\parseEnv'
import {getViewPort} from "../../support/browser-behavior";
import {logger} from "../../../logger";

setDefaultTimeout(envNumber('SCRIPT_TIMEOUT'));

Before(async function (this: ScenarioWorld, scenario) {
    logger.log(`Running cucumber scenario ${scenario.pickle.name}`)

    const contextOptions = {
        viewport: getViewPort(),
        ignoreHTTPSErrors: true,
        recordVideo: {
            dir: `${env('VIDEO_PATH')}${scenario.pickle.name}`
        }
    }

    return await this.init(contextOptions);
});

After(async function (this: ScenarioWorld, scenario) {
    const {
        screen: {page, browser}
    } = this;

    const scenarioStatus = scenario.result?.status;

    if (scenarioStatus === 'FAILED') {
        const screenshot = await page.screenshot({
            path: `${env('SCREENSHOTS_PATH')}${scenario.pickle.name}.png`
        });
        await this.attach(screenshot, 'image/png');
    }

    await browser.close();
    return browser;
});