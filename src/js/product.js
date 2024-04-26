import { setLocalStorage, getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('ents');

function addProductToCart(product) {
  let cartItems = getLocalStorage('so-cart');
  //if (cartItems == null || typeof cartItems != Array) {
  //Check if it exisits then it can be used to pull from storage and if not then it has to be created or Error.
  if (cartItems == null) {
    cartItems = [];
  }
  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
