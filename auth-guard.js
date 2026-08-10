import { supabase } from './supabase-client.js'

export async function requireAuth() {
    let result = await supabase.auth.getSession()

    if (result.data.session === null) {
        window.location.href = "login.html"
        return null
    }

    return result.data.session.user
}   