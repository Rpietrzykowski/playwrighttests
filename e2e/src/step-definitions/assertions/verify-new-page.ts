import {Then} from '@cucumber/cucumber'
import {waitFor} from "../../support/wait-for-behavior";
import {ScenarioWorld} from "../setup/world";
import {getElementLocator} from "../../support/web-element-helper";
import {ElementKey} from "../../env/global";
import {logger} from "../../../logger";
import {elementDisplayed, getElementText} from "../../support/html-behavior";

Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "(.*)"$/,
    async function (this: ScenarioWorld, elementPosition: string, negate: boolean, expectedTitle: string){
        const {
            screen: { page, context },
        } = this;

        logger.log(`the ${elementPosition} window|tab should ${negate?'not ':''}contain the title ${expectedTitle}`)

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1

        await waitFor(async () => {
            const targetPage = context.pages()[pageIndex];
            if (!targetPage) return false;
            const pageTitle = await targetPage.title()
            return pageTitle?.includes(expectedTitle) === !negate
        })
    }
)

Then (
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, negate: boolean) {
        const {
            screen: {page, context},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} on the ${elementPosition} tab|window should ${negate?'not':''} be displayed`)

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const targetPage = context.pages()[pageIndex];
            if (!targetPage) return false;
            const isElementVisible = await elementDisplayed(targetPage, elementIdentifier);
            return isElementVisible === !negate
        })
    }
)

Then (
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, negate: boolean, expectedElementText){
        const {
            screen: {page, context},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} on the ${elementPosition} tab|window should ${negate?'not':''} contain the text ${expectedElementText}`)

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const targetPage = context.pages()[pageIndex];
            if (!targetPage) return false;
            const elementText = await getElementText(targetPage, elementIdentifier);
            return elementText?.includes(expectedElementText) === !negate
        })
    }
)

Then (
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? equal the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, negate: boolean, expectedElementText){
        const {
            screen: {page, context},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} on the ${elementPosition} tab|window should ${negate?'not':''} equal the text ${expectedElementText}`)

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const targetPage = context.pages()[pageIndex];
            if (!targetPage) return false;
            const elementText = await getElementText(targetPage, elementIdentifier);
            return (elementText === expectedElementText) === !negate
        })
    }
)