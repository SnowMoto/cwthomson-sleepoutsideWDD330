import { setLocalStorage, getLocalStorage, updateCartSuperscript, addDiscountDetails } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // Use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product);

        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        this.renderProductDetails();

        // Display discount Information
        addDiscountDetails(this.product);

        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
    }

    addToCart () {
        let cartItems = [];
        const cart = getLocalStorage("so-cart");
        if (cart !== null) {
            cart.forEach((object) => cartItems.push(object));
        }
        // Push the "product" property of the instance of the class
        cartItems.push(this.product); 
        setLocalStorage("so-cart", cartItems);
        updateCartSuperscript();
    }

    renderProductDetails() {
        // Get main element, create section and render product details
        const main = document.querySelector("main");
        const section = document.createElement("section");
        section.setAttribute("class", "product-detail");
        section.innerHTML = `<h3>${this.product.Brand.Name}</h3>
                            <h2 class="divider">${this.product.NameWithoutBrand}</h2>
                            <img class="divider" src="${this.product.Image}"
                            alt="${this.product.NameWithoutBrand}"
                            />
                            <p class="product-card__price">$${this.product.ListPrice}</p>
                            <p class="product__color">${this.product.Colors[0].ColorName}</p>
                            <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
                            <div class="product-detail__add">
                                <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
                            </div>`
        main.appendChild(section);
    }
  }