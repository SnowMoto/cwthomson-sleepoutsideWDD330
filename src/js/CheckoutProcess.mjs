import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process.
    return items.map(item => { 
        return { id: item.Id, name: item.Name, price: item.ListPrice, quantity: item.qty };
    });
  }

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
    convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

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
        this.shipping = this.shipping.toFixed(2);
        this.tax = (this.itemTotal *= .06).toFixed(2);

        // display the totals.
        this.orderTotal = (this.tax + this.shipping + this.itemTotal).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const shippingEstimate = document.createElement("p");
        shippingEstimate.innerHTML = `Shipping Estimate: <s>$${this.shipping}</s>`;

        const tax = document.createElement("p");
        tax.innerHTML = `Tax: <s>$${this.tax}</s>`;

        const orderTotal = document.createElement("p");
        orderTotal.innerHTML = `Order Total: <s>$${this.orderTotal}</s>`;
    }

    async checkout(form) {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        let data = {};
        formDataToJSON(form).forEach((value, key) => data[key] = value);

        data["items"] = packageItems(this.list);
        data["orderDate"] = new Date();
        data["orderTotal"] = this.orderTotal;
        data["shipping"] = this.shipping;
        data["tax"] = this.tax;

        // call the checkout method in our ExternalServices module and send it our data object.
        const externalServices = new ExternalServices();
        externalServices.checkout(data);
    }
}