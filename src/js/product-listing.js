import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const listing = new ProductListing(category, dataSource, listElement);
listing.init();