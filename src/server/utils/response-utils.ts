// import { NextRequest, NextResponse } from "next/server";

// import { ZodError } from "zod";

// import HTTPStatusCode from "../constants/http-status-code";
// import { RestError } from "../models/rest-error";

// /**
//  * Respond with a successful JSON response.
//  */
// export function respondSuccess<T>(request: NextRequest, data: T, status: HTTPStatusCode = HTTPStatusCode.OK) {
//   return respondJson(request, data, status);
// }

// /**
//  * Respond with a created (201) status and JSON response.
//  */
// export function respondCreated<T>(request: NextRequest, data: T) {
//   return respondJson(request, data, HTTPStatusCode.CREATED);
// }

// /**
//  * Respond with a deleted (204) status (no content).
//  */
// export function respondDeleted(request: NextRequest) {
//   return respondJson(request, null, HTTPStatusCode.NO_CONTENT);
// }

// /**
//  * Generic function to send JSON responses with logging.
//  */
// function respondJson<T>(request: NextRequest, data: T | null, status: HTTPStatusCode) {
//   const response = NextResponse.json(data, { status });
//   logApiResponse(request, response);
//   return response;
// }

// /**
//  * Handles errors and returns a formatted JSON response.
//  */
// export async function respondError(request: NextRequest, error: unknown) {
//   if (process.env.NODE_ENV === "production") {
//   }
//   // TODO: Retrieve the locale using getLocale() and include it in the error response if needed
//   //   const locale = await getLocale();
//   const { title, message, code } = await parseError(error);
//   const json = serializeError(title, message);

//   return respondJson(request, json, code);
// }

// /**
//  * Parses errors into a standardized response format.
//  */
// export async function parseError(error: unknown) {
//   if (error instanceof RestError) {
//     return { code: error.code, title: error.title, message: error.message };
//   }

//   if (error instanceof ZodError) {
//     return {
//       title: "Invalid Input",
//       message: `Validation failed: ${error.errors.map((item) => `[${item.path.join(", ")}] ${item.message}`).join(", ")}`,
//       code: HTTPStatusCode.UNPROCESSABLE_ENTITY,
//     };
//   }

//   if (error instanceof SyntaxError) {
//     return { code: HTTPStatusCode.BAD_REQUEST, title: "", message: "Invalid JSON" };
//   }

//   return { title: "", message: "Unknown Error", debug: undefined, code: HTTPStatusCode.INTERNAL_SERVER_ERROR };
// }

// /**
//  * Logs API requests and responses for debugging and monitoring.
//  */
// function logApiResponse(req: NextRequest, res: NextResponse) {
//   try {
//     if (process.env.NODE_ENV !== "production") return;

//     const timestampHeader = req.headers.get("timestamp");
//     const responseTime = timestampHeader ? new Date().getTime() - Number(timestampHeader) : undefined;

//     const logData = {
//       responseTime: responseTime ? `${responseTime}ms` : "N/A",
//       response: { code: res.status },
//       request: { method: req.method, url: req.url, headers: Object.fromEntries(req.headers) },
//     };

//     console.info(logData);
//   } catch (err: unknown) {
//     console.error("API Log error", err);
//   }
// }
