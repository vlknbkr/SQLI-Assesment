import { APIRequestContext } from '@playwright/test';
import { HttpClient } from './client';
import type { Pet } from './models/pets.schemas';

export class PetService {
    private readonly client: HttpClient;

    constructor(request: APIRequestContext) {
        this.client = new HttpClient(request);
    }

    findByStatus(status: 'available' | 'pending' | 'sold') {
        return this.client.get<Pet[]>(`pet/findByStatus?status=${status}`);
    }
}