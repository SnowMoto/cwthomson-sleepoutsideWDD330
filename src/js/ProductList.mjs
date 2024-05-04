import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
                <a href="product_pages/?product=${product.Id}">
                    <img src="${product.Image}" alt="${product.Name}"/>
                    <h3 class="card__brand">${product.Brand.Name}</h3>
                    <h2 class="card__name">${product.NameWithoutBrand}</h2>
                    <p class="product-card__price">$${product.ListPrice}</p>
                </a>
            </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        let productsList = await this.dataSource.getData();
        
        // Filter list with only the needed products
        productsList = productsList.filter(product => ["880RR", "985RF", "985PR", "344YJ"].includes(product.Id))

        this.renderList(productsList);
    }

    renderList(productsList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productsList);
    }
}