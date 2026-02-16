import { Page } from '@playwright/test';

export class WikipediaPage {
    private readonly selectors = {
        content: '#mw-content-text',
        paragraph: '#mw-content-text p',
        languageDropdown: '#p-lang-btn-checkbox',
        englishOption: 'li.interlanguage-link.interwiki-en[data-code="en"] a',
    };

    constructor(private readonly page: Page) { }

    private async waitForContent() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator(this.selectors.content).waitFor({ state: 'visible', timeout: 10000 });
    }


    async screenshotParagraphByPhrase(
        phrase = 'first completely automated industrial process',
        screenshotPath?: string
    ): Promise<Buffer> {
        await this.waitForContent();

        const paragraphs = this.page.locator(this.selectors.paragraph);
        const count = await paragraphs.count();
        console.log('Total paragraphs found:', count);
        for (let i = 0; i < count; i++) {
            const p = paragraphs.nth(i);
            const text = await p.textContent();
            console.log(`Paragraph ${i}: ${text}`);
        }


        const para = this.page
            .locator(this.selectors.paragraph)
            .filter({ hasText: new RegExp(phrase, 'i') })
            .first();
        const found = await para.waitFor({ state: 'visible', timeout: 3000 }).then(() => true).catch(() => false);


        if (!found) {
            throw new Error(`Could not find phrase "${phrase}" inside any paragraph on Wikipedia`);
        }

        await para.scrollIntoViewIfNeeded();

        return await para.screenshot(
            screenshotPath
                ? { path: screenshotPath }
                : undefined
        );
    }

    async changeLanguageToEnglish() {
        await this.waitForContent();

        const dropdown = this.page.locator(this.selectors.languageDropdown);
        const englishLink = this.page.locator(this.selectors.englishOption);

        if (!(await dropdown.isVisible())) {
            throw new Error('Could not find language dropdown.');
        }
        await this.page.waitForTimeout(1000);
        await dropdown.click();

        await Promise.all([
            this.page.waitForLoadState('domcontentloaded'),
            englishLink.first().click(),
        ]);

        await this.waitForContent();
    }
}