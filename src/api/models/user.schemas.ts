import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    username: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    userStatus: z.number().optional(),
});

export type PetstoreUser = z.infer<typeof UserSchema>;