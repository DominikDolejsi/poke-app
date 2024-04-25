import { z } from "zod";
import { prisma } from "../../../db.js";
import { genericDBModel } from "../../../types/genericDBTypes.js";

export const user = z.object({
  name: z.string().min(4).max(20),
  password: z.string().min(8),
  email: z.string().email(),
  emailToken: z.nullable(z.string()).optional(),
});

export const userDB = user.extend({
  id: z.string().uuid(),
  admin: z.boolean(),
  refreshToken: z.nullable(z.string()),
  lists: genericDBModel.array().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
});

export const updateUser = user.partial();

export type User = z.infer<typeof user>;
export type UserDB = z.infer<typeof userDB>;
export type UpdateUser = z.infer<typeof updateUser>;
export const Users = prisma.user;
