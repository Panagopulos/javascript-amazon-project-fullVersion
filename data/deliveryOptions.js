/*
Variable to save all the different delivery options the customer can choose from
It's purpose is to have these properties below which we will later use in checkout.js
export is going into checkout.js
*/
export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  // Looping through each option and if deliveryOption have the same id as in cart(deliveryOptionId) we save it in deliveryOption and use it to generate time in the cartSummaryHTML and also price in PaymentSummary
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}