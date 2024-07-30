import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProducts } from '../data/products.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

//Function from products.js which provides data from backend to the renderOrderSummary and renderPaymentSummary
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
