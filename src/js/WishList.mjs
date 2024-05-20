import { getLocalStorage, renderListWithTemplate, setLocalStorage, updateCartSuperscript } from "./utils.mjs";

// Helper function for wishlist item template
function wishlistItemTemplate(item) {
    return `<li class="wishlist-card divider">
                <a href="/product_pages/?product=${item.Id}" class="wishlist-card__image">
                <img
                    src="${item.SelectColorImg}"
                    alt="${item.Name}"
                />
                </a>
                <a href="/product_pages/?product=${item.Id}">
                    <h2 class="wishlist__name">${item.Name}</h2>
                </a>
                <p class="wishlist-card__color">${item.SelectedColor}</p>
                <p class="wishlist-card__price">$${item.FinalPrice}</p>
                <!--<button id="addToCart" data-id="${item.Id}">Add to Cart</button>-->
                <span data-id="${item.Id}" data-color="${item.SelectedColor}" class="wishlist-card__remove">x</span>
            </li>`;
}

export default class Wishlist {
    constructor(key, parentElem) {
        this.key = key;
        this.parentElem = parentElem;
    }

    renderWishlistContents() {
        let wishlistItems = getLocalStorage(this.key);
      
        if (wishlistItems && wishlistItems.length > 0) {
            const parentElem = document.querySelector(this.parentElem);
            renderListWithTemplate(wishlistItemTemplate, parentElem, wishlistItems, "afterbegin", true);
      
            // Listen for clicks on remove span element
            this.listenToRemoveSpan();
      
            // Remove "hide" class from footer to display html
            document.querySelector(".wishlist-footer").classList.remove("hide");
        } else {
            // If wishlist is empty, display a message
            document.querySelector(".product-list").innerHTML = "<p>Your wishlist is empty.</p>";
            // Add "hide" class from footer to hide html
            document.querySelector(".wishlist-footer").classList.add("hide");
        }
    }

    listenToRemoveSpan() {
        document
            .querySelectorAll(".wishlist-card__remove")
            .forEach(span => {
                span.addEventListener("click", (ev) => {
                    // Retrieve current wishlist items from local storage
                    let wishlistItems = getLocalStorage(this.key);
                
                    // Filter product index to be removed
                    const index = wishlistItems.findIndex(item => (item.SelectedColor === ev.target.dataset.color) && (item.Id === ev.target.dataset.id));
                    wishlistItems = wishlistItems.filter(item => item !== wishlistItems[index]);
                
                    // Set updated wishlist items list in local storage
                    setLocalStorage(this.key, wishlistItems);
                    this.renderWishlistContents();
                });
            });
    }

    addItemToWishlist(item) {
        let wishlistItems = getLocalStorage(this.key) || [];
        wishlistItems.push(item);
        setLocalStorage(this.key, wishlistItems);
        this.renderWishlistContents();
    }

    
}


