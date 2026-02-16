import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class HttpClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseURL: string
  ) {}

  async get<T>(path: string): Promise<T> {
    const res = await this.request.get(this.baseURL + path);
    await this.assertOk(res, 'GET', path);
    return (await res.json()) as T;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await this.request.post(this.baseURL + path, { data: body });
    await this.assertOk(res, 'POST', path);
    return (await res.json()) as T;
  }

  private async assertOk(res: APIResponse, method: string, path: string) {
    expect(res.ok(), `${method} ${path} failed: ${res.status()} ${res.statusText()}\n${await res.text()}`)
      .toBeTruthy();
  }
}