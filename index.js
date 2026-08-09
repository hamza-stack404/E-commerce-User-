import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
        CardHTML += `<a href="product.html?id=${product.id}" class="group block">
            ${product.image_url 
                ? `<img src="${product.image_url}" alt="${product.name}" class="aspect-[3/4] object-cover rounded-sm mb-4 w-full">` 
                : `<div class="aspect-[3/4] bg-[#EFEAE0] rounded-sm mb-4 flex items-center justify-center text-ink/20 font-serif text-xs">Product photo</div>`
            }
            <p class="text-xs text-ink/40 mb-1">${product.categories ? product.categories.name : ""}</p>
            <p class="font-medium text-sm group-hover:text-rust">${product.name}</p>
            <p class="text-ink/60 text-sm mt-1">$${product.price}</p>
        </a>`;
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