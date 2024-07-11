export const cart = [];

export function addToCart(productId) {
  let matchingItem; // Creating matchingItem variable to save the item if it is the same as the one in cart
       
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
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
    console.log(cart);
  }