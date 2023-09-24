import { z } from "zod";
import { prisma } from "../../../db.js";

export const FormType = z.object({
  name: z.string().min(1),
  forms: z.object({ id: z.number().int() }).array().optional(),
});

export const FormTypeDB = FormType.extend({
  id: z.number().int(),
});

export const updateFormType = FormType.partial();

export type FormType = z.infer<typeof FormType>;
export type FormTypeDB = z.infer<typeof FormTypeDB>;
export type updateFormType = z.infer<typeof updateFormType>;
export const FormTypes = prisma.formType;
