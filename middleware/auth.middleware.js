import { verify } from "../utils/jwt.js";
import { fail } from "../utils/response.js";


export default function auth(req, res, next) {
const auth = req.headers.authorization || "";
const parts = auth.split(" ");
if (parts.length !== 2 || parts[0] !== "Bearer") {
return fail(res, "Unauthorized", 401);
}
const token = parts[1];
try {
const payload = verify(token);
req.user = payload;
next();
} catch (err) {
return fail(res, "Invalid or expired token", 401);
}
}