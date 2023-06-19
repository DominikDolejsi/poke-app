import { z } from "zod";

export const accessToken = z.object({
  accessToken: z.string().min(1),
});

export type accessToken = z.infer<typeof accessToken>;
