import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage() {
  try {
    //throw 'error1';

    await loadProductsFetch(); // waits for the backend to load

    const value = await new Promise((resolve, reject) => {
      //throw 'error2'; goes straight to catch (behaves like synchronous code).
      loadCart(() => {
        // reject('error3');
        resolve('value3');
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.')
  }
 

  

  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
}).then((value) => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
}); 
*/


/*
// This code does the similliar as above but callbacks are creating nesting so it's better to use Promise. <3 
//Function from products.js which provides data from backend to the renderOrderSummary and renderPaymentSummary
loadProducts(() => {
  loadCart(() => {
  renderOrderSummary();
  renderPaymentSummary();
  });
});
*/

