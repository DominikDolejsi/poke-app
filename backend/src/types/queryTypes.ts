import { z } from 'zod';

const LIMIT_DEFAULT = 20;
const OFFSET_DEFAULT = 0;

// To do - differentiate into few more query types
export const reqQuerySchema = z.object({
  limit: z.string().min(1).transform((value) => parseInt(value, 10) || LIMIT_DEFAULT),
  offset: z.string().min(1).transform((value) => parseInt(value, 10) || OFFSET_DEFAULT),
  deep: z.string().min(1).transform((value) => value === 'true'),
  id: z.string().min(1).transform((value) => value === "true"),
});


export type ReqQuery = z.infer<typeof reqQuerySchema>;