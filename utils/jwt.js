import jwt from "jsonwebtoken";
import appConfig from "../config/app.config.js";


export const sign = (payload, expiresIn = "7d") =>
jwt.sign(payload, appConfig.jwtSecret, { expiresIn });


export const verify = (token) => jwt.verify(token, appConfig.jwtSecret);