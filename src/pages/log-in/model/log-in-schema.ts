import { z } from 'zod';

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LogInSchema = z.infer<typeof logInSchema>;
