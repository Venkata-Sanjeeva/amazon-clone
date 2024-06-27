import { addToCart, cart } from "../../data/cart.js";

describe("test suite: addToCart", () => {
    it("adds an existing product to the cart", () => {
        // expect().toEqual(); // we don't use this line because the cart function doesn't return anything 
        
    });

    it("adds a new product to the a=cart", () => {
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
    });
});