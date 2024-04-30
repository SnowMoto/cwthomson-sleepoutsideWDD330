import { getLocalStorage } from "./utils.mjs";

// Select cart backpack icon element
const backPackIcon = document.querySelector("div.cart");
const span = document.createElement("span");
span.setAttribute("id", "superscript");

// Assign number of items in cart as the supercript number
export default function updateCartSuperscript() {
    const cart = getLocalStorage("so-cart");
    
    if (cart) {
        span.textContent = cart.length;
    } else {
        span.textContent = 0;
    }

    backPackIcon.appendChild(span);
}

// Code to be executed whenever module is imported
updateCartSuperscript();