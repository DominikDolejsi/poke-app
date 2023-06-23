import { z } from "zod";

export const JwtToken = z.object({
  jwt: z.string().min(1),
});

export type JwtToken = z.infer<typeof JwtToken>;
