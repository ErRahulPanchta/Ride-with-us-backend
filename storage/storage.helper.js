import { supabase } from "../config/db.js";


export async function uploadFile(bucket, path, file) {
if (!bucket) throw new Error("Bucket required");
// file can be a Buffer, ReadableStream or File (from frontend via multer saved buffer)
const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
upsert: true,
});
if (error) throw error;
return data;
}


export function getPublicUrl(bucket, path) {
const { publicURL, error } = supabase.storage.from(bucket).getPublicUrl(path);
if (error) throw error;
return publicURL;
}


export async function deleteFile(bucket, path) {
const { error } = await supabase.storage.from(bucket).remove([path]);
if (error) throw error;
return true;
}