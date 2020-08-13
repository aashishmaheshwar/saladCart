import React from "react";
import Modal from "../Modal";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Modal", () => {
  xit("on render - renders the content passed inside", () => {
    const onClose = jest.fn();
    const bodyText = "This content shows up in the popup";
    render(
      <Modal open={true} onClose={onClose} title="Summary">
        {`${bodyText}`}
      </Modal>
    );
    // Assert
    expect(screen.getByText(bodyText)).toBeTruthy();
    // Act
    fireEvent.click(screen.getByText(/close/i));
    // Assert
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

export {};
