import {cart} from '../data/cart.js';
import { products } from '../data/products.js';
// Variable of array including object which are representing properties for
// the eshop items so we are able to loop through this array and generate
// the html for all the different objects(items)
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
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${(product.priceCents / 100).toFixed(2)}
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

console.log(productsHTML);

// Using dom to showcase the final html we created on main page.
document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

  // Selecting all 'Add to Cart' button by using DOM and looping through them 
  // Then adding to each button EventListener so it listen to click and when 
  // that happens we save the unique ID we get from the data set attribute in
  // our generated html into 'productId' variable 
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
       const productId = button.dataset.productId;

       let matchingItem; // Creating matchingItem variable to save the item if it is the same as the one in cart
       
       cart.forEach((item) => {
        if(productId === item.productId) {
          matchingItem = item;
        }  // Looping through cart items and comparing if the new productId is matching any productId in the cart
       });

       if (matchingItem) {
        matchingItem.quantity += 1 // If there is alraedy matchingItem we increase the quantity by one
       } else {
        cart.push({ 
          productId,
          quantity: 1
         });  // Else we push the new object(item) in the cart
       }

       // Making the shopping cart in the top right header interactive.
       let cartQuantity = 0;

       cart.forEach((item) => {
        cartQuantity += item.quantity;
       });

       document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
        
       console.log(cartQuantity);
       console.log(cart); // checking if it works
      });
    });