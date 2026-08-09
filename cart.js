import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)


let User = await supabase.auth.getSession()


if (User.data.session === null) {
    window.location.href = "login.html"
} else {
let userID = User.data.session.user.id

  
  let result = await supabase.from("cart_items").select("* ,products(name, price, image_url)").eq("user_id", userID)

let subtotal = 0
let itemHtml = ""

result.data.forEach(item => {
  
  subtotal = subtotal + (item.products.price * item.quantity)

   itemHtml += `<div class="py-6 flex gap-5">
    <div class="w-24 h-28 bg-[#EFEAE0] rounded-sm shrink-0 flex items-center justify-center text-ink/20 font-serif text-[10px]">Photo</div>
    <div class="flex-1 flex flex-col justify-between">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="font-serif text-lg">${item.products.name}</p>
            </div>
            <p class="font-medium">$${item.products.price}</p>
        </div>
        <div class="flex items-center justify-between">
            <p class="text-sm text-ink/60">Qty: ${item.quantity}</p>
            <button onclick="removeFromCart('${item.id}')" class="text-xs text-ink/40 hover:text-rust underline underline-offset-2">Remove</button>
        </div>
    </div>
</div>`

});

let tax = subtotal * 0.08
let total = subtotal + tax

document.getElementById("cart-subtotal").textContent = "$" + subtotal.toFixed(2)
document.getElementById("cart-total").textContent = "$" + subtotal.toFixed(2)
document.getElementById("cart-tax").textContent = "$" + tax.toFixed(2)

document.getElementById("cart-items").innerHTML = itemHtml


window.removeFromCart = async (id) =>{
  let sure = confirm("Are you sure to remove this from your cart?")

  if (sure) {
      let del = await supabase.from("cart_items").delete().eq("id", id)

      if (del.error) {
          console.log(del.error);
          
      } else {
        location.reload()
      }
  }
}
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

