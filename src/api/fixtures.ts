import { test as base } from '@playwright/test';
import { UserService } from './user.service';
import { PetService } from './pet.service';

type ApiFixtures = {
    userService: UserService;
    petService: PetService;
};

export const test = base.extend<ApiFixtures>({
    userService: async ({ request }, use) => {
        await use(new UserService(request));
    },
    petService: async ({ request }, use) => {
        await use(new PetService(request));
    },
});

export { expect } from '@playwright/test';
