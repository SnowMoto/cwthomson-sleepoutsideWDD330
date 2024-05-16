import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, setLocalStorage, getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const oldBreadcrumbsPath = getLocalStorage("breadcrumbsPath");
function bread() {
    if (oldBreadcrumbsPath && oldBreadcrumbsPath.includes("Checkout")) {
        const breadcrumbsPath = oldBreadcrumbsPath;
        document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
        setLocalStorage("breadcrumbsPath", breadcrumbsPath);
    }
    else {
        const breadcrumbsPath = `${oldBreadcrumbsPath} / <li><a href="${window.location.href}">Checkout</a></li>`;
        document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
        setLocalStorage("breadcrumbsPath", breadcrumbsPath);
    }
}
bread();

// Process the checkout
const checkout = new CheckoutProcess("so-cart", document.querySelector("#order-details"));
checkout.init();

// Get form document from page
const form = document.querySelector("form");

// Once user supplies a zip code, calculate both shipping and tax, and display it
form.zip.addEventListener("blur", (ev) => {
    // Check if there is at least a number (not validating)
    if (ev.target.value.length > 0) {
        checkout.calculateOrdertotal();
    }
});