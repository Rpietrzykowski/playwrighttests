import {ScenarioWorld} from "./setup/world";
import {Then, When} from "@cucumber/cucumber";
import {logger} from "../../logger";
import {waitFor} from "../support/wait-for-behavior";


When (
    /^I click (accept|dismiss) on the alert dialog$/,
    async function(this: ScenarioWorld, dialogAction: string){

        const {
            screen: {page}
        } = this;

        logger.log(`I click ${dialogAction} on the alert dialog`)

        page.once('dialog', dialog => dialogAction === 'dismiss' ? dialog.dismiss() : dialog.accept());

    }
)

Then(
    /^the alert dialog should( not)? contain text "(.*)"$/,
    async function(this: ScenarioWorld, negate: boolean, expectedDialogText: string){
        const {
            dialogMessages
        } = this;

        logger.log(`the alert dialog should ${negate?'not ':''}contain text ${expectedDialogText}`)

        await waitFor(() => {
            const lastDialogMessage = dialogMessages[dialogMessages.length - 1]
            if (lastDialogMessage === undefined) return false;
            return lastDialogMessage.includes(expectedDialogText) === !negate
        })

        // the next assertion must be satisfied by a new dialog, not by this one
        dialogMessages.length = 0
    }
)
