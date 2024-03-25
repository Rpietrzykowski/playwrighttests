import {Before, After, ITestCaseHookParameter, setDefaultTimeout} from "@cucumber/cucumber";
import { ScenarioWorld } from "./world";
import { env, envNumber } from '..\\..\\env\\parseEnv'

setDefaultTimeout(envNumber('DEFAULT_TIMEOUT'));

Before(async function (this: ScenarioWorld, scenario) {
    console.log(`Running cucumber scenario ${scenario.pickle.name}`)

    const contextOptions = {
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