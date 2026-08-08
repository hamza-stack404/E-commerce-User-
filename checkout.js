import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)

let SessionCheck = await supabase.auth.getSession()

if (SessionCheck.data.session !== null) {
    let CheckoutUser = SessionCheck.data.session.user.id

    let liveCart = await supabase.from("cart_items").select("*, products(name , price, image_url)").eq("user_id", CheckoutUser)

    let livetotal = 0
    let itemhtml = ""

    liveCart.data.forEach(item => {
        livetotal = livetotal + (item.products.price * item.quantity)

        itemhtml += `<div class="flex gap-4">
            <div class="w-14 h-16 bg-[#EFEAE0] rounded-sm shrink-0 flex items-center justify-center text-ink/20 font-serif text-[9px]">Photo</div>
            <div class="flex-1 flex justify-between items-start">
                <div>
                    <p class="text-sm font-medium">${item.products.name}</p>
                    <p class="text-xs text-ink/40">Qty ${item.quantity}</p>
                </div>
                <p class="text-sm">$${item.products.price}</p>
            </div>
        </div>` 
        
    });

     document.getElementById("checkout-items").innerHTML = itemhtml
    document.getElementById("checkout-subtotal").textContent = "$" + livetotal.toFixed(2)
    document.getElementById("checkout-total").textContent = "$" + livetotal.toFixed(2)
    document.getElementById("checkout-submit-btn").textContent = "Place Order — $" + livetotal.toFixed(2)



}



let Form = document.getElementById("checkout-form")
Form.addEventListener("submit", async (stop) => {
    stop.preventDefault()

    let User = await supabase.auth.getSession()

    if (User.data.session === null) {
        window.location.href = "login.html"
        return
    } else {
        
        let userID = User.data.session.user.id

        let cartResult = await supabase.from("cart_items").select("*, products(name, price)").eq("user_id", userID)

        let subtotal = 0

        cartResult.data.forEach(item => {
            subtotal = subtotal + (item.products.price * item.quantity)
        });



        let order = await supabase.from("orders").insert({
            user_id: userID,
            status: "pending",
            total: subtotal
        }).select()


        let new_order = order.data[0].id

        let order_item = []

        cartResult.data.forEach(item => {
            order_item.push({
                order_id: new_order,
                product_id: item.product_id,
                quantity: item.quantity,
                price_at_purchase: item.products.price
            })
        });

        let items = await supabase.from("order_items").insert(order_item) 

        let delete_cart = await supabase.from("cart_items").delete().eq("user_id", userID)

        window.location.href = "Profile.html"

    }
})