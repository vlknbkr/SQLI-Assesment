import { test, expect } from '@playwright/test';
import { GooglePage } from '../../src/ui/pages/google.page';
import { WikipediaPage } from '../../src/ui/pages/wikipedia.page';
import { ensureDirs, screenshotsDir } from '../../src/api/utils/paths';
import path from 'node:path';

test.describe('Exercise 1: Google -> Wikipedia -> phrase paragraph screenshot', () => {
    test('Exercise 1: Google -> Wikipedia -> phrase paragraph screenshot', async ({ page }) => {
        ensureDirs();

        const google = new GooglePage(page);
        await google.goto();
        await google.search('Automatización');

        await google.clickWikipediaResult();

        const wiki = new WikipediaPage(page);

        if (!page.url().includes('en.wikipedia.org')) {
            await wiki.changeLanguageToEnglish();
        }

        expect(page.url()).toContain('en.wikipedia.org');

        const screenshotPath = path.join(
            screenshotsDir,
            'wikipedia-search-result.png'
        );

        await wiki.screenshotParagraphByPhrase(
            'first completely automated industrial process',
            screenshotPath
        );
    });
});