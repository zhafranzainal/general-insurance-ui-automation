import type { Frame, Locator } from '@playwright/test';

export async function selectDropdownOption(
    frame: Frame,
    dropdownLocator: Locator,
    optionTitle: string
) {
    // Click dropdown wrapper
    await dropdownLocator.locator('.rb-input-wrapper.rb-tags').click();

    // Wait for visible select popup
    const popup = frame.locator('.rb-popup.rb-select-popup:not(.rb-popup-hide)');
    await popup.waitFor({ state: 'visible' });

    // Click desired option
    const option = popup.locator(`.rb-select-option[title="${optionTitle}"]`);
    await option.waitFor({ state: 'visible' });
    await option.click();
}
