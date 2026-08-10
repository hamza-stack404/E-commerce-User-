export function renderProductCard(product) {
    return `<a href="product.html?id=${product.id}" class="group block">
        ${product.image_url 
            ? `<img src="${product.image_url}" alt="${product.name}" loading="lazy" class="aspect-[3/4] object-cover rounded-sm mb-4 w-full">` 
            : `<div class="aspect-[3/4] bg-[#EFEAE0] rounded-sm mb-4 flex items-center justify-center text-ink/20 font-serif text-xs">Product photo</div>`
        }
        <p class="text-xs text-ink/40 mb-1">${product.categories ? product.categories.name : ""}</p>
        <p class="font-medium text-sm group-hover:text-rust">${product.name}</p>
        <p class="text-ink/60 text-sm mt-1">$${product.price}</p>
    </a>`
}