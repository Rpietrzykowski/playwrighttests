import playwright, {
    BrowserContextOptions,
    Page,
    Browser,
    BrowserContext,
    BrowserType
} from "playwright";
import { env, envNumber } from "../../env/parseEnv"
import { World, IWorldOptions, setWorldConstructor} from "@cucumber/cucumber";
import {GlobalConfig, GlobalVariables} from "../../env/global";

export type Screen = {
    browser: Browser,
    context: BrowserContext
    page: Page;
}

export class ScenarioWorld extends World {
    constructor(options: IWorldOptions) {
        super(options)

        this.globalConfig = options.parameters as GlobalConfig
        this.globalVariables = {};
    }

    globalConfig: GlobalConfig;

    globalVariables: GlobalVariables;

    screen!: Screen;

    dialogMessages: string[] = [];

    async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
        const browser = await this.newBrowser();
        const context = await browser.newContext(contextOptions)
        // locator actions retry inside waitFor, so a single attempt must end well before the step timeout
        context.setDefaultTimeout(envNumber('SELECTOR_TIMEOUT'))
        context.setDefaultNavigationTimeout(envNumber('SCRIPT_TIMEOUT'))
        // 'dialogclosed' also fires for dialogs auto-dismissed without a handler, so every dialog is recorded
        context.on('dialogclosed', dialog => this.dialogMessages.push(dialog.message()))
        const page = await context.newPage();

        this.screen = { browser, context, page };

        return this.screen;
    }

    private newBrowser = async (): Promise<Browser> => {

        const automationBrowsers = ['chromium', 'firefox', 'webkit'] as const
        type AutomationBrowser = typeof automationBrowsers[number]
        const automationBrowser = env('UI_AUTOMATION_BROWSER') as AutomationBrowser

        if (!automationBrowsers.includes(automationBrowser)) {
            throw new Error(`Unsupported UI_AUTOMATION_BROWSER: ${automationBrowser}`)
        }

        const browserType: BrowserType = playwright[automationBrowser];

        return await browserType.launch({
            headless: process.env.HEADLESS !== 'false',
            args: automationBrowser === 'chromium' ? [
                '--disable-web-security',
                '--disable-features=IsolatedOrigins, site-per-process',
                // 'devtools' launch option was removed from Playwright, Chromium flag replaces it
                ...(process.env.DEVTOOLS !== 'false' ? ['--auto-open-devtools-for-tabs'] : []),
            ] : []
        })

    }
}

setWorldConstructor(ScenarioWorld)