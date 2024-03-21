import {Then} from '@cucumber/cucumber'
import {waitFor} from "../../support/wait-for-behavior";
import {ScenarioWorld} from "../setup/world";
import {getElementLocator} from "../../support/web-element-helper";
import {ElementKey} from "../../env/global";

Then(
    /^the "([^"]*)" (?:radio button|check box|switch) should( not)? be checked$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean){
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} check box|radio|switch button should ${negate?'not':''} be checked`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const isElementChecked = await page.isChecked(elementIdentifier)
            return isElementChecked === !negate;
        })

    }
)