import {supabase} from "../config/db.js";

export const createRider = async (data) => {
  const { full_name, email, phone_number, password_hash } = data;
  const { data: rider, error } = await supabase
    .from("users")
    .insert([{ full_name, email, phone_number, password_hash, user_type: "rider" }])
    .select()
    .single();
  if (error) throw error;
  return rider;
};

export const getRiderByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("user_type", "rider")
    .single();
  if (error) throw error;
  return data;
};

export const getRiderById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .eq("user_type", "rider")
    .single();
  if (error) throw error;
  return data;
};
