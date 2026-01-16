import type { Page, Frame } from '@playwright/test';

export async function getMicroAppFrame(page: Page): Promise<Frame> {
    // Wait for iframe to appear and get frame handle
    await page.waitForLoadState('networkidle');
    const iframeElement = await page.locator('#micro-app-iframe').elementHandle();
    if (!iframeElement) throw new Error('Micro app iframe not found!');
    const frame = await iframeElement.contentFrame();
    if (!frame) throw new Error('Failed to get contentFrame from iframe');
    return frame;
}
