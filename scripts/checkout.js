import { calculateCartQuantity, 
  cart,removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';



let cartSummaryHTML = '';

cart.forEach((cartItem) => {
 const productId = cartItem.productId;

 let matchingProduct;

 products.forEach((product) => {
  if(product.id === productId) {
    matchingProduct = product;
  };
 });

 const deliveryOptionId = cartItem.
 deliveryOptionId;

 let deliveryOption;

 deliveryOptions.forEach((option) => {
  if (option.id === deliveryOptionId) {
    deliveryOption = option;
  }

 });

  const today = dayjs();                          //Initilizing dayjs library
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,                  //Saving the current option days (1,3,7)
    'days'
  );
    const dateString = deliveryDate.format(
    'dddd, MMMM, D'                               //Formating it into readable state
  );

 cartSummaryHTML += `
    <div class="cart-item-container 
      	js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">1</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link"
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${deliveryOptionsHTML(matchingProduct,cartItem)}
          </div>
        </div>
    </div>
 `
});
// Function which generates the delivery option container including external library dayjs
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = ''; // Variable where we save the whole HTML

  // Looping through all deliveryOptions and there throught each object(deliveryOption) 
  deliveryOptions.forEach((deliveryOption) => {  
    const today = dayjs();                          //Initilizing dayjs library
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,                  //Saving the current option days (1,3,7)
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM, D'                               //Formating it into readable state
    );

    const priceString = deliveryOption.priceCents   //Saving the properties of price of the shipping
    === 0 
    ? 'Free'                                        // If price == 0 it display free
    : `$${formatCurrency(deliveryOption.priceCents)} - `; // else it shows the current price

    // Boolean used in generated html to decide which option should be checked and avoid the conflict of all options checked
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    // Accumulator pattern, !matchingProdcut must be added as parameter! 
    html +=
    `
    <div class="delivery-option">
      <input type="radio"
      ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"> 
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
    `
  });
  return html;
};

document.querySelector('.js-order-summary')  //DOM for generating the html
  .innerHTML = cartSummaryHTML;

updateCartQuantity();

  /*
  DOM for the delete link  in which we then loop throug all (Delete(button) elements) assing them a unique dataset-id that we save inside productId
  which we can then use for determinetion of which product we want to delete
  in removeFromCart() function;  
  
  At the bottom.We again use DOM for the main container.In which we at the
  top assinged matchingProduct.id while HTML is generated. Here we reassing
  the id with productId (which is the item we want to delete) so it selectes
  the whole container and prior to that we use Method - remove(); to delete
  the container from the page.
  */
  document.querySelectorAll('.js-delete-link') 
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

       const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        updateCartQuantity();
      });
    });
    // Updating - Checkout(- this - part -)  element of the page.
    function updateCartQuantity() {
    
      const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cartQuantity} items`;
  }
