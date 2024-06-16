import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world";
import {waitFor, waitForSelector} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import {getIframeElement, inputValueOnIframe} from "../support/html-behavior";
import {logger} from "../../logger";

Then(
    /^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, inputValue: string){
        const {
            screen: { page },
            globalConfig
        } = this;

        logger.log(`I fill in the ${elementKey} on the ${iframeName} with ${inputValue}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeName, globalConfig)

        await waitFor(async () => {
            const elementIframe = await getIframeElement(page, iframeIdentifier)

            const iframeStable = await waitForSelector(page, iframeIdentifier);

            if (iframeStable){
                const elementIframe = await getIframeElement(page, iframeIdentifier);
                if (elementIframe){
                    await inputValueOnIframe(elementIframe, elementIdentifier, inputValue)
                }
            }
            return iframeStable;
        })
    }
)