import MessageResponse from "./MessageResponse.js";

type ErrorResponse = {
  stack?: string;
}
& MessageResponse;

export default ErrorResponse;