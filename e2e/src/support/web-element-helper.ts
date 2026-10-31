import { Page } from 'playwright'
import { ElementKey, ElementLocator, GlobalConfig } from "../env/global";
import {getCurrentPageId} from "./navigation-behavior";

export const getElementLocator = (
    page: Page,
    elementKey: ElementKey,
    globalConfig: GlobalConfig,

): ElementLocator => {

    const currentPage = getCurrentPageId(page, globalConfig);

    const { pageElementMappings } = globalConfig;

    const elementLocator = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey]

    if (!elementLocator) {
        throw new Error(`No mapping for "${elementKey}" on page "${currentPage}" or in common`)
    }

    return elementLocator
}