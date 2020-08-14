import React, { ReactElement } from "react";
// import App from "../../App";
// import { render, getByText, fireEvent, screen } from "../../utils/test-utils";
import Checkout from "../Checkout";
import { createMemoryHistory } from "history";
// import { render } from "@testing-library/react";
import { createStore } from "redux";
import cartReducer from "../../reducers/cart-reducer";
import { Provider } from "react-redux";
import { render as rtlRender, getByText } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";

const OPTIONS = [
  {
    id: "C2-06",
    name: "Cucumber",
    price: 15,
    image: "/images/Cucumber.jpg",
  },
  {
    id: "C2-07",
    name: "Olives",
    price: 40,
    image: "/images/Olives.jpg",
  },
];

const initialState = { selectedItems: { Olives: 4 }, options: OPTIONS };

function getRender(initialState: any) {
  return function render(
    ui: ReactElement,
    {
      // initialState = reducerInitialState,
      store = createStore(cartReducer, initialState),
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }: any) {
      return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  };
}

describe("Checkout", () => {
  const history = createMemoryHistory();
  const routeComponentPropsMock = {
    history: history,
    location: {} as any,
    match: {} as any,
  };

  it("on render - renders a header with text 'Checkout'", () => {
    const render = getRender(initialState);
    const { container } = render(<Checkout {...routeComponentPropsMock} />);
    expect(getByText(container, "Checkout")).toBeInTheDocument();
  });

  it("redirects to 'home' page when selected items is not present", () => {
    const render = getRender({});
    spyOn(routeComponentPropsMock.history, "push");
    const { container } = render(<Checkout {...routeComponentPropsMock} />);
    expect(routeComponentPropsMock.history.push).toHaveBeenCalled();
    expect(routeComponentPropsMock.history.push).toHaveBeenCalledWith("/home");
  });

  describe("invalid input adds error CSS classes and error messages to the input elements", () => {
    let render,
      container,
      nameInput: HTMLInputElement | null,
      emailInput: HTMLInputElement | null;
    beforeEach(() => {
      render = getRender(initialState);
      container = render(<Checkout {...routeComponentPropsMock} />).container;
      nameInput = container.querySelector('input[type="text"][name="name"]');
      emailInput = container.querySelector('input[type="email"][name="email"]');
    });

    it("invalid name throws error message", () => {
      fireEvent.focus(nameInput as any);
      fireEvent.blur(nameInput as any);
      expect(nameInput?.classList.contains("border-danger")).toBeTruthy();
      expect(nameInput?.nextSibling?.textContent).toBe("Name is required");
      fireEvent.focus(nameInput as any);
      fireEvent.change(nameInput as any, { target: { value: "aash" } });
      fireEvent.blur(nameInput as any);
      expect(nameInput?.classList.contains("border-danger")).toBeFalsy();
      expect(nameInput?.nextSibling?.textContent).toBe("");
    });

    it("invalid email throws error message", () => {
      fireEvent.focus(emailInput as any);
      fireEvent.blur(emailInput as any);
      expect(emailInput?.classList.contains("border-danger")).toBeTruthy();
      expect(emailInput?.nextSibling?.textContent).toBe("Email is required");
      fireEvent.focus(emailInput as any);
      fireEvent.change(emailInput as any, { target: { value: "aash" } });
      fireEvent.blur(emailInput as any);
      expect(emailInput?.classList.contains("border-danger")).toBeTruthy();
      expect(emailInput?.nextSibling?.textContent).toBe(
        "Email format is invalid"
      );
      fireEvent.focus(emailInput as any);
      fireEvent.change(emailInput as any, {
        target: { value: "aashi@gmail.com" },
      });
      fireEvent.blur(emailInput as any);
      expect(emailInput?.classList.contains("border-danger")).toBeFalsy();
      expect(emailInput?.nextSibling?.textContent).toBe("");
    });
  });
});

export {};
