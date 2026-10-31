import {Frame, Page} from 'playwright';
import {ElementKey, ElementLocator} from "../env/global";

export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.locator(elementIdentifier).first().click();
}

export const clickElementAtIndex = async (
    page: Page,
    elementIdentifier: ElementLocator,
    elementPosition: number
):Promise<void> => {
    await page.locator(elementIdentifier).nth(elementPosition).click()
}

export const inputValue = async (
    page: Page,
    elementIdentifier: ElementKey,
    input: string,
): Promise<void> => {
    const element = page.locator(elementIdentifier).first();
    await element.focus();
    await element.fill(input);
}

export const selectValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string
): Promise<void> => {
    const element = page.locator(elementIdentifier).first();
    await element.focus();
    await element.selectOption(option);
}

export const checkElement = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<void> => {
    await page.locator(elementIdentifier).first().check()
}

export const uncheckElement = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<void> => {
    await page.locator(elementIdentifier).first().uncheck()
}

export const getValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<string | null> => {
    return page.locator(elementIdentifier).first().inputValue()
}

export const getIframeElement = async (
    page: Page,
    iframeIdentifier: ElementLocator
): Promise<Frame | null | undefined> => {
    const elementHandle = await page.locator(iframeIdentifier).first().elementHandle();
    return elementHandle?.contentFrame()
}

export const inputValueOnIframe = async (
    elementIframe: Frame,
    elementIdenfifier: ElementLocator,
    inputValue: string

): Promise<void> => {
    await elementIframe.locator(elementIdenfifier).first().fill(inputValue);
}

export const inputValueOnPage = async (
    pages: Array<Page>,
    pageIndex: number,
    elementIdentifier: ElementLocator,
    inputValue: string,
): Promise<void> => {
    const element = pages[pageIndex].locator(elementIdentifier).first();
    await element.focus()
    await element.fill(inputValue)
}

export const getAttributeText = async(
    page: Page,
    elementIdentifier: ElementLocator,
    attribute: string,
): Promise<string|null> => {
    return page.locator(elementIdentifier).first().getAttribute(attribute);
}

export const scrollIntoView = async(
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<void> => {
    await page.locator(elementIdentifier).first().scrollIntoViewIfNeeded()
}

export const elementChecked = async(
    page: Page,
    elementIdentifier: ElementLocator
): Promise<boolean | null> => {
    return page.locator(elementIdentifier).first().isChecked()
}

export const getElementText = async(
    page: Page | Frame,
    elementIdentifier: ElementLocator
): Promise<string | null> => {
    return page.locator(elementIdentifier).first().textContent()
}

export const elementEnabled = async(
    page: Page,
    elementIdentifier: ElementLocator
): Promise<boolean | null> => {
    return page.locator(elementIdentifier).first().isEnabled()
}

export const elementDisplayed = async (
    page: Page | Frame,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    return (await page.locator(elementIdentifier).visible().count()) > 0
}

export const elementDisplayedAtIndex = async (
    page: Page,
    elementIdentifier: ElementLocator,
    index: number
): Promise<boolean> => {
    return page.locator(elementIdentifier).nth(index).isVisible()
}

export const getDisplayedElementCount = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<number> => {
    return page.locator(elementIdentifier).visible().count()
}

export const getTableData = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<string[][]> => {
    return page.$$eval(`${elementIdentifier} tbody tr`, rows =>
        rows.map(row => Array.from(row.querySelectorAll('td')).map(cell => cell.textContent?.trim() ?? ''))
    )
}

export const getElementTextAtIndex = async (
    page:Page,
    elementIdentifier: ElementLocator,
    index: number
): Promise<string | null> => {
    return page.locator(elementIdentifier).nth(index).textContent()
}