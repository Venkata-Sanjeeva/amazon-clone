import { calculateCartQuantity, cart } from "../../data/cart.js";

export function updateCartQuantity(className, other) {

    const cartQuantity = calculateCartQuantity();
    document.querySelector(`.${className}`)
        .innerHTML = `${cartQuantity} ${other}`;
}