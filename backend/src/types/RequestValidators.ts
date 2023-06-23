import { AnyZodObject } from "zod";

type RequestValidators = {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
  cookie?: AnyZodObject;
};

export default RequestValidators;
