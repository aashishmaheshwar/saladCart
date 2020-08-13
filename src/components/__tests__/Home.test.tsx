import { render, getByText } from "@testing-library/react";
import Home from "../Home";
import React from "react";
import { createStoreHook, Provider } from "react-redux";
import cartReducer from "../../reducers/cart-reducer";
import { createStore } from "redux";

const mockFn = jest.fn();

describe("Home", () => {
  it("on render - renders a button with text 'Order now'", () => {
    // const { container } = render(<Provider store={createStore(cartReducer))}><Home /></Provider>);
    const { container } = render(<Home />);
    expect(getByText(container, "Order now")).toBeInTheDocument();
  });
});

export {};
