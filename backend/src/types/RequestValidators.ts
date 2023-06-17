import { AnyZodObject } from "zod";

type RequestValidators = {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
};

export default RequestValidators;