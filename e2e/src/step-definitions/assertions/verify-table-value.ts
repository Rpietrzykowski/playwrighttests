import {DataTable, Then} from '@cucumber/cucumber'
import {waitFor, waitForSelector} from "../../support/wait-for-behavior";
import {getTableData} from "../../support/html-behavior";
import {ScenarioWorld} from "../setup/world";
import {getElementLocator} from "../../support/web-element-helper";
import {ElementKey} from "../../env/global";
import {logger} from "../../../logger";

Then(
    /^the "([^"]*)" table should( not)? equal the following:$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable){
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} table should ${negate?'not':''} equal the following:`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const tableStable = await waitForSelector(page, elementIdentifier)
            if (!tableStable) return false

            const dataBefore = await getTableData(page, elementIdentifier)
            return JSON.stringify(dataBefore) === JSON.stringify(dataTable.raw()) === !negate
        })

    }
)