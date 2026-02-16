import { APIRequestContext } from '@playwright/test';
import { HttpClient } from './client';
import type { Pet } from './models/pet';

export class PetService {
    private readonly client: HttpClient;

    constructor(request: APIRequestContext, baseURL: string) {
        this.client = new HttpClient(request, baseURL);
    }

    findByStatus(status: 'available' | 'pending' | 'sold') {
        return this.client.get<Pet[]>(`/pet/findByStatus?status=${status}`);
    }
}