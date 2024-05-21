import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";
import Wishlist from "./WishList.mjs";
import ShoppingCart from "./WishList.mjs";

loadHeaderFooter();

const wishCart = new Wishlist("wish-cart", ".product-list");
wishCart.renderWishlistContents();


const oldBreadcrumbsPath = getLocalStorage("breadcrumbsPath");
function bread() {

    if (oldBreadcrumbsPath == "") {
        const breadcrumbsPath = `<li><a href="/">Home</a></li><i class="fa fa-home"></i><li><a href="${window.location.href}">Cart</a></li><i class="fa fa-home"></i>`;
        const secondbackup = breadcrumbsPath;
        document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
        setLocalStorage("breadcrumbsPath", breadcrumbsPath);
        setLocalStorage("secondBackup", secondbackup);
    }
    else {
        if (oldBreadcrumbsPath && oldBreadcrumbsPath.includes("Checkout")) {
            const secondBackup = getLocalStorage("secondBackup");
            const breadcrumbsPath = secondBackup;
            setLocalStorage("breadcrumbsPath", breadcrumbsPath);
            document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;

        }
        else if (oldBreadcrumbsPath && oldBreadcrumbsPath.includes("Cart")) {
            const breadcrumbsPath = oldBreadcrumbsPath;
            document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
            setLocalStorage("breadcrumbsPath", breadcrumbsPath);
            setLocalStorage("secondBackup", breadcrumbsPath);
        }

        else {
            const breadcrumbsPath = `${oldBreadcrumbsPath}<li><a href="${window.location.href}">Cart</a></li><i class="fa fa-home"></i>`;
            document.querySelector(".breadcrumb").innerHTML = breadcrumbsPath;
            setLocalStorage("breadcrumbsPath", breadcrumbsPath);
            setLocalStorage("secondBackup", breadcrumbsPath);
        }
    }
}
bread();