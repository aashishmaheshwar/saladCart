import React, { useEffect } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useIngredients, Ingredient } from "../hooks/useIngredients";
import { useDispatch, useSelector } from "react-redux";
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

  useEffect(() => {
    if (!options) {
      history.push("/home");
    }
  }, [options]);

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
    const incrementBtnName = `Add ${name}`;
    const decrementBtnName = `Remove ${name}`;
    const increment = () =>
      (updateIngredientCount as any)(name, (selectedItems as any)[name] + 1);
    const decrement = () =>
      (updateIngredientCount as any)(name, (selectedItems as any)[name] - 1);
    return (
      <section className="ingredient--itemdetail__mainwrapper">
        <div>MRP: Rs {price}</div>
        <div className="ingredient--itemdetail__countwrapper">
          <button
            className="btn btn-link btn-sm"
            aria-label={incrementBtnName}
            onClick={increment}
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
            aria-label={decrementBtnName}
            onClick={decrement}
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
          const { id, name, image } = option;
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
                    height: "150px",
                    border: "1px solid beige",
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
