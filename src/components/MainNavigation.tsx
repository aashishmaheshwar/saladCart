import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import "./../css/MainNavigation.css";

const MainNavigation: React.FC<RouteComponentProps> = ({ history }) => {
  const enableCheckout = useSelector((state) => {
    console.dir(state);
    return (state as any).enableCheckout;
  });
  const dispatch = useDispatch();

  const checkout = () => {
    dispatch({ type: "CHECKOUT_TRIGGER" });
  };

  return (
    <nav className="App-Header__nav">
      Store
      {(enableCheckout === true || enableCheckout === false) && (
        <button
          className="btn btn-primary mainnav__checkoutbtn"
          disabled={!enableCheckout}
          onClick={checkout}
          //   style={{ position: "absolute", right: '5px', bottom: '5px' }}
        >
          <FaShoppingCart />
          &nbsp;&nbsp;Proceed to checkout
        </button>
      )}
    </nav>
  );
};

export default withRouter(MainNavigation);
