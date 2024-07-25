function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
     looadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      //add comment
      if(!this.cartItems) {
        this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'  
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },
  
    // add comment
    saveToStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  },
  
  addToCart(productId) {
    let matchingItem; // Creating matchingItem variable to save the item if it is the same as the one in cart
         
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }  // Looping through cart items and comparing if the new productId is matching any productId in the cart
      });
  
      if (matchingItem) {
      matchingItem.quantity += 1 // If there is alraedy matchingItem we increase the quantity by one
      } else {
      this.cartItems.push({ 
        productId,
        quantity: 1,
        deliveryOptionId: '1'
        });  // Else we push the new object(item) in the cart
      };
      this.saveToStorage();
    },
  
    // function for removing the product from the cart by using parametr 
    // which we input in checkout.js at delete-link (dom) and here we
    // Create new array in which after we add all the products we have in cart
    // but not the one that we want to delete using IF statemant
    // that's how we "delete" the  productId since it will not be pushed
    // inside the newCart[array]. Also we had to change cart from const to let
    // and assing it the new variable newCart
    removeFromCart(productId) {
      const newCart = [];
  
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
          newCart.push(cartItem)
        }
      });
  
      this.cartItems = newCart;
  
      this.saveToStorage();
    },
  
  
    
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem; 
         
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId) {
          matchingItem = cartItem;
        } 
        });
  
        matchingItem.deliveryOptionId = deliveryOptionId;
  
        this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');




cart.looadFromStorage();

businessCart.looadFromStorage();



console.log(cart);
console.log(businessCart); 

