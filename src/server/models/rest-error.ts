import HTTPStatusCode from "../constants/http-status-code";

export class RestError extends Error {
  constructor(
    readonly code: HTTPStatusCode,
    readonly title: string,
    readonly message: string
  ) {
    super(message);
  }

  // ✅ Standard errors as static methods
  static unauthorized(): RestError {
    return new RestError(HTTPStatusCode.UNAUTHORIZED, "Unauthorized", "Access is denied.");
  }

  static notFound(): RestError {
    return new RestError(HTTPStatusCode.NOT_FOUND, "Not Found", "The requested resource was not found.");
  }

  static internalServerError(): RestError {
    return new RestError(
      HTTPStatusCode.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      "An unexpected error occurred."
    );
  }
}

// ✅ Dynamic errors as factory functions
export function restErrorNotFound(resource: string): RestError {
  return new RestError(HTTPStatusCode.NOT_FOUND, "Not Found", `The requested ${resource} was not found.`);
}

export function restErrorInvalidField(field: string): RestError {
  return new RestError(HTTPStatusCode.UNPROCESSABLE_ENTITY, "Invalid Input", `The field '${field}' is invalid.`);
}

export function restErrorForbidden(operation: string): RestError {
  return new RestError(HTTPStatusCode.FORBIDDEN, "Forbidden", `You are not allowed to ${operation}.`);
}
