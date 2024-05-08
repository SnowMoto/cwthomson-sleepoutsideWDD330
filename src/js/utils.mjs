// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get parameters from query string
export function getParams(params) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get(params);
  
  return productId;
}

// Assign number of items in cart as the supercript number
export function updateCartSuperscript() {
  // Select cart backpack icon element
  const backPackIcon = document.querySelector("div.cart");
  const cart = getLocalStorage("so-cart");
  let cartQty;
  if (cart) {
    cartQty = cart.reduce((sum, item) => sum + item.qty, 0);
  } else {
    cartQty = 0;
  }

  let span;
  if (document.querySelector("#superscript")) {
    span = document.querySelector("#superscript");
    span.textContent = cartQty;
  } else {
    span = document.createElement("span");
    span.setAttribute("id", "superscript");
    span.textContent = cartQty;
    backPackIcon.appendChild(span);
  }
}

// Get discount information details
export async function addDiscountDetails(product) {

  // Select product card price for adding suggested retail price and discount
  const p = document.querySelector(".product-card__price");
  const span = document.createElement("span");

  // Get prices
  const suggestedRetailPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;

  // Update .product-card_price with discount details
  // if RRP bigger than final price
  if (suggestedRetailPrice > finalPrice) {
      // Calculate discount and round to hundredths
      let discountPercent = ((100 * finalPrice) / suggestedRetailPrice) - 100;
      discountPercent = Math.round(100 * discountPercent) / 100;

      span.innerHTML = ` <b>${discountPercent}%</b> RRP: <s>$${suggestedRetailPrice}</s>`;
      p.append(span);
  }
}

// Create list to render lists with a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

