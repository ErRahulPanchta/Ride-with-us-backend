import { supabase } from "../config/db.js";


export const createPayment = async ({ ride_id, rider_id, amount, payment_method, transaction_id, payment_status='pending' }) => {
const payload = { ride_id, rider_id, amount, payment_method, payment_status, transaction_id };
const { data, error } = await supabase.from('payments').insert([payload]).select();
if (error) throw error;
return data?.[0];
};


export const getPaymentByRide = async (ride_id) => {
const { data, error } = await supabase.from('payments').select('*').eq('ride_id', ride_id).maybeSingle();
if (error) throw error;
return data;
};