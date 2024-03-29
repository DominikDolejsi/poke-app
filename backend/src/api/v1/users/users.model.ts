import { z } from "zod";
import { prisma } from "../../../db.js";

export const User = z.object({
  name: z.string().min(4).max(20),
  password: z.string().min(8),
  email: z.string().email(),
  emailToken: z.nullable(z.string()).optional(),
});

export const UserDB = User.extend({
  id: z.string().uuid(),
  admin: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  refreshToken: z.nullable(z.string()),
  lists: z.object({}).array().nullable().optional(),
});

export const updateUser = User.partial();


export type User = z.infer<typeof User>;
export type UserDB = z.infer<typeof UserDB>;
export type updateUser = z.infer<typeof updateUser>;
export const Users = prisma.user;
