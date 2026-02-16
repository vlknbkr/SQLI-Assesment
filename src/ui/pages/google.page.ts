import { Page } from '@playwright/test';

export class GooglePage {
  private readonly page: Page;

  private readonly selectors = {
    searchBox: 'textarea[name="q"], input[name="q"]',
    wikipediaLink: 'a[href*="wikipedia.org"]',
    acceptCookies:
      'button:has-text("Accept all"), button:has-text("Aceptar todo"), button:has-text("Kabul et"), button:has-text("I agree"), div[role="dialog"] button:has-text("Accept all")',
    nextBtn: 'a#pnnext, a[aria-label="Next"], a[aria-label="Sonraki"]',
    resultsContainer: '#search',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    await this.dismissConsent();
  }

  async dismissConsent() {
    const acceptBtn = this.page.locator(this.selectors.acceptCookies).first();
    if (await acceptBtn.count() > 0) {
      await acceptBtn.click({ timeout: 5000 }).catch(() => {});
    }
  }

  async search(term: string) {
    const searchBox = this.page.locator(this.selectors.searchBox);
    await searchBox.fill(term);
    await searchBox.press('Enter');

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator(this.selectors.resultsContainer).waitFor({ state: 'visible'});
  }

  async clickWikipediaResult() {
    if (await this.tryClickFirstWikipediaLinkOnCurrentPage()) return;
    await this.clickNextPage();

    if (await this.tryClickFirstWikipediaLinkOnCurrentPage()) return;

    throw new Error('Could not find Wikipedia link on the first two pages.');
  }

  private async tryClickFirstWikipediaLinkOnCurrentPage(): Promise<boolean> {
    const wikiLink = this.page.locator(this.selectors.wikipediaLink);

    const found = await wikiLink.first().waitFor({ state: 'visible', timeout: 3000 })
      .then(() => true)
      .catch(() => false);

    if (!found) return false;

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      wikiLink.first().click(),
    ]);

    return true;
  }

  private async clickNextPage() {
    const next = this.page.locator(this.selectors.nextBtn).first();

    if (await next.count() === 0) {
      throw new Error('Next button not found on Google results page.');
    }

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      next.click(),
    ]);

    await this.page.locator(this.selectors.resultsContainer).waitFor({ state: 'visible' });
  }
}