import { z } from "zod";

export const ParamsWithId = z.object({
  id: z.string().min(1),
});

export const ParamsWithUuid = z.object({
  id: z.string().uuid(),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
export type ParamsWithUuid = z.infer<typeof ParamsWithUuid>;
