import { z } from "zod";

export const loginCredentials = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});

export type LoginCredentials = z.infer<typeof loginCredentials>;