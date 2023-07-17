import { z } from "zod";
import { prisma } from "../../../db.js";

export const FormType = z.object({
  name: z.string().min(1),
});

export const FormTypeDB = FormType.extend({
  id: z.number().int(),
  // forms of zodtype pokemonForm
});

export type FormType = z.infer<typeof FormType>;
export type FormTypeDB = z.infer<typeof FormTypeDB>;
export const FormTypes = prisma.formType;