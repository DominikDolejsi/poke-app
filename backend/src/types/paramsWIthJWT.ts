import { z } from "zod";

export const ParamsWithJWT = z.object({
  token: z.string().min(1),
});

export type ParamsWithJWT = z.infer<typeof ParamsWithJWT>;
