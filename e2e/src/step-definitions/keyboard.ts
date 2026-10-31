import { When } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world";
import {pressKey} from "../support/html-behavior";
import {logger} from "../../logger";

When(
    /^I press the "([^"]*)" key$/,
    async function(this: ScenarioWorld, key: string) {
        const {
            screen: { page },
        } = this;

        logger.log(`I press the ${key} key`)

        await pressKey(page, key)
    }
)
