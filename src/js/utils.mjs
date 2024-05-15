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
export function addDiscountDetails(product) {

  // Select product card price for adding suggested retail price and discount
  const p = document.querySelector(".product-card__price");
  const span = document.createElement("span");

  // Update .product-card_price with discount details
  // if RRP bigger than final price
      span.innerHTML = calculateDiscount(product);
      p.append(span);
}

export function calculateDiscount(product){
  const suggestedRetailPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;

  // Update .product-card_price with discount details
  // if RRP bigger than final price
  if (suggestedRetailPrice > finalPrice) {
      // Calculate discount and round to hundredths
      let discountPercent = ((100 * finalPrice) / suggestedRetailPrice) - 100;
      discountPercent = Math.round(100 * discountPercent) / 100;

      return ` <b>${discountPercent}%</b> RRP: <s>$${suggestedRetailPrice}</s>`;
  } else {
    return "";
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

export function renderWithTemplate(template, parentElement, callback = null) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback();
  }
}

async function loadTemplate(path) {
  const html = await fetch(path);
  const htmlString = await (html.text());
  return htmlString;
}

export async function loadHeaderFooter() {
  const headerTemp = await loadTemplate("../partials/header.html");
  const footerTemp = await loadTemplate("../partials/footer.html");

  const headerElem = document.querySelector("#header");
  const footerElem = document.querySelector("#footer");

  renderWithTemplate(headerTemp, headerElem, updateCartSuperscript);
  renderWithTemplate(footerTemp, footerElem, updateCartSuperscript);
}

document.addEventListener("DOMContentLoaded", function() {
  let banner = document.getElementById("banner");

  // Check if it's the first visit and show the popup
  if (!localStorage.getItem("visited")) {
    banner.style.display = "block";
    localStorage.setItem("visited", true);
  }else{
    return banner.style.display = "none";
  }
});

