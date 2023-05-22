import messageResponse from "./messageResponse.js";

type errorResponse = {
  stack?: string;
}
& messageResponse;

export default errorResponse;