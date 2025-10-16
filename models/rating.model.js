import { supabase } from "../config/db.js";


export const submitRating = async ({ ride_id, rider_id, driver_id, rating, feedback }) => {
const payload = { ride_id, rider_id, driver_id, rating, feedback };
const { data, error } = await supabase.from('ratings').insert([payload]).select();
if (error) throw error;
return data?.[0];
};