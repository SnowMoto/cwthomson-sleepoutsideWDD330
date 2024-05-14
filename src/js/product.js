import { getParams, loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const productId = getParams("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();



const oldBreadcrumbsPath = getLocalStorage("breadcrumbsPath");
const breadBackup = getLocalStorage("breadBackup");
function bread() {
    if (oldBreadcrumbsPath && oldBreadcrumbsPath.includes(productId)) {
        const breadcrumbsPath = breadBackup;
        document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
        setLocalStorage("breadcrumbsPath", breadBackup);
        setLocalStorage("breadBackup", breadBackup);
    }
    else {
        const breadcrumbsPath = `${oldBreadcrumbsPath}<li><a href="${window.location.href}">${productId}</a></li><i class="fa fa-home"></i>`;
        document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
        setLocalStorage("breadcrumbsPath", breadcrumbsPath);
        setLocalStorage("breadBackup", breadcrumbsPath);
    }
}
bread();
