import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { renderProductCard } from './utils.js'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)


let result = await supabase.from("products").select("*, categories(name)" ).limit(4)

if (result.error) {
    console.log(result.error);
    
} else {
    let CardHTML = ""

    result.data.forEach(product => {
        CardHTML += renderProductCard(product)
    });


    document.getElementById("featured-products").innerHTML = CardHTML

}

let accountSessionCheck = await supabase.auth.getSession()

if (accountSessionCheck.data.session !== null) {
    document.getElementById("account-link").href = "Profile.html"
}



let badgeSession = await supabase.auth.getSession()

if (badgeSession.data.session !== null) {
    let badgeUserId = badgeSession.data.session.user.id

    let cartCountResult = await supabase.from("cart_items").select("quantity").eq("user_id", badgeUserId)

    let totalItems = 0
    cartCountResult.data.forEach(item => {
        totalItems = totalItems + item.quantity
    })

    document.getElementById("cart-badge").textContent = totalItems
} else {
    document.getElementById("cart-badge").textContent = "0"
}