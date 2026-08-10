import { supabase } from './supabase-client.js'
import { renderProductCard } from './utils.js'
import { setupHeader } from './header.js'


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

await setupHeader()

let pillsResult = await supabase.from("categories").select("*")

let pillsHTML = ""

pillsResult.data.forEach(function (category) {
    pillsHTML += `<a href="product.html?category=${category.id}" class="shrink-0 px-6 py-3 border border-ink/15 rounded-full text-sm font-medium hover:border-rust hover:text-rust">${category.name}</a>`
})

document.getElementById("category-pills").innerHTML = pillsHTML


document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault()
    document.getElementById("newsletter-form").innerHTML = `<p class="text-sm text-forest">Thanks for subscribing! Keep an eye on your inbox.</p>`

})