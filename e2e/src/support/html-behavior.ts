import { Page } from 'playwright';
import {ElementKey, ElementLocator} from "../env/global";
import {Frame} from "@playwright/test";

export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.click(elementIdentifier);
}

export const inputValue = async (
    page: Page,
    elementIdentifier: ElementKey,
    input: string,
): Promise<void> => {
    await page.focus(elementIdentifier);
    await page.fill(elementIdentifier, input);
}

export const selectValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string
): Promise<void> => {
    await page.focus(elementIdentifier);
    await page.selectOption(elementIdentifier, option);
}

export const checkElement = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<void> => {
    await page.check(elementIdentifier)
}

export const uncheckElement = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<void> => {
    await page.uncheck(elementIdentifier)
}

export const getValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<string | null> => {
    const value = await page.$eval<string, HTMLSelectElement>(elementIdentifier, el => {
        return el.value;
    })
    return value
}

export const getIframeElement = async (
    page: Page,
    iframeIdentifier: ElementLocator
): Promise<Frame | null | undefined> => {
    await page.waitForSelector(iframeIdentifier);
    const elementHandle = await page.$(iframeIdentifier);
    const elementIframe = await elementHandle?.contentFrame();
    return elementIframe
}

export const inputValueOnIframe = async (
    elementIframe: Frame,
    elementIdenfifier: ElementLocator,
    inputValue: string

): Promise<void> => {
    await elementIframe.fill(elementIdenfifier, inputValue);
}

export const inputValueOnPage = async (
    pages: Array<Page>,
    pageIndex: number,
    elementIdentifier: ElementLocator,
    inputValue: string,
): Promise<void> => {
    await pages[pageIndex].focus(elementIdentifier)
    await pages[pageIndex].fill(elementIdentifier, inputValue)
}