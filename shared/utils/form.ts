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

export async function selectDropdownOptionInTable(
    frame: Frame,
    cardTitle: string,
    label: string,
    optionTitle: string
) {
    const card = frame.locator('.rb-card').filter({
        has: frame.locator('.rb-card-header-title', { hasText: cardTitle })
    });

    const table = card.locator('table.rb-table-content');
    const headers = table.locator('thead th');
    const count = await headers.count();

    let index = -1;
    for (let i = 0; i < count; i++) {
        const text = await headers.nth(i).locator('.rb-table-title').innerText();
        if (text.trim() === label) {
            index = i;
            break;
        }
    }

    if (index === -1) throw new Error(`${label} column not found`);

    const row = table.locator('tbody tr.rb-table-row').first();
    await row.locator('td').nth(index).locator('.rb-input-wrapper.rb-tags').click();

    // Wait for visible select popup
    const popup = frame.locator('.rb-popup.rb-select-popup:not(.rb-popup-hide)');
    await popup.waitFor({ state: 'visible' });

    // Click desired option
    const option = popup.locator(`.rb-select-option[title="${optionTitle}"]`);
    await option.waitFor({ state: 'visible' });
    await option.click();
}
