import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)

let User = await supabase.auth.getSession()

if (User.data.session === null) {
    window.location.href = "login.html"
} else {
    let userId = User.data.session.user.id
    let userEmail = User.data.session.user.email


    let profileResult = await supabase.from("profiles").select("*").eq("id", userId)
    let profile = profileResult.data[0]

    document.getElementById("profile-name").textContent = profile.full_name
    document.getElementById("profile-fullname").value = profile.full_name
    document.getElementById("profile-email").value = userEmail
    document.getElementById("profile-phone").value = profile.phone
    document.getElementById("profile-address").value = profile.address


    let ordersResult = await supabase.from("orders")
    .select("*, order_items(count)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })



    let savedResult = await supabase.from("saved_items")
    .select("*, products(id, name, price, image_url)")
    .eq("user_id", userId)

let savedHTML = ""

savedResult.data.forEach(function (saved) {
    savedHTML += `<a href="product.html?id=${saved.products.id}" class="group block">
        ${saved.products.image_url 
            ? `<img src="${saved.products.image_url}" alt="${saved.products.name}" class="aspect-[3/4] object-cover rounded-sm mb-4 w-full">` 
            : `<div class="aspect-[3/4] bg-[#EFEAE0] rounded-sm mb-4 flex items-center justify-center text-ink/20 font-serif text-xs">Product photo</div>`
        }
        <p class="font-medium text-sm group-hover:text-rust">${saved.products.name}</p>
        <p class="text-ink/60 text-sm mt-1">$${saved.products.price}</p>
    </a>`
})

document.getElementById("saved-items-grid").innerHTML = savedHTML


    let ordersHTML = ""

ordersResult.data.forEach(order => {
    ordersHTML += `<div class="py-5 flex items-center justify-between">
        <div>
            <p class="font-medium text-sm">#${order.id}</p>
            <p class="text-xs text-ink/40 mt-1">${order.order_items[0].count} items</p>
        </div>
        <div class="flex items-center gap-4">
            <span class="px-2.5 py-1 rounded-full text-xs font-medium">${order.status}</span>
            <p class="font-medium text-sm w-16 text-right">$${order.total}</p>
        </div>
    </div>`
})

document.getElementById("orders-list").innerHTML = ordersHTML


document.querySelector("#account-details form").addEventListener("submit", async (stop) => {
    stop.preventDefault()

    let newName = document.getElementById("profile-fullname").value
    let newPhone = document.getElementById("profile-phone").value
    let newAddress = document.getElementById("profile-address").value

    await supabase.from("profiles").update({
        full_name: newName,
        phone: newPhone,
        address: newAddress
    }).eq("id", userId)

    alert("Profile updated!")

    
})

document.getElementById("logout-btn").addEventListener("click", async () => {
        await supabase.auth.signOut()
        window.location.href = "login.html"
    })
  
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