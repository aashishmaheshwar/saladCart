const cartReducer = (state = {}, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "CHECKOUT_CART_ITEMS": {
      const { checkoutTrigger, enableCheckout, ...rest } = state as any;
      return {
        // ...state,
        ...rest,
        ...action.payload,
      };
    }
    case "CHECKOUT_TRIGGER": {
      return {
        ...state,
        checkoutTrigger: true,
      };
    }
    case "ENABLE_CHECKOUT": {
      return {
        ...state,
        enableCheckout: action.payload.enableCheckout,
      };
    }
    case "CLEAR_CART": {
      return {};
    }
    default:
      return state;
  }
};

export default cartReducer;
