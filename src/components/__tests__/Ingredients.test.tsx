import React, { ReactElement } from "react";
// import App from "../../App";
// import { render, getByText, fireEvent, screen } from "../../utils/test-utils";
import Ingredients from "../Ingredients";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import cartReducer from "../../reducers/cart-reducer";
import { Provider } from "react-redux";
import { render as rtlRender, getByText } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import ReactDOM from "react-dom";
import * as hooks from "../../hooks/useIngredients";

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

describe("Ingredients", () => {
  const history = createMemoryHistory();
  const routeComponentPropsMock = {
    history: history,
    location: {} as any,
    match: {} as any,
  };

  it("on render - renders a header with text 'Ingredients'", () => {
    const render = getRender(initialState);
    const updateIngredientCount = jest.fn();
    jest
      .spyOn(hooks, "useIngredients")
      .mockImplementation(() => [
        updateIngredientCount,
        { ...initialState.selectedItems },
        OPTIONS,
        false,
      ]);
    const { container } = render(<Ingredients {...routeComponentPropsMock} />);
    expect(getByText(container, "Ingredients")).toBeInTheDocument();
  });

  it(`checkout action triggers page navigation to 'Checkout' page`, () => {
    const render = getRender({ ...initialState, checkoutTrigger: true });
    const updateIngredientCount = jest.fn();
    jest
      .spyOn(hooks, "useIngredients")
      .mockImplementation(() => [
        updateIngredientCount,
        { ...initialState.selectedItems },
        OPTIONS,
        false,
      ]);
    spyOn(routeComponentPropsMock.history, "push");
    const { container } = render(<Ingredients {...routeComponentPropsMock} />);
    expect(routeComponentPropsMock.history.push).toHaveBeenCalled();
    expect(routeComponentPropsMock.history.push).toHaveBeenCalledWith(
      "/checkout"
    );
  });

  it("triggers update when increment/decremnet button is clicked for any item", () => {
    const render = getRender({ ...initialState, checkoutTrigger: true });
    const updateIngredientCount = jest.fn();
    jest
      .spyOn(hooks, "useIngredients")
      .mockImplementation(() => [
        updateIngredientCount,
        { ...initialState.selectedItems },
        OPTIONS,
        false,
      ]);
    const { container } = render(<Ingredients {...routeComponentPropsMock} />);
    const firstIngredientDecrementBtn = container.querySelector(
      'input[type="text"]'
    )?.nextSibling;
    fireEvent.click(firstIngredientDecrementBtn as HTMLElement);
    expect(updateIngredientCount).toHaveBeenCalled();
    const firstIngredientIncrementBtn = container.querySelector(
      'input[type="text"]'
    )?.previousSibling;
    fireEvent.click(firstIngredientIncrementBtn as HTMLElement);
    expect(updateIngredientCount).toHaveBeenCalled();
  });

  it("triggers update when count is changed for any ingredient", () => {
    const render = getRender({ ...initialState, checkoutTrigger: true });
    const updateIngredientCount = jest.fn();
    jest
      .spyOn(hooks, "useIngredients")
      .mockImplementation(() => [
        updateIngredientCount,
        { ...initialState.selectedItems },
        OPTIONS,
        false,
      ]);
    const { container } = render(<Ingredients {...routeComponentPropsMock} />);
    const firstIngredientText = container.querySelector('input[type="text"]');
    fireEvent.change(firstIngredientText as HTMLElement, {
      target: { value: "20" },
    });
    expect(updateIngredientCount).toHaveBeenLastCalledWith("Cucumber", "20");
  });

  it("shows loading when no ingredients are provided", () => {
    const render = getRender({ ...initialState, checkoutTrigger: true });
    const updateIngredientCount = jest.fn();
    jest
      .spyOn(hooks, "useIngredients")
      .mockImplementation(() => [
        updateIngredientCount,
        { ...initialState.selectedItems },
        null as any,
        false,
      ]);
    const { container } = render(<Ingredients {...routeComponentPropsMock} />);
    expect(getByText(container, "Loading...")).toBeInTheDocument();
  });
});

export {};
