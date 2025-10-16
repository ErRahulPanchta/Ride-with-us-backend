import dotenv from "dotenv";
import path from "path";


const envPath = process.env.NODE_ENV === "test"
? path.resolve(process.cwd(), ".env.test")
: path.resolve(process.cwd(), ".env");


dotenv.config({ path: envPath });


const {
PORT = 4000,
NODE_ENV = "development",
SUPABASE_URL,
SUPABASE_KEY,
JWT_SECRET = "change_this_secret",
} = process.env;


export default {
PORT: Number(PORT),
NODE_ENV,
SUPABASE_URL,
SUPABASE_KEY,
JWT_SECRET,
};