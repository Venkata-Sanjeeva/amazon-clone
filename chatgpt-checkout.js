let orderList = JSON.parse(localStorage.getItem('cartList'));

if (orderList.length === 0) {
    document.querySelector('.order-summary').innerHTML = `<p class="no-orders">No Orders Added to Cart!</p>`;
    document.querySelector(".js-checkout-header-middle-section").innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">0 items</a>)`;
} else {
    display();
}

function display() {
    let htmlCode = "";
    orderList.forEach((product, index) => {
        htmlCode += `
        <div class="${product.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image" src="${product.image}">
                <div class="cart-item-details">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${product.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-quantity-link" id="${product.id}" data-update-btn="${index}">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-quantity-link" data-delete-btn="${index}">
                            Delete
                        </span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    <div class="delivery-option">
                        <input type="radio" checked class="delivery-option-input" name="${product.id}delivery-option">
                        <div>
                            <div class="delivery-option-date">Tuesday, June 21</div>
                            <div class="delivery-option-price">FREE Shipping</div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="${product.id}delivery-option">
                        <div>
                            <div class="delivery-option-date">Wednesday, June 15</div>
                            <div class="delivery-option-price">$4.99 - Shipping</div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="${product.id}delivery-option">
                        <div>
                            <div class="delivery-option-date">Monday, June 13</div>
                            <div class="delivery-option-price">$9.99 - Shipping</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    document.querySelector('.order-summary').innerHTML = htmlCode;
    document.querySelector(".js-checkout-header-middle-section").innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${orderList.length} items</a>)`;
    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll('.js-delete-quantity-link').forEach((key) => {
        key.addEventListener('click', () => {
            let keyId = key.dataset.deleteBtn;
            orderList = fun2(keyId);
            localStorage.setItem('cartList', JSON.stringify(orderList));
            if (orderList.length === 0) {
                document.querySelector('.order-summary').innerHTML = `<p class="no-orders">No Orders Added to Cart!</p>`;
                document.querySelector(".js-checkout-header-middle-section").innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">0 items</a>)`;
            } else {
                display();
            }
        });
    });

    document.querySelectorAll('.js-update-quantity-link').forEach((key) => {
        key.addEventListener('click', () => {
            let keyId = key.dataset.updateBtn;
            fun3(keyId);
        });
    });
}

function fun2(keyId) {
    orderList = orderList.filter((_, index) => keyId != index);
    return orderList;
}

function fun3(keyId) {
    orderList.forEach((product, index) => {
        if (keyId == index) {
            document.getElementById(`${orderList[index].id}`).innerHTML = `
            <div class="is-editing-quantity">
                <input class="quantity-input" placeholder="Enter Quantity">
                <span class="save-quantity-link link-primary">Save</span>
            </div>`;
            document.querySelector(`.save-quantity-link`).addEventListener('click', () => {
                const newQuantity = document.querySelector(`#${orderList[index].id} .quantity-input`).value;
                orderList[index].quantity = parseInt(newQuantity);
                localStorage.setItem('cartList', JSON.stringify(orderList));
                display();
            });
        }
    });
}

