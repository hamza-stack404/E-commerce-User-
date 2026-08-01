import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)

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