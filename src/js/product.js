import { getParams, loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const productId = getParams("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();



const oldBreadcrumbsPath = getLocalStorage("breadcrumbsPath");
function bread() {
    if (oldBreadcrumbsPath && oldBreadcrumbsPath.includes(productId)) {
        const breadcrumbsPath = oldBreadcrumbsPath;
        document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
        setLocalStorage("breadcrumbsPath", breadcrumbsPath);
    }
    else {
        const breadcrumbsPath = `${oldBreadcrumbsPath} / <li><a href="${window.location.href}">${productId}</a></li>`;
        document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
        setLocalStorage("breadcrumbsPath", breadcrumbsPath);
    }
}
bread();
