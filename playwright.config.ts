import { defineConfig } from '@playwright/test';

export default defineConfig({
    workers: 1,
    testDir: './modules',
    use: {
        baseURL: process.env.BASE_URL,
        headless: false, // start with visible browser
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        viewport: null,
        launchOptions: {
            args: ['--start-maximized'],
        },
    },
});
