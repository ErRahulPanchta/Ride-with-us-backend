import { supabase } from "../config/db.js";

export const createRide = async (ride) => {
    const { data, error } = await supabase.from("rides").insert([ride]).select();
    if (error) throw error;
    return data?.[0];
};

export const getRideById = async (id) => {
    const { data, error } = await supabase.from("rides").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data;
};

export const updateRide = async (id, updates) => {
    const { data, error } = await supabase.from("rides").update(updates).eq("id", id).select();
    if (error) throw error;
    return data?.[0];
};
