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





listing.init().then(addQuickViewEventListeners);

function createQuickViewTemplate(productDetails) {
    return `
        <div class="modal-content">
            <h3 class="product-name">${productDetails.Name}</h3>
            <img src="${productDetails.Images.PrimaryMedium}">
            <p class="product-description">${productDetails.DescriptionHtml}</p>
            <button class="close-button">Close</button>
        </div>
    `;
}

function addQuickViewEventListeners() {
    const quickViewButtons = document.querySelectorAll(".quick-view");

    quickViewButtons.forEach(quickViewButton => {
        quickViewButton.addEventListener("click", async (event) => {
            const productId = quickViewButton.getAttribute('data-product-id');
            try {
                const productDetails = await dataSource.findProductById(productId);
                const quickViewTemplate = createQuickViewTemplate(productDetails);

                renderQuickViewModal(quickViewTemplate, productId);
            } catch (error) {
                console.error(error);
            }
        });
    });
}

async function renderQuickViewModal(template, productId) {
    const productDetails = await dataSource.findProductById(productId);
    const modal = document.querySelector("#modal");
    modal.innerHTML = template;

    const productNameElement = modal.querySelector(".product-name");
    const productDescriptionElement = modal.querySelector(".product-description");

    if (!productNameElement || !productDescriptionElement) {
        console.error("Expected elements not found in the template.");
        return;
    }

    productNameElement.textContent = productDetails.Name;
    productDescriptionElement.innerHTML = productDetails.DescriptionHtmlSimple;
    modal.showModal();
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('close-button')) {
        document.querySelector('#modal').close();
    }
});