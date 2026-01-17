import type { Frame, Locator } from '@playwright/test';

export function getInputGroup(
    frame: Frame,
    formName: string,
    label: string
) {
    return frame
        .locator(`div.rb-input-group[data-form-name="${formName}"]`)
        .filter({ has: frame.getByText(label, { exact: true }) });
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
    frame: Frame,
    formName: string,
    label: string,
    value: string
) {
    const input = getInputGroup(frame, formName, label).locator('input.rb-input');
    await input.waitFor({ state: 'visible' });
    await input.fill(value);
}

export async function clickButtonInCard(
    frame: Frame,
    cardTitle: string,
    buttonName: string
) {
    const card = frame
        .locator('.rb-card')
        .filter({ has: frame.getByText(cardTitle, { exact: true }) });

    await card.waitFor({ state: 'visible' });

    const button = card.getByRole('button', { name: buttonName });
    await button.waitFor({ state: 'visible' });
    await button.click();
}
