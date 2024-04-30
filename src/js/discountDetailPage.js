import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Get id from attribute data-id in button
const id = document.querySelector('#addToCart').getAttribute("data-id");
const product = await dataSource.findProductById(id);

// Select product card price for adding suggested retail price and discount
const p = document.querySelector(".product-card__price");

const span = document.createElement("span");

// Calculate discount
const suggestedRetailPrice = product.SuggestedRetailPrice;

const finalPrice = product.FinalPrice;

if (suggestedRetailPrice > finalPrice) {
    let discountPercent = ((100 * finalPrice) / suggestedRetailPrice) - 100;
    // Round discountPercent to hundredths
    discountPercent = Math.round(100 * discountPercent) / 100;

    span.innerHTML = ` <b>${discountPercent}%</b> RRP: <s>$${suggestedRetailPrice}</s>`;
    p.append(span);
}

