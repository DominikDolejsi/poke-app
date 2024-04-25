import { z } from "zod";

export const paramsId = z.object({
  id: z.string().min(1).transform((value, ctx) => {
    const id = parseInt(value);
    if (isNaN(id)) {
      ctx.addIssue({code: z.ZodIssueCode.invalid_type, expected: "number", received: "nan"});
    }
    return id;
  }),
});

export const paramsIds = z.object({
  ids: z.string().min(1).transform((value, ctx) => {
    const id = parseInt(value);
    if (isNaN(id)) {
      ctx.addIssue({code: z.ZodIssueCode.invalid_type, expected: "number", received: "nan"});
    }
    return id;
  }),
});

export const paramsUuid = z.object({
  id: z.string().uuid(),
});

export type ParamsId = z.infer<typeof paramsId>;
export type ParamsUuid = z.infer<typeof paramsUuid>;