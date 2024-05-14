import { writable } from "svelte/store";

export const cart = writable([]);

export function addToCart(product:any) {
  cart.update((items) => {
    const existingItemIndex = items.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      items[existingItemIndex].quantity++;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(items));
    return items;
  });
}

export function removeFromCart(productId: any) {
    cart.update(items => {
        const updatedCart = items.map(item => {
            if (item.id === productId) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return null;
                }
            }
            return item;
        }).filter(Boolean);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
    });
}


export function clearCart() {
  cart.set([]);
  localStorage.removeItem("cart");
}
