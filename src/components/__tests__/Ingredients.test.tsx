import React, { ReactElement } from "react";
// import App from "../../App";
// import { render, getByText, fireEvent, screen } from "../../utils/test-utils";
import Ingredients from "../Ingredients";
import { createMemoryHistory } from "history";
// import { render } from "@testing-library/react";
import { createStore } from "redux";
import cartReducer from "../../reducers/cart-reducer";
import { Provider } from "react-redux";
import { render as rtlRender, getByText } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import ReactDOM from "react-dom";
// import { useIngredients } from "../../hooks/useIngredients";
import * as hooks from "../../hooks/useIngredients";

// jest.mock('../../hooks/useIngredients');

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
    // useIngredients.
    jest
      .spyOn(hooks, "useIngredients")
      .mockImplementation(() => [
        jest.fn(),
        { ...initialState.selectedItems },
        OPTIONS,
        false,
      ]);
    // jest.useFakeTimers();
    const { container } = render(<Ingredients {...routeComponentPropsMock} />);
    // jest.advanceTimersByTime(2000);
    expect(getByText(container, "Ingredients")).toBeInTheDocument();
  });
});

export {};
