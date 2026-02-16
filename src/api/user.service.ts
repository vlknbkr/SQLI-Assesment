import { APIRequestContext } from '@playwright/test';
import { HttpClient } from './client';
import type { PetstoreUser } from './models/user';

export class UserService {
    private readonly client: HttpClient;

    constructor(request: APIRequestContext, baseURL: string) {
        this.client = new HttpClient(request, baseURL);
    }

    createUser(user: PetstoreUser) {
        // Swagger petstore expects POST /user
        return this.client.post<{ code: number; type: string; message: string }>('/user', user);
    }

    getUser(username: string) {
        return this.client.get<PetstoreUser>(`/user/${encodeURIComponent(username)}`);
    }
}