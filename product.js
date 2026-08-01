import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)

let param = new URLSearchParams(window.location.search)
let ID = param.get("id")


let result = await supabase.from("products").select("*, categories(name)").eq("id", ID)

if (result.data[0]) {
    let product = result.data[0]
    document.getElementById("product-title").textContent = product.name
    document.getElementById("product-price").textContent = "$" + product.price
    document.getElementById("product-description").textContent = product.description
   document.getElementById("product-category").textContent = product.categories ? product.categories.name.toUpperCase() : ""
    document.getElementById("add-to-cart-btn").textContent = "Add to Cart — $" + product.price
    

    if (product.image_url) {
        document.getElementById("product-main-image").innerHTML = `<img src="${product.image_url}" class="w-full h-full object-cover rounded-sm">`
    } else {
        
    }

}


document.getElementById("add-to-cart-btn").addEventListener('click', async () => {
    let Quantity = Number(document.getElementById("qty-input").value)


    let User = await supabase.auth.getSession()

    if (User.data.session === null) {
        window.location.href = "login.html"
        return
    }

    let userid = User.data.session.user.id

    let existing = await supabase.from("cart_items").select("*").eq("user_id", userid).eq("product_id", ID)

    if (existing.data.length > 0) {
        let newQty = existing.data[0].quantity + Quantity
        await supabase.from("cart_items").update({ quantity: newQty }).eq("id", existing.data[0].id)

    } else {
         await supabase.from("cart_items").insert({
            user_id: userid,
            product_id: ID,
            quantity: Quantity
        })
    }
})


