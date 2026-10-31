import {Then} from '@cucumber/cucumber'
import {waitFor} from "../../support/wait-for-behavior";
import {ScenarioWorld} from "../setup/world";
import {getElementLocator} from "../../support/web-element-helper";
import {ElementKey} from "../../env/global";
import {logger} from "../../../logger";
import {getElementText} from "../../support/html-behavior";

Then(
    /^the "([^"]*)" should( not)? equal the "([^"]*)" stored in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
        const {
            screen: {page},
            globalConfig,
            globalVariables,
        } = this;

        logger.log(`the ${elementKey} should ${negate?'not ':''}equal the ${globalVariables[variableKey]} stored in global variables`);

        if (!(variableKey in globalVariables)) {
            throw new Error(`Global variable ${variableKey} is not set`)
        }

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementText = await getElementText(page, elementIdentifier)
            const variableValue = globalVariables[variableKey]
            return (elementText === variableValue) === !negate
        })
    }
)

Then(
    /^the "([^"]*)" should( not)? contain the "([^"]*)" stored in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
        const {
            screen: {page},
            globalConfig,
            globalVariables,
        } = this;

        logger.log(`the ${elementKey} should ${negate?'not ':''}contain the ${globalVariables[variableKey]} stored in global variables`);

        if (!(variableKey in globalVariables)) {
            throw new Error(`Global variable ${variableKey} is not set`)
        }

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementText = await getElementText(page, elementIdentifier)
            const variableValue = globalVariables[variableKey]
            return elementText?.includes(variableValue) === !negate
        })
    }
)