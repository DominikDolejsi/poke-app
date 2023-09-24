import MessageResponse from "./messageResponse.js";

type errorResponse = {
  stack?: string;
}
& MessageResponse;

export default errorResponse;