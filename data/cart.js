export let cart = JSON.parse(localStorage.getItem('cart'));
//add comment
if(!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
}

// add comment
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
    };
    saveToStorage();
  }

  // function for removing the product from the cart by using parametr 
  // which we input in checkout.js at delete-link (dom) and here we
  // Create new array in which after we add all the products we have in cart
  // but not the one that we want to delete using IF statemant
  // that's how we "delete" the  productId since it will not be pushed
  // inside the newCart[array]. Also we had to change cart from const to let
  // and assing it the new variable newCart
  export function removeFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {
      if(cartItem.productId !== productId) {
        newCart.push(cartItem)
      }
    });

    cart = newCart;

    saveToStorage();
  }