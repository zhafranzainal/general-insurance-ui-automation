import type { Frame, Locator } from '@playwright/test';

export function getInputGroup(
    frame: Frame,
    formName: string,
    label: string
) {
    return frame
        .locator(`div.rb-input-group[data-form-name="${formName}"]`)
        .filter({ has: frame.locator(`span.rb-input-group-label-text:text("${label}")`) })
        .first();
}

export async function selectDropdownOption(
    frame: Frame,
    formName: string,
    label: string,
    optionTitle: string
) {
    // Click dropdown wrapper
    await getInputGroup(frame, formName, label).locator('.rb-input-wrapper.rb-tags').click();

    // Wait for visible select popup
    const popup = frame.locator('.rb-popup.rb-select-popup:not(.rb-popup-hide)');
    await popup.waitFor({ state: 'visible' });

    // Click desired option
    const option = popup.locator(`.rb-select-option[title="${optionTitle}"]`);
    await option.waitFor({ state: 'visible' });
    await option.click();
}

export async function fillTextField(
    textFieldlocator: Locator,
    value: string
) {
    const input = textFieldlocator.locator('input.rb-input');
    await input.waitFor({ state: 'visible' });
    await input.fill(value);
}
