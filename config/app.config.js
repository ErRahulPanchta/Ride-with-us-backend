import env from "./env.js";


export default {
port: env.PORT,
env: env.NODE_ENV,
jwtSecret: env.JWT_SECRET,
supabase: {
url: env.SUPABASE_URL,
key: env.SUPABASE_KEY,
},
};