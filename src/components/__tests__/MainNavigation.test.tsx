import * as hooks from "react-redux";
import * as routerhooks from "react-router-dom";
import { createMemoryHistory, createLocation } from "history";
import MainNavigation from "../MainNavigation";
import React from "react";
import {
  fireEvent,
  queryByText,
  waitForElement,
  screen,
} from "@testing-library/dom";
import { render } from "@testing-library/react";
import { Router, BrowserRouter, MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-router-dom"),
}));

describe("MainNavigation", () => {
  const history = createMemoryHistory();
  //   history.location.pathname = "/ingredients";
  const routeComponentPropsMock = {
    history: history,
    location: createLocation("/ingredients"),
    match: {} as any,
  };
  // const locationMock = jest.mock()
  const dispathMock = jest.fn();
  jest.spyOn(hooks, "useSelector").mockImplementation(() => false);
  jest.spyOn(hooks, "useDispatch").mockImplementation(() => dispathMock);
  jest.spyOn(routerhooks, "useLocation").mockReturnValue({
    ...createLocation("/ingredients"),
    pathname: "/ingredients",
  });

  it('shows "The Salad Store"', () => {
    const { container } = render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );
    const header = queryByText(container, "The Salad Store");
    expect(header).toBeInTheDocument();
  });

  it('shows button when pathname is "ingredients"', async () => {
    jest.spyOn(hooks, "useSelector").mockImplementation(() => true);
    const instance = render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );
    const cartBtn = screen.queryByText(/Proceed to checkout/i);
    expect(cartBtn).toBeInTheDocument();
  });

  it(`'CHECKOUT_TRIGGER' action to be dispatched when 'Proceed to checkout' button is clicked`, () => {
    jest.spyOn(hooks, "useSelector").mockImplementation(() => true);
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );
    const cartBtn = screen.queryByText(/Proceed to checkout/i);
    fireEvent.click(cartBtn as HTMLButtonElement);
    expect(dispathMock).toHaveBeenLastCalledWith(
      jasmine.objectContaining({
        type: "CHECKOUT_TRIGGER",
      })
    );
  });
});

export {};
