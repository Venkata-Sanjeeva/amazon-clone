import { products as productList } from './data/products.js';
// import { cartList } from './orderlist-checkout.js';

// export let orderList = cartList;


let htmlCode = '';
let quantity;
let orderList;
let newOrderList = [];
// console.log(orderList);
// let orderList = [];
// localStorage.removeItem('cartList');
// console.log(JSON.parse(localStorage.getItem('cartList')));
if (JSON.parse(localStorage.getItem('cartList')) !== null) {
    orderList = JSON.parse(localStorage.getItem('cartList'));
    // display();
    // console.log('from if');
} else {
    orderList = [];
    // display();
    // console.log('from else');
}


document.addEventListener('DOMContentLoaded',display());
function display() {
    productList.forEach((item) => {
        item.quantity = 0;
        htmlCode += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${item.image}">
            </div>
    
            <div class="product-name limit-text-to-2-lines">
                ${item.name}
            </div>
    
            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${item.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                    ${item.rating.count}
                </div>
            </div>
    
            <div class="product-price">
                $${item.priceCents / 100}
            </div>
    
            <div class="product-quantity-container">
                <select id="${item.id}">
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
    
            <button class="add-to-cart-button button-primary js-cart-btn" data-cart-btn="${item.id}">
                Add to Cart
            </button>
        </div>`;
    });
    
    document.getElementById('products-grid').innerHTML = htmlCode;
    document.querySelector(".js-cart-quantity").innerText = orderList.length;
    document.querySelectorAll('.js-cart-btn').forEach((btn,index) => {
        btn.addEventListener('click', () => {
            let productId = btn.dataset.cartBtn;
            // console.log(productId);
            quantity = parseInt(document.getElementById(`${productId}`).value);
            //console.log(quantity);
            newOrderList = fun1(productId, quantity);
            // console.log(orderList,'orderList',productId);
            orderList = newOrderList;
            localStorage.setItem('cartList',JSON.stringify(orderList));
            // console.log(orderList);
            document.querySelector(".js-cart-quantity").innerText = newOrderList.length;
        });
    });
}


function fun1(productId,quantity) {
    //console.log(productId);
    productList.forEach((product) => {
        if (product.id === productId && product.quantity > 0) {
            product.quantity += quantity;
            // console.log(productId,' ',product.quantity);
            // console.log(orderList);
            // return orderList;
        }
        if (product.id === productId && product.quantity === 0) {
            product.quantity = quantity;
            // console.log(productId, product.quantity);
            // console.log(orderList);
            newOrderList.push(product);
            // return orderList;
        }
    });
    return newOrderList;
}