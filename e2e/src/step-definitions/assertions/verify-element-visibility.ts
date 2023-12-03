import {Then} from "@cucumber/cucumber";
import {ElementKey} from "../../env/global";
import {getElementLocator} from "../../support/web-element-helper";
import {ScenarioWorld} from "../setup/world";
import {waitFor} from '..\\..\\support\\wait-for-behavior'

Then(
    /^the "([^"]*)" should be displayed"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should be displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            return (await page.$(elementIdentifier)) != null;
        })
    }
)