import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world";
import {waitFor, waitForSelector} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import {checkElement, uncheckElement} from "../support/html-behavior";
import {logger} from "../../logger";

Then(
    /^I (check|uncheck) the "([^"]*)" (?:radio button|check box|switch)$/,
    async function(this: ScenarioWorld, checkAction: string, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`I ${checkAction} the ${elementKey} check box|radio|switch button`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier);

            if (elementStable) {
                if (checkAction === "uncheck"){
                    await uncheckElement(page, elementIdentifier)
                } else {
                    await checkElement(page, elementIdentifier);
                }
            }

            return elementStable
        })

    }
)