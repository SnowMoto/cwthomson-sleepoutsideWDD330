import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");

const listing = new ProductListing(category, dataSource, listElement);
listing.init();

//Breadcrumbs

async function getbreadcrumbs() {
    let items = await listing.getNumberItems();
    const breadcrumbTemplate = `<li><a href="/">Home</a></li><i class="fa fa-home"></i> <li><a href="${window.location.href}" class="aElement">${category.charAt(0).toUpperCase() + listing.category.slice(1)} <span class="products-number">${items}</span></a></li><i class="fa fa-home"></i>`;
    document.querySelector(".breadcrumb").innerHTML = breadcrumbTemplate;
    setLocalStorage("breadcrumbsPath", breadcrumbTemplate);
}
getbreadcrumbs();