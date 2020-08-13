import React from "react";
import App from "../../App";
import {
  render,
  getByText,
  fireEvent,
  screen,
  waitForElement,
} from "../../utils/test-utils";

// const mockFn = jest.fn();

describe("App", () => {
  it("on render - renders a button with text 'Order now'", () => {
    const { container } = render(<App />);
    expect(getByText(container, "Order now")).toBeInTheDocument();
  });

  it("on render - renders the title 'The Salad Store' in nav bar", () => {
    const { container } = render(<App />);
    expect(getByText(container, "The Salad Store")).toBeInTheDocument();
  });

  it(`clicking 'Order Now' button takes us to the 'Ingredients' page`, async () => {
    jest.useFakeTimers();
    render(
      <React.Suspense fallback="test loading">
        <App />
      </React.Suspense>
    );
    fireEvent.click(screen.getByText("Order now"));
    jest.advanceTimersByTime(2000);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // const lazyElement = await waitForElement(() =>
    //   screen.getByText("Ingredients")
    // );
    // expect(lazyElement).toBeInTheDocument();
  });
});

export {};
