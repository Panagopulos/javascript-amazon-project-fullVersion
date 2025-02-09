import { calculateCartQuantity, 
  cart,removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {

  let cartSummaryHTML = '';
  // Looping through cart and it's items to generate the HTML for checkout page
  cart.forEach((cartItem) => {
  const productId = cartItem.productId;  //Saving the productId of the single CartItem

  const matchingProduct = getProduct(productId);

  const deliveryOptionId = cartItem.deliveryOptionId;

  const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM, D'
    );


  cartSummaryHTML += `
      <div class="cart-item-container 
          js-cart-item-container
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
                ${matchingProduct.getPrice()}
              </div>
              <div class="product-quantity
                js-product-quantity-${matchingProduct.id}">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link
                  js-delete-link-${matchingProduct.id}"
                  data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
      </div>
  `
  });

  // Function to generate HTML for deliveryOptions by using external library dayJS and accepting parameters
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';  //variable to save the HTML

    deliveryOptions.forEach((deliveryOption) => {  // Looping through delivery options 
      const today = dayjs();                       // To each option we give current time
      const deliveryDate = today.add(              // Depending on the price and how long to ship it
        deliveryOption.deliveryDays,               // Accesing the deliverydays and adding the lenght
        'days'
      );
      const dateString = deliveryDate.format(      //Formating the date to fit my need
        'dddd, MMMM, D'
      );

      const priceString = deliveryOption.priceCents 
      === 0
      ? 'FREE'                                             //If option is 0 cents it will display FREE
      : `$${formatCurrency(deliveryOption.priceCents)} -`; //Else we use function to show the price
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;  

    html += `
      <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''} 
          class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">  
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;   //Returning the HTML since its inside the function which we use above in         cartSummaryHTML

  }

  document.querySelector('.js-order-summary')  //DOM for generating the html
    .innerHTML = cartSummaryHTML;

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
          

          renderPaymentSummary();
        });
      });


    // Updating the dom of the date above the item(product) when clicking on the radio input elements for shipping time and prices
    document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          const {productId, deliveryOptionId} = element.dataset; // Shorthand property to get the productId and deliveryOptionId from above to the function below 
          updateDeliveryOption(productId, deliveryOptionId); // Running the function from cart.js updates the Id of the the matchingItem.
          renderOrderSummary();
          renderPaymentSummary();
        });
      });
}

