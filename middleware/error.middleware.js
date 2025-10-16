import { log } from "../utils/logger.js";
import { fail } from "../utils/response.js";


export default function errorMiddleware(err, req, res, next) {
log.error(err.stack || err.message || err);
const status = err.status || 500;
const message = err.message || "Internal Server Error";
return fail(res, message, status);
}