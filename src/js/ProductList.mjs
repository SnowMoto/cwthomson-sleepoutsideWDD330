import { renderListWithTemplate, calculateDiscount } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
                <a href="/product_pages/?product=${product.Id}">
                    <img src="${product.Images.PrimaryMedium}" alt="${product.Name}"/>
                    <h3 class="card__brand">${product.Brand.Name}</h3>
                    <h2 class="card__name">${product.NameWithoutBrand}</h2>
                    <p class="product-card__price">$${product.ListPrice} ${calculateDiscount(product)}</p>
                </a>
                <button class="quick-view-btn" id="${product.Id}">Take a look</button>
            </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        let productsList = await this.dataSource.getData(this.category);

        this.renderList(productsList);

        // Update title to have the current category (Capitalized)
        document.querySelector("span.category").innerHTML = `: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
    }

    renderList(productsList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productsList);
    }

    async getNumberItems() {
        const products = await this.dataSource.getData(this.category);
        return products.length;
    }
}