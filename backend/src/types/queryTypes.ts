export type ReqQuery = {
  limit?: string;
  offset?: string;
  deep?: string;
  id?: string;
};

export type FormatedQuery = {
  limit: number;
  offset: number;
  deep: boolean;
  id: boolean;
};
