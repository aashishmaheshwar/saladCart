import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import CartSummary from "./CartSummary";

const Checkout: React.FC<RouteComponentProps> = ({ history }) => {
  const { options, selectedItems } = useSelector((state) => state) as any;
  const [ordered, setOrdered] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    if (!selectedItems) {
      history.push("/home");
    }
  }, []);

  const buildOrderDetailsForm = () => {
    return (
      <>
        <h4>Contact Details</h4>
        <br />
        <div className="row justify-content-center">
          <label className="col-sm-3" style={{ textAlign: "right" }}>
            Name*
          </label>
          <input
            type="text"
            name="name"
            required
            className="col-sm-4 col-10"
            aria-label="Enter the name"
          />
        </div>
        <br />
        <div className="row justify-content-center">
          <label className="col-sm-3" style={{ textAlign: "right" }}>
            Email*
          </label>
          <input
            type="email"
            name="email"
            aria-label="Enter the email"
            required
            className="col-sm-4 col-10"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
          />
        </div>
        <br />
        <div className="row justify-content-center">
          <label className="col-sm-3" style={{ textAlign: "right" }}>
            Additional Notes
          </label>
          <textarea
            name="notes"
            className="col-sm-4 col-10"
            aria-label="Enter additional notes"
          />
        </div>
        <br />
      </>
    );
  };

  return (
    <section style={{ width: "100vw" }}>
      <h1>Checkout</h1>
      <br />
      <br />
      {options && (
        <CartSummary options={options} selectedItems={selectedItems} />
      )}
      {buildOrderDetailsForm()}
    </section>
  );
};

export default Checkout;
