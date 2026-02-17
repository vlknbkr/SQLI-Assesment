import { z } from "zod";

export const PetSchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.enum(['available', 'pending', 'sold']),
});

export type Pet = z.infer<typeof PetSchema>;