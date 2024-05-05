import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
      
      const cartFooter = document.querySelector("cart-footer");
      //cartFooter.classList.remove("cart_total");
      const total = calculateTotal(cartItems);
      // displayTotal(total);
      document.querySelector(".cart_total").innerText = `Total: $${total.toFixed(2)}`;
    } else {
      // If cart is empty, display a message or perform any other action
      document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

function calculateTotal(cartItems) {
  return cartItems.reduce((total, items) => total + items.FinalPrice,0);
}

// function displayTotal(total) {
//   const costDisplay = document.querySelector(".cart-total");
//   if (costDisplay) {
//     costDisplay.textContent = `$${total.toFixed(2)}`;
//   } else {
//     const newDiv = document.createElement("div");
//   }
// }

renderCartContents();
