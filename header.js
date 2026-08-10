import { supabase } from './supabase-client.js'

export async function setupHeader() {
    let session = await supabase.auth.getSession()

    if (session.data.session !== null) {
        document.getElementById("account-link").href = "Profile.html"

        let userId = session.data.session.user.id
        let cartCountResult = await supabase.from("cart_items").select("quantity").eq("user_id", userId)

        let totalItems = 0
        cartCountResult.data.forEach(function (item) {
            totalItems = totalItems + item.quantity
        })

        document.getElementById("cart-badge").textContent = totalItems
    } else {
        document.getElementById("cart-badge").textContent = "0"
    }
}