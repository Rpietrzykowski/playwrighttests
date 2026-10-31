import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world";
import {waitFor, waitForSelector} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import {logger} from "../../logger";
import {getElementText} from "../support/html-behavior";

Then(
    /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, variableKey: string){
        const {
            screen: { page },
            globalConfig,
            globalVariables,
        } = this;

        logger.log(`I retrieve the ${elementKey} text and store it as ${variableKey} in global variables`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor( async () => {
            const elementStable = await waitForSelector(page, elementIdentifier);

            if (!elementStable) return false;

            const elementText = await getElementText(page, elementIdentifier)
            if (elementText == null) return false;

            globalVariables[variableKey] = elementText;
            return true;
        })
    }
)