import cartReducer from "../cart-reducer";

describe("Cart Reducer", () => {
  it("CLEAR_CART action clears the state", () => {
    const dummyState = {
      selectedItems: {},
    };
    const newState = cartReducer(dummyState, {
      type: "CLEAR_CART",
      payload: {},
    });
    expect(JSON.stringify(newState)).toEqual("{}");
  });

  it("CHECKOUT_TRIGGER action sets the checkout trigger property to true", () => {
    const dummyState = {
      selectedItems: {},
      checkoutTrigger: false,
    };
    const newState = cartReducer(dummyState, {
      type: "CHECKOUT_TRIGGER",
      payload: {},
    });
    expect(newState.checkoutTrigger).toBeTruthy();
  });
});

export {};
