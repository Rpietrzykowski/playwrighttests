import {Then} from '@cucumber/cucumber'
import {waitFor, waitForSelector} from "../../support/wait-for-behavior";
import {ScenarioWorld} from "../setup/world";
import {getElementLocator} from "../../support/web-element-helper";
import {ElementKey} from "../../env/global";
import {logger} from "../../../logger";
import {elementChecked} from "../../support/html-behavior";

Then(
    /^the "([^"]*)" (?:radio button|check box|switch) should( not)? be checked$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean){
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} check box|radio|switch button should ${negate?'not':''} be checked`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)
            if (elementStable) {
                const isElementChecked = await elementChecked(page, elementIdentifier)
                return isElementChecked === !negate;
            } else {
                return elementStable
            }
        })

    }
)