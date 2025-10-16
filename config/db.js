import { createClient } from "@supabase/supabase-js";
import appConfig from "./app.config.js";


if (!appConfig.supabase.url || !appConfig.supabase.key) {
console.warn("Supabase URL/KEY not configured. Some features will fail.");
}


export const supabase = createClient(
appConfig.supabase.url || "",
appConfig.supabase.key || ""
);