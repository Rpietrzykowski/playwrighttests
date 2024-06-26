import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world";
import {waitFor, waitForSelector} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import {logger} from "../../logger";

Then(
    /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, variableKey: string){
        const {
            screen: { page },
            globalConfig,
            globalVariables,
        } = this;

        logger.log(`I receive the ${elementKey} text and store it as ${variableKey} in global variables`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor( async () => {
            const elementStable = await waitForSelector(page, elementIdentifier);

            if (elementStable){
                const elementText = await page.textContent(elementIdentifier)
                if (elementText != null){
                    globalVariables[variableKey] = elementText;
                }
            }
            return elementStable;
        })
    }
)