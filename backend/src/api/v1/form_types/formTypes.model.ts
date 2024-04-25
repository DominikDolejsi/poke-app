import { z } from "zod";
import { prisma } from "../../../db.js";

export const formType = z.object({
  name: z.string().min(1),
  forms: z.object({ id: z.number().int() }).array().optional(),
});

export const formTypeDB = formType.extend({
  id: z.number().int(),
});

export const updateFormType = formType.partial();

export type FormType = z.infer<typeof formType>;
export type FormTypeDB = z.infer<typeof formTypeDB>;
export type UpdateFormType = z.infer<typeof updateFormType>;
export const FormTypes = prisma.formType;
