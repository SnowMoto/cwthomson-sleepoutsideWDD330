import { getLocalStorage, setLocalStorage, updateCartSuperscript } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");

      // Add event listener to all "remove" span elements 
      document
        .querySelectorAll(".cart-card__remove")
        .forEach(span => {
          span.addEventListener("click", removeEventHandler);
        });

      const total = calculateTotal(cartItems);
      document.querySelector(".cart_total").innerHTML = `<b>Total:</b> $${total.toFixed(2)}`;

      // Remove "hide" class from footer to display html
      document.querySelector(".cart-footer").classList.remove("hide");
    } else {
      // If cart is empty, display a message
      document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
      // Add "hide" class from footer to hide html
      document.querySelector(".cart-footer").classList.add("hide");
    }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span data-id="${item.Id}" class="cart-card__remove">🗙</span>
</li>`;
  return newItem;
}

function calculateTotal(cartItems) {
  return cartItems.reduce((total, items) => total + items.FinalPrice,0);
}

function removeFromCart(id) {
  // Retrieve current cart items from local storage
  let cartItems = getLocalStorage("so-cart");

  // Find specified product to remove
  const product = cartItems.filter(item => item.Id === id);
  // Get only the product object from the array (or the first one, in case there's more than one)
  const itemToRemove = product[0]; 

  // Delete replaces the property for null, filter the array removing it
  delete cartItems[cartItems.indexOf(itemToRemove)];
  cartItems = cartItems.filter(item => item !== null);

  // Set updated cart items list in local storage
  setLocalStorage("so-cart", cartItems);
}

function removeEventHandler(e) {
  removeFromCart(e.target.dataset.id);
  updateCartSuperscript();
  renderCartContents();
}

renderCartContents();