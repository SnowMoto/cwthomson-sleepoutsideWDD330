import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        this.itemTotal = this.list.reduce((total, items) => total + (items.FinalPrice * items.qty), 0);
        const p = document.createElement("p");
        p.innerHTML = `Subtotal: <s>${this.itemTotal.toFixed(2)}</s>`;
        this.outputSelector.append(p);
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        if (this.list.length > 1) {
            this.shipping += 10;
            this.shipping += (this.list.length - 1) * 2;  
        } else if (!this.list.length < 0) {
            this.shipping += 10;
        }

        this.tax = this.itemTotal *= .06;

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const shippingEstimate = document.createElement("p");
        shippingEstimate.innerHTML = `Shipping Estimate: <s>$${this.shipping.toFixed(2)}</s>`;

        const tax = document.createElement("p");
        tax.innerHTML = `Tax: <s>$${this.tax.toFixed(2)}</s>`;

        const orderTotal = document.createElement("p");
        orderTotal.innerHTML = `Order Total: <s>$${(this.tax + this.shipping + this.itemTotal).toFixed(2)}</s>`;
    }
}