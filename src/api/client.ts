import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class HttpClient {
  constructor(private readonly request: APIRequestContext) { }

  async get<T>(path: string): Promise<T> {
    const response = await this.request.get(path);
    await this.assertOk(response, 'GET', path);
    return (await response.json()) as T;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await this.request.post(path, { data: body });
    await this.assertOk(response, 'POST', path);
    return (await response.json()) as T;
  }

  private async assertOk(response: APIResponse, method: string, path: string) {
    expect(response.ok(), `${method} ${path} failed: ${response.status()} ${response.statusText()}\n${await response.text()}`)
      .toBeTruthy();
  }
}