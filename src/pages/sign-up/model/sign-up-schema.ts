import { z } from 'zod';

export const signUpSchema = z
  .object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
