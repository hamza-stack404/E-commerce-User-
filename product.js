import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { renderProductCard } from './utils.js'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)

let param = new URLSearchParams(window.location.search)
let ID = param.get("id")

let categoryParam = param.get("category")


if (!ID) {
    document.getElementById("product-detail-section").classList.add("hidden")
    document.getElementById("shop-all-section").classList.remove("hidden")

    let query = supabase.from("products").select("*, categories(name)")

    if (categoryParam) {
        query = query.eq("category_id", categoryParam)
    }

    let allResult = await query

    let cardsHTML = ""
    allResult.data.forEach(function (product) {
        cardsHTML += renderProductCard(product)
    })

    document.getElementById("shop-all-grid").innerHTML = cardsHTML
} else {
    let result = await supabase.from("products").select("*, categories(name)").eq("id", ID)

     if (result.data[0]) {
        let product = result.data[0]
        document.getElementById("product-title").textContent = product.name
        document.getElementById("product-price").textContent = "$" + product.price
        document.getElementById("product-description").textContent = product.description
        document.getElementById("product-category").textContent = product.categories ? product.categories.name.toUpperCase() : ""
        document.getElementById("add-to-cart-btn").textContent = "Add to Cart — $" + product.price
    

        if (product.image_url) {
            document.getElementById("product-main-image").innerHTML = `<img src="${product.image_url}" alt="${product.name}" class="w-full h-full object-cover rounded-sm">`
        }

        let relatedResult = await supabase.from("products")
            .select("*, categories(name)")
            .eq("category_id", product.category_id)
            .neq("id", ID)
            .limit(4)

             let relatedHTML = ""

        relatedResult.data.forEach(function (relatedProduct) {
            relatedHTML += renderProductCard(relatedProduct)
        })

        document.getElementById("related-products").innerHTML = relatedHTML
    }

        document.getElementById("qty-minus").addEventListener("click", () =>{
            let current = Number(document.getElementById("qty-input").value)
            let NewQty = Math.max(1, current - 1)
            document.getElementById("qty-input").value = NewQty
        })

        document.getElementById("qty-plus").addEventListener("click", () =>{
            let current = Number(document.getElementById("qty-input").value)
            let NewQty = current + 1
            document.getElementById("qty-input").value = NewQty

        })

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

        alert("Item added to cart!")
        location.reload()

        

    })  

    document.getElementById("save-for-later-btn").addEventListener("click", async () => {
    let Savesession = await supabase.auth.getSession()

    if (Savesession.data.session === null) {
        window.location.href = "login.html"
        return

    }

    let userid = Savesession.data.session.user.id

    let existingSaved = await supabase.from("saved_items").select("*").eq("user_id", userid).eq("product_id", ID)


    if (existingSaved.data.length > 0) {
        alert("Already saved!")
    } else {
        await supabase.from("saved_items").insert({
       user_id: userid,
       product_id: ID
   })
   alert("Saved for later!")
    }
})
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



