import { test, expect } from '../../src/api/fixtures';
import { NameCounter } from '../../src/api/utils/nameCounter';
import { ensureDirs, resultsDir } from '../../src/api/utils/paths';
import fs from 'node:fs';
import path from 'node:path';
import { UserSchema } from '../../src/api/models/user.schemas';

test.describe('Exercise 2: Data Handling in API', () => {
  test('Create and retrieve user', async ({ userService }) => {
    ensureDirs();

    const username = `volkan_${Date.now()}`;
    const user = {
      id: Date.now(),
      username,
      firstName: 'Volkan',
      lastName: 'Bakar',
      email: 'volkan@example.com',
      password: 'pass123',
      phone: '+34-000-000-000',
      userStatus: 1
    };

    const createRes = await userService.createUser(user);
    const getUserRes = await userService.getUser(username);
    expect(createRes.message).toBe(getUserRes.id.toString());

    const userParse = UserSchema.safeParse(getUserRes);
    expect(userParse.success).toBe(true);

  });

  test('Petstore: Get sold pets and count same pet names', async ({ petService }) => {
    ensureDirs();

    const soldPets = await petService.findByStatus('sold');
    const soldPetsList = soldPets.map(pet =>
      ({ id: pet.id ?? null, name: pet.name ?? null }));

    const soldPetsOutput = path.join(resultsDir, 'soldPets.json');
    fs.writeFileSync(soldPetsOutput, JSON.stringify(soldPetsList, null, 2), 'utf-8');

    const counter = new NameCounter(soldPetsList);
    const nameCounts = counter.count();

    const nameCountsOutput = path.join(resultsDir, 'nameCounts.json');
    fs.writeFileSync(nameCountsOutput, JSON.stringify(nameCounts, null, 2), 'utf-8');
  });
});

