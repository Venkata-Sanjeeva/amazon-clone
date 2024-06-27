import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart, calculateCartQuantity, updateQuantity} from '../data/cart.js';
import { updateCartQuantity } from './utils/updateCartQuantity.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';



updateCartQuantity('js-return-to-home-link', "items");

function updateOrderSummaryQuntity(productId) {
  const quantityInput = document.querySelector(
    `.js-quantity-input-${productId}`
  );
  const newQuantity = Number(quantityInput.value);

  if (newQuantity < 0 || newQuantity >= 1000) {
    alert('Quantity must be at least 0 and less than 1000');
    return;
  }
  updateQuantity(productId, newQuantity);

  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );
  container.classList.remove('is-editing-quantity');

  const quantityLabel = document.querySelector(
    `.js-quantity-label-${productId}`
  );
  quantityLabel.innerHTML = newQuantity;

  updateCartQuantity("js-return-to-home-link", "items");

  renderPaymentSummary();
}

function updateLink() {

  document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll(".quantity-input").forEach((link) => {
    link.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
        const productId = link.dataset.quantityInput;
        updateOrderSummaryQuntity(productId);
      }
      
    })
    
  });

  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      updateOrderSummaryQuntity(productId);
      // Here's an example of a feature we can add: validation.
      // Note: we need to move the quantity-related code up
      // because if the new quantity is not valid, we should
      // return early and NOT run the rest of the code. This
      // technique is called an "early return".
    })});
  
  

  /*
  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      updateQuantity(productId, newQuantity);
    });
  });
  */
}

async function loadPage() {
  try {
    // throw 'error1';

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCart(() => {
        // reject('error3');
        resolve('value3');
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  renderOrderSummary();
  updateLink();
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

]).then((values) => {
  console.log(values);
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
  console.log(value);

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
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/