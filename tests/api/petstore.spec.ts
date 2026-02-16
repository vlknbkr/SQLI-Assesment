import { test, expect } from '@playwright/test';
import { UserService } from '../../src/api/user.service';
import { PetService } from '../../src/api/pet.service';
import { NameCounter } from '../../src/api/utils/nameCounter';
import { ensureDirs, resultsDir } from '../../src/api/utils/paths';
import fs from 'node:fs';
import path from 'node:path';

test('Exercise 2: Petstore user + sold pets extraction + name counts', async ({ request }) => {
  ensureDirs();

  // Public Swagger Petstore base (common default)
  const baseURL = 'https://petstore.swagger.io/v2';

  const userSvc = new UserService(request, baseURL);
  const petSvc = new PetService(request, baseURL);

  // 1) Create user
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

  const createRes = await userSvc.createUser(user);
  expect(createRes).toHaveProperty('message');

  // 2) Retrieve created user
  const created = await userSvc.getUser(username);
  expect(created.username).toBe(username);

  // 3-4) Get sold pets
  const soldPets = await petSvc.findByStatus('sold');

  // 5) Output tuple list of {id, name}
  const tuples = soldPets.map(p => ({ id: p.id ?? null, name: p.name ?? null }));

  const outputPath = path.join(resultsDir, 'soldPets.json');
  fs.writeFileSync(outputPath, JSON.stringify(tuples, null, 2), 'utf-8');

  console.log(`Saved sold pets tuples to: ${outputPath}`);
  console.log(`Sample tuples (first 5):`, tuples.slice(0, 5));

  // 6) Count same pet names
  const counter = new NameCounter();
  const nameCounts = counter.count(soldPets.map(p => p.name));

  console.log('Name counts (sample):', Object.entries(nameCounts).slice(0, 10));

  // Just a sanity check: should produce an object
  expect(typeof nameCounts).toBe('object');
});