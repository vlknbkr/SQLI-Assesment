import { APIRequestContext } from '@playwright/test';
import { HttpClient } from './client';
import type { PetstoreUser } from './models/user.schemas';

export class UserService {
    private readonly client: HttpClient;

    constructor(request: APIRequestContext) {
        this.client = new HttpClient(request);
    }

    createUser(user: PetstoreUser) {
        return this.client.post<{ code: number; type: string; message: string }>('user', user);
    }

    getUser(username: string) {
        return this.client.get<PetstoreUser>(`user/${encodeURIComponent(username)}`);
    }
}