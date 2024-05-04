function productCardTemplate(product) {
    
  let discountString = "";

  if (product.FinalPrice < product.SuggestedRetailPrice){

    let discount_price = Math.round((100 * product.FinalPrice) / product.SuggestedRetailPrice) - 100;
    discount_price = (100 * discount_price) / 100;
    discountString = ` <b>${discount_price}%</b> RRP: <s>$${product.SuggestedRetailPrice}</s>`;   
  }

    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice} ${discountString}</p></a>
  </li>`;
  }
  
export default class ProductList{
    constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }    
    async init() { //build the list and load onto the page.

    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list and after each line comment out and test for errors.
    this.renderList(list); 
    }
    // render after first stretch
    renderList(list) {
      const htmlStrings = list.map(productCardTemplate);  //map is a loop shortcut
      this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
      }
    }