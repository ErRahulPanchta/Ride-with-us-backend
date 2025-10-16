import { supabase } from "../config/db.js";

export const createDriver = async (data) => {
  const { full_name, email, phone_number, password_hash, license_number } = data;

  const { data: user, error: userError } = await supabase
    .from("users")
    .insert([{ full_name, email, phone_number, password_hash, user_type: "driver" }])
    .select()
    .single();
  if (userError) throw userError;

  const { data: driver, error: driverError } = await supabase
    .from("drivers")
    .insert([{ user_id: user.id, license_number }])
    .select()
    .single();
  if (driverError) throw driverError;

  return { user, driver };
};

export const getDriverByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*, drivers(*)")
    .eq("email", email)
    .single();
  if (error) throw error;
  return data;
};

export const getDriverByUserId = async (userId) => {
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) throw error;
  return data;
};

export const updateDriverStatus = async (driverId, status) => {
  const { data, error } = await supabase
    .from("drivers")
    .update({ status })
    .eq("id", driverId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const upsertLocation = async (driverId, latitude, longitude) => {
  const { data, error } = await supabase
    .from("locations")
    .upsert(
      { driver_id: driverId, latitude, longitude, updated_at: new Date() },
      { onConflict: "driver_id" }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
};
