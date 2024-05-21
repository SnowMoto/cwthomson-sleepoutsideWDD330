import { setLocalStorage, getLocalStorage, updateCartSuperscript, addDiscountDetails, animateCart, alertMessage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // Use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);

        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        this.renderProductDetails();

        // Update page's title
        document.title = `Sleep Outside | ${this.product.Name}`;

        // Display discount Information
        addDiscountDetails(this.product);

        // If ul list of colors exist, add event listener to listen to swatch image changes
        if (this.product.Colors.length > 1) {
            // Remove unique color
            document
                .querySelector(".product__color")
                .innerHTML = '';

            const liElem = document.querySelectorAll(".color-swatch li");
            // Add the default (first item is the selected)
            liElem[0].classList.add("selected");

            liElem.forEach((item) => {
                item.addEventListener("click", () => {
                    // Ensure the target is the li element (even if event triggered by a child element)
                    liElem.forEach((item) => item.classList.remove("selected"));
                    item.classList.add("selected");
                });
            });
        } 

        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
        document.getElementById("addToWishlist")
            .addEventListener('click', this.addToWishlist.bind(this));
    }

    addToCart() {
        // Add product color preferences properties (if more than one color in product)
        if (this.product.Colors.length > 1) {
            const selectedColorElem = document.querySelector(".color-swatch li.selected");
            this.product["SelectedColor"] = selectedColorElem.dataset.color;
            this.product["SelectColorImg"] = selectedColorElem.dataset.img;
        } else {
            this.product["SelectedColor"] = this.product.Colors[0].ColorName;
            this.product["SelectColorImg"] = this.product.Images.PrimaryMedium;
        }

        let cartItems = [];
        const cart = getLocalStorage("so-cart");
        if (cart !== null) {
            cart.forEach((object) => cartItems.push(object));
        }

        // Push the "product" property of the instance of the class
        if (!this.isProductInCart(cartItems, this.product)) {
            this.product["qty"] = 1;
            cartItems.push(this.product);
        } else {
            // Get product from cartItems
            let product = cartItems[cartItems.findIndex(item => (item.Id === this.product.Id) && (item.SelectedColor === this.product.SelectedColor))];

            // Update quantity
            product["qty"]++;
        }
        setLocalStorage("so-cart", cartItems);
        // Alert the user of item added
        animateCart();
        updateCartSuperscript();
        const alertElem = alertMessage({ message: `${this.product.NameWithoutBrand} Succesfully Added to Cart!` })
        document
            .querySelector("main.divider")
            .prepend(alertElem);
    }

    isProductInCart(cartList, product) {
        const index = cartList.findIndex((item) => (item.Id === product.Id) && (item.SelectedColor === product.SelectedColor));
        return (index === -1) ? false : true;
    }

    renderProductDetails() {
        // Get main element, create section and render product details
        const main = document.querySelector("main");
        const section = document.createElement("section");
        section.setAttribute("class", "product-detail");
        section.innerHTML = `<h3>${this.product.Brand.Name}</h3>
                            <h2 class="divider">${this.product.NameWithoutBrand}</h2>
                            <img class="divider" src="${this.product.Images.PrimaryLarge}"
                            alt="${this.product.NameWithoutBrand}"
                            />
                            <p class="product-card__price">$${this.product.ListPrice}</p>
                            <p class="product__color">${this.product.Colors[0].ColorName}</p>
                            ${this.renderColorSwatch()}
                            <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
                            <div class="product-detail__add">
                                <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
                                <button id="addToWishlist" data-id="${this.product.Id}">Add to Wishlist</button>
                            </div>`
        main.appendChild(section);
    }

    renderColorSwatch() {
        if (this.product.Colors.length > 1) {
            let html = `<h4>All Available Colors:</h4><ul class="color-swatch">`;
            this.product.Colors.forEach(color => {
                html += `<li data-img="${color.ColorPreviewImageSrc}" data-color="${color.ColorName}"><img src="${color.ColorPreviewImageSrc}" alt="${this.product.Name + ' ' + color.ColorName}">${color.ColorName}</li>`
            });
            html += `</ul>`;
            return html;
        } else {
            return '';
        }
    }



    ///////// WISHLIST SECTION ///////////
    addToWishlist() {
        // Add product color preferences properties (if more than one color in product)
        if (this.product.Colors.length > 1) {
            const selectedColorElem = document.querySelector(".color-swatch li.selected");
            this.product["SelectedColor"] = selectedColorElem.dataset.color;
            this.product["SelectColorImg"] = selectedColorElem.dataset.img;
        } else {
            this.product["SelectedColor"] = this.product.Colors[0].ColorName;
            this.product["SelectColorImg"] = this.product.Images.PrimaryMedium;
        }

        let wishItems = [];
        const wish = getLocalStorage("wish-cart");
        if (wish !== null) {
            wish.forEach((object) => wishItems.push(object));
        }

        // Push the "product" property of the instance of the class
        if (!this.isProductInWishlist(wishItems, this.product)) {
            this.product["qty"] = 1;
            wishItems.push(this.product);
        } else {
            // Get product from cartItems
            let product = wishItems[wishItems.findIndex(item => (item.Id === this.product.Id) && (item.SelectedColor === this.product.SelectedColor))];

            // Update quantity
            product["qty"]++;
        }
        setLocalStorage("wish-cart", wishItems);
        // Alert the user of item added, not neccessary for the wishlist
        //animateCart();
        updateCartSuperscript();
        const alertElem = alertMessage({ message: `${this.product.NameWithoutBrand} Succesfully Added to WishList!` })
        document
            .querySelector("main.divider")
            .prepend(alertElem);
    }

    isProductInWishlist(wishList, product) {
        const index = wishList.findIndex((item) => (item.Id === product.Id) && (item.SelectedColor === product.SelectedColor));
        return (index === -1) ? false : true;
    }
}