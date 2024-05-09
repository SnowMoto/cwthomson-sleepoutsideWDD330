import { getLocalStorage, renderListWithTemplate, setLocalStorage, updateCartSuperscript } from "./utils.mjs";

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
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
                <p class="cart-card__quantity">qty: <input class="qtyInput" type="number" value="${item.qty}" min=0 data-id="${item.Id}"></p>
                <p class="cart-card__price">$${item.FinalPrice}</p>
                <span data-id="${item.Id}" class="cart-card__remove">x</span>
            </li>`;
  }

export default class ShoppingCart {
    constructor(key, parentElem) {
        this.key = key;
        this.parentElem = parentElem;
    }

    renderCartContents() {
        let cartItems = getLocalStorage(this.key);
      
        if (cartItems && cartItems.length > 0) {
            const parentElem = document.querySelector(this.parentElem);
            renderListWithTemplate(cartItemTemplate, parentElem, cartItems, "afterbegin", true);
      
            // Listen to any updates on qty from the cart
            this.listenToQtyUpdate(cartItems);
      
            // Listen for clicks on remove span element
            this.listenToRemoveSpan();
      
            const total = this.calculateTotal(cartItems);
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

    updateCart() {
        updateCartSuperscript();
        this.renderCartContents();
    }

    listenToQtyUpdate(cartItems) {
        document
        .querySelectorAll(".qtyInput")
        .forEach(input => {
            input.addEventListener("change", (ev) => {
                const productId = ev.target.dataset.id;
                const qty = (ev.target.value) ? parseInt(ev.target.value) : 0;
                const product = cartItems[cartItems.findIndex(item => item.Id === productId)]
                product["qty"] = qty;

                if (product["qty"] === 0)
                cartItems = cartItems.filter(item => item.Id !== productId);

                setLocalStorage(this.key, cartItems);
                this.updateCart();
            });
        });
    }

    listenToRemoveSpan() {
        document
            .querySelectorAll(".cart-card__remove")
            .forEach(span => {
                span.addEventListener("click", (ev) => {
                    // Retrieve current cart items from local storage
                    let cartItems = getLocalStorage(this.key);
                
                    // Filter id to be removed
                    cartItems = cartItems.filter(item => item.Id !== ev.target.dataset.id);
                
                    // Set updated cart items list in local storage
                    setLocalStorage(this.key, cartItems);
                
                    this.updateCart();
                });
            });
    }

    calculateTotal(cartItems) {
        return cartItems.reduce((total, items) => total + (items.FinalPrice * items.qty), 0);
    }
}