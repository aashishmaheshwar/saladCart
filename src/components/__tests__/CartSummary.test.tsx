import React from "react";
import { render } from "@testing-library/react";
import CartSummary from "../CartSummary";

describe("Modal", () => {
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
  const selectedItems = { Olives: 4 };

  it("on render - renders the table with total price of 160", () => {
    const { container } = render(
      <CartSummary options={OPTIONS} selectedItems={selectedItems} />
    );
    const allBolds = Array.from(container.querySelectorAll("b"));
    const expected = allBolds.find(
      ({ textContent }) => (textContent as string).trim() === "160"
    );
    // Assert
    expect(expected).toBeInTheDocument();
  });
});

export {};
