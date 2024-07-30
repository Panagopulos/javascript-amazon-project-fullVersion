import { addToCart, 
  calculateCartQuantity} from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);
// Variable of array including object which are representing properties for
// the eshop items so we are able to loop through this array and generate
// the html for all the different objects(items)
function renderProductsGrid() {

  let productsHTML = '';

  // forEach method connected to 'products' array including objects of shop items in file 'Data/products' 
  products.forEach((product) => {  
    productsHTML +=  `          
      <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>

              <div class="product-price">
                ${product.getPrice()}
              </div>

              <div class="product-quantity-container">
                <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              ${product.extraInfoHTML()}

              <div class="product-spacer"></div>

              <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary js-add-to-cart"
              data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>
    `;
  });


  // Using dom to showcase the final html we created on main page.
  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

    // Making the shopping cart in the top right header interactive.
    function updateCartQuantity() {
      
      const cartQuantity = calculateCartQuantity();

      document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
    }

    updateCartQuantity();

    // Selecting all 'Add to Cart' button by using DOM and looping through them 
    // Then adding to each button EventListener so it listen to click and when 
    // that happens we save the unique ID we get from the data set attribute in
    // our generated html into 'productId' variable 
    document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
        button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        
        addToCart(productId);
        
        updateCartQuantity();
          
        });
      });
  }