import {Before, After, setDefaultTimeout} from "@cucumber/cucumber";
import { ScenarioWorld } from "./world";
import { env, envNumber } from '../../env/parseEnv'
import {getViewPort} from "../../support/browser-behavior";
import {logger} from "../../../logger";

setDefaultTimeout(envNumber('SCRIPT_TIMEOUT'));

const artifactName = (scenario: { pickle: { name: string, id: string } }) =>
    `${scenario.pickle.name.replace(/[^\w\- ]+/g, '_')}_${scenario.pickle.id}`;

Before({ timeout: 60000 }, async function (this: ScenarioWorld, scenario) {
    logger.log(`Running cucumber scenario ${scenario.pickle.name}`)

    const contextOptions = {
        viewport: getViewPort(),
        ignoreHTTPSErrors: true,
        recordVideo: {
            dir: `${env('VIDEO_PATH')}${artifactName(scenario)}`
        }
    }

    return await this.init(contextOptions);
});

After({ timeout: 30000 }, async function (this: ScenarioWorld, scenario) {
    if (!this.screen) return;

    const {
        screen: {page, browser}
    } = this;

    try {
        if (scenario.result?.status === 'FAILED') {
            const screenshot = await page.screenshot({
                path: `${env('SCREENSHOTS_PATH')}${artifactName(scenario)}.png`,
                timeout: envNumber('SCRIPT_TIMEOUT')
            });
            await this.attach(screenshot, 'image/png');

            const browserLogs = [
                ...(await page.consoleMessages()).map(m => `[console.${m.type()}] ${m.text()}`),
                ...(await page.pageErrors()).map(e => `[pageerror] ${e.message}`),
            ];
            if (browserLogs.length) await this.attach(browserLogs.join('\n'), 'text/plain');
        }
    } finally {
        await browser.close();
    }
});