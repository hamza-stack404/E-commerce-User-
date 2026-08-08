import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)

let param = new URLSearchParams(window.location.search)
let ID = param.get("id")


if (!ID) {
    document.getElementById("product-detail-section").classList.add("hidden")
    document.getElementById("shop-all-section").classList.remove("hidden")

    let allResult = await supabase.from("products").select("*, categories(name)")

    let cardsHTML = ""
    allResult.data.forEach(function (product) {
        cardsHTML += `<a href="product.html?id=${product.id}" class="group block">
            ${product.image_url 
                ? `<img src="${product.image_url}" class="aspect-[3/4] object-cover rounded-sm mb-4 w-full">` 
                : `<div class="aspect-[3/4] bg-[#EFEAE0] rounded-sm mb-4 flex items-center justify-center text-ink/20 font-serif text-xs">Product photo</div>`
            }
            <p class="text-xs text-ink/40 mb-1">${product.categories ? product.categories.name : ""}</p>
            <p class="font-medium text-sm group-hover:text-rust">${product.name}</p>
            <p class="text-ink/60 text-sm mt-1">$${product.price}</p>
        </a>`
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
            document.getElementById("product-main-image").innerHTML = `<img src="${product.image_url}" class="w-full h-full object-cover rounded-sm">`
        }

        let relatedResult = await supabase.from("products")
            .select("*, categories(name)")
            .eq("category_id", product.category_id)
            .neq("id", ID)
            .limit(4)

             let relatedHTML = ""

        relatedResult.data.forEach(function (relatedProduct) {
            relatedHTML += `<a href="product.html?id=${relatedProduct.id}" class="group block">
                ${relatedProduct.image_url 
                    ? `<img src="${relatedProduct.image_url}" class="aspect-[3/4] object-cover rounded-sm mb-4 w-full">` 
                    : `<div class="aspect-[3/4] bg-[#EFEAE0] rounded-sm mb-4 flex items-center justify-center text-ink/20 font-serif text-xs">Product photo</div>`
                }
                <p class="text-xs text-ink/40 mb-1">${relatedProduct.categories ? relatedProduct.categories.name : ""}</p>
                <p class="font-medium text-sm group-hover:text-rust">${relatedProduct.name}</p>
                <p class="text-ink/60 text-sm mt-1">$${relatedProduct.price}</p>
            </a>`
        })

        document.getElementById("related-products").innerHTML = relatedHTML
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

        alert("Item added to cart!")

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

    })  
}  





