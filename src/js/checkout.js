import { loadHeaderFooter, setLocalStorage, getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const oldBreadcrumbsPath = getLocalStorage("breadcrumbsPath");
function bread() {
    if (oldBreadcrumbsPath && oldBreadcrumbsPath.includes("Checkout")) {
        const breadcrumbsPath = oldBreadcrumbsPath;
        document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
        setLocalStorage("breadcrumbsPath", breadcrumbsPath);
    }
    else {
        const breadcrumbsPath = `${oldBreadcrumbsPath} / <li><a href="${window.location.href}">Checkout</a></li>`;
        document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
        setLocalStorage("breadcrumbsPath", breadcrumbsPath);
    }
}
bread();