import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)

let result = await supabase.from("categories").select("*, products(count)")


if (result.error) {
    console.log(result.error);
    
} else {
    let CardHtml = ""

    result.data.forEach(category => {
        CardHtml += `<a href="product.html" class="group block border border-ink/10 rounded-sm overflow-hidden">
        ${category.image_url 
        ? `<img src="${category.image_url}" class="aspect-[4/3] object-cover w-full">` 
        : `<div class="aspect-[4/3] bg-[#EFEAE0] flex items-center justify-center text-ink/20 font-serif text-xs">Category photo</div>`
        }
        <div class="p-5 flex items-center justify-between">
            <div>
                <p class="font-serif text-lg">${category.name}</p>
                <p class="text-xs text-ink/40 mt-0.5">${category.products[0].count} products</p>
            </div>
            <span class="text-rust opacity-0 group-hover:opacity-100">→</span>
        </div>
    </a>`
    });


    document.getElementById("categories-grid").innerHTML = CardHtml
}

let accountSessionCheck = await supabase.auth.getSession()

if (accountSessionCheck.data.session !== null) {
    document.getElementById("account-link").href = "profile.html"
}