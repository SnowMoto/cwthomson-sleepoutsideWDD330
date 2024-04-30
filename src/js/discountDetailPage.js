import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

async function addDiscountDetails(productId) {
    const product = await dataSource.findProductById(productId);

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

const productId = document.querySelector('#addToCart').getAttribute("data-id");
addDiscountDetails(productId);