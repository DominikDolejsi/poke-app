import { Request } from 'express';
import { AnyZodObject, z } from 'zod';

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
    return await schema.parseAsync(req);
}
