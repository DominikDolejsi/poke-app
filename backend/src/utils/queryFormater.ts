import { ReqQuery, FormatedQuery } from "../types/QueryTypes.js";

export const queryFormater = (query: ReqQuery): FormatedQuery => {
  const formatedQuery: FormatedQuery = {
    limit: Number(query.limit) ? Number(query.limit) : 20,
    offset: Number(query.offset) ? Number(query.offset) : 0,
    deep: query.deep === "true" ? true : false,
    id: query.id === "true" ? true : false,
  };
  return formatedQuery;
};
