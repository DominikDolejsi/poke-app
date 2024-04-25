import { z } from "zod";

export const LoginCredentials = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});

export const deleteManyBodySchema = z.object({
  ids: z.number().array(),
  deleteAll: z.boolean().default(false),
})

export type LoginCredentials = z.infer<typeof LoginCredentials>;