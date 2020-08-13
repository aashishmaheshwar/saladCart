import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle, FaShoppingCart } from "react-icons/fa";
import { useIngredients, Ingredient } from "../hooks/useIngredients";
import { connect, useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

const Ingredients: React.FC<RouteComponentProps> = ({ history }) => {
  const defaultSelectedItems = useSelector(
    (state) => (state as any).selectedItems
  ); // when we hit back button on checkout
  const [
    updateIngredientCount,
    selectedItems,
    options,
    enableCheckout,
  ] = useIngredients(defaultSelectedItems);
  const dispatch = useDispatch();

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
      <section style={{ width: "150px", background: "#f4f3f2" }}>
        <div>MRP: Rs {price}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "10px",
          }}
        >
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
            value={(selectedItems as any)[name]}
            onChange={handleInputValueChange}
            style={{ width: "50px", margin: "0 0.75rem" }}
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
            <div
              key={id}
              style={{
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                // padding: "1vw",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  src={image}
                  alt={name}
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
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            marginTop: "10vh",
            flexDirection: "column",
          }}
        >
          <h1 style={{ width: "100%", marginBottom: "5vh" }}>Ingredients</h1>
          <div style={{ marginBottom: "2vh" }}>
            <button
              className="btn btn-primary"
              disabled={!enableCheckout}
              onClick={checkout}
            >
              <FaShoppingCart />
              &nbsp;&nbsp;Proceed to checkout
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
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
