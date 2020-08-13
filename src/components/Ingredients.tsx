import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle, FaShoppingCart } from "react-icons/fa";
import { useIngredients, Ingredient } from "../hooks/useIngredients";
import { connect, useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import "./../css/Ingredients.css";

const Ingredients: React.FC<RouteComponentProps> = ({ history }) => {
  const defaultSelectedItems = useSelector(
    (state) => (state as any).selectedItems
  ); // when we hit back button from checkout page, we would need the cart intact
  const checkoutTrigger = useSelector(
    (state) => (state as any).checkoutTrigger
  );
  const [
    updateIngredientCount,
    selectedItems,
    options,
    enableCheckout,
  ] = useIngredients(defaultSelectedItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkoutTrigger) {
      checkout();
    }
  }, [checkoutTrigger]);

  useEffect(() => {
    dispatch({ type: "ENABLE_CHECKOUT", payload: { enableCheckout } });
  }, [enableCheckout]);

  const handleInputValueChange = ({ target: { name, value } }: any) => {
    (updateIngredientCount as any)(name, value);
  };

  const checkout = () => {
    dispatch({
      type: "CHECKOUT_CART_ITEMS",
      payload: {
        selectedItems,
        options,
      },
    });
    history.push("/checkout");
  };

  const buildItemDetailView = ({ name, price }: Ingredient) => {
    return (
      <section className="ingredient--itemdetail__mainwrapper">
        <div>MRP: Rs {price}</div>
        <div className="ingredient--itemdetail__countwrapper">
          <button
            className="btn btn-link btn-sm"
            onClick={() =>
              (updateIngredientCount as any)(
                name,
                (selectedItems as any)[name] + 1
              )
            }
          >
            <FaPlusCircle />
          </button>
          <input
            type="text"
            name={name}
            value={(selectedItems as any)[name] || ""}
            onChange={handleInputValueChange}
            className="ingredient--itemdetail__input"
          />
          <button
            className="btn btn-link btn-sm"
            onClick={() =>
              (updateIngredientCount as any)(
                name,
                (selectedItems as any)[name] - 1
              )
            }
          >
            <FaMinusCircle />
          </button>
        </div>
      </section>
    );
  };

  const buildAllIngredients = () => {
    return (
      <>
        {(options as Array<Ingredient>).map((option) => {
          const { id, name, price, image } = option;
          return (
            <div key={id} className="ingredient--item__mainwrapper">
              <div>
                <img
                  src={image}
                  alt={name}
                  // className="ingredient--item__image"
                  style={{
                    width: "150px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                  }}
                  title={name}
                />
              </div>
              <div>
                <h4>{name}</h4>
              </div>
              {buildItemDetailView(option)}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      {options && (options as Array<Ingredient>).length > 0 ? (
        <section className="ingredients__mainwrapper">
          <h1 className="ingredients__header">Ingredients</h1>
          {/* <div>
            <button
              className="btn btn-primary"
              disabled={!enableCheckout}
              onClick={checkout}
            >
              <FaShoppingCart />
              &nbsp;&nbsp;Proceed to checkout
            </button>
          </div> */}
          <div className="ingredients__mainflexwrapper">
            {buildAllIngredients()}
          </div>
        </section>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};

export default Ingredients;
