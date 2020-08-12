const cartReducer = (state = {}, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "CHECKOUT_CART_ITEMS": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
