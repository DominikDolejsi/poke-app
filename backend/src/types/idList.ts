import { z } from "zod";

export const IdList = z.object({
  idList: z.array(z.number().int()),
});

export type IdList = z.infer<typeof IdList>;
