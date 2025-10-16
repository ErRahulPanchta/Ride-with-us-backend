import { supabase } from "../config/db.js";

export const createVehicle = async (vehicleData) => {
  const { data, error } = await supabase.from("vehicles").insert(vehicleData).select().single();
  if (error) throw error;
  return data;
};

export const getVehiclesByDriver = async (driverId) => {
  const { data, error } = await supabase.from("vehicles").select("*").eq("driver_id", driverId);
  if (error) throw error;
  return data;
};
