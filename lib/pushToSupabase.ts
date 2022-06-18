import { supabase } from './supabase'

export async function pushToSupabase(object_id: string, file: File, storage: string) {
    const filename = `${object_id}_${Date.now().toString()}.${file.type
        .split('/')
        .pop()}`
    const { data, error } = await supabase.storage
        .from(storage)
        .upload(`public/${filename}`, file)
    console.log({ data, error })
    const image = `${process.env.SUPABASE_URL}/storage/v1/object/public/avatars/public/${filename}`
    return image
}
