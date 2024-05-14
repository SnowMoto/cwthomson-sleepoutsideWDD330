import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const listing = new ProductListing(category, dataSource, listElement);
listing.init();

//Breadcrumbs

async function getbreadcrumbs() {
    let items = await listing.getNumberItems();
    const breadcrumbTemplate = `<li><a href="/">Home / </a></li><a href="${window.location.href}" class="aElement">${category.charAt(0).toUpperCase() + listing.category.slice(1)}(Items:${items})</a></li>`;
    document.querySelector(".breadcrumb").innerHTML = breadcrumbTemplate;
    setLocalStorage("breadcrumbsPath", breadcrumbTemplate);
}
getbreadcrumbs();