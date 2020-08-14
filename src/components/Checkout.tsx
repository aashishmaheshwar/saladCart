import React, {
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
  useRef,
  RefObject,
  FocusEvent,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import CartSummary from "./CartSummary";
import Modal from "./Modal";
import "./../css/Checkout.css";

const EMAIL_PATTERN = /^[a-z]+[a-z0-9._%+-]+@[a-z]+[a-z0-9.-]+\.[a-z]{2,3}$/i;

const Checkout: React.FC<RouteComponentProps> = ({ history }) => {
  const { options, selectedItems } = useSelector((state) => state) as any;
  const [ordered, setOrdered] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    notes: "",
  });
  const dispatch = useDispatch();
  const nameRef: RefObject<HTMLInputElement> = useRef() as any;
  const emailRef: RefObject<HTMLInputElement> = useRef() as any;
  // const formRef: RefObject<HTMLFormElement> = useRef() as any;

  useEffect(() => {
    if (!selectedItems) {
      history.push("/home");
    }
  }, []);

  const goToHome = () => {
    dispatch({
      type: "CLEAR_CART",
    });
    history.push("/home");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.dir("submit event is ", e);
    setOrdered(true);
  };

  const handleFormValueChange = (e: ChangeEvent) => {
    const { name, value } = e.target as any;
    if ((e.target as any).validity.valid) {
      (e.target as any).classList.remove("border", "border-danger");
      removeErrorMessage(name);
    }
    setOrderDetails((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const removeErrorMessage = (name: string) => {
    switch (name) {
      case "name": {
        if (nameRef.current) {
          nameRef.current.textContent = "";
        }
        break;
      }
      case "email": {
        if (emailRef.current) {
          emailRef.current.textContent = "";
        }
        break;
      }
    }
  };

  const displayErrorMessage = (
    name: string,
    e: FocusEvent<HTMLInputElement>
  ) => {
    switch (name) {
      case "name": {
        if (nameRef.current) {
          nameRef.current.textContent = "Name is required";
        }
        break;
      }
      case "email": {
        if (emailRef.current) {
          if (e.target.value === "")
            emailRef.current.textContent = "Email is required";
          else emailRef.current.textContent = "Email format is invalid";
        }
        break;
      }
    }
  };

  const checkValidity = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target as any;
    if (!e.target.validity.valid) {
      e.target.classList.add("border", "border-danger");
      displayErrorMessage(name, e);
    } else {
      e.target.classList.remove("border", "border-danger");
      removeErrorMessage(name);
    }
  };

  const buildModal = () => {
    return (
      <Modal open={ordered} onClose={goToHome}>
        {options && (
          <CartSummary options={options} selectedItems={selectedItems} />
        )}
        <br />
        <h4>Customer Details</h4>
        <ul style={{ listStyle: "none" }}>
          {Object.entries(orderDetails).map(([key, value]) => {
            return (
              <li key={key}>
                <span style={{ width: "10%" }}>{key}</span> - <b>{value}</b>
              </li>
            );
          })}
        </ul>
        <br />
        <b>Thank You!! Delivery is on its way :)</b>
      </Modal>
    );
  };

  const buildOrderDetailsForm = () => {
    return (
      <>
        {buildModal()}
        <h4>Contact Details</h4>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <label className="col-sm-4 col-10 checkout--field__label">
              Name<span className="checkout__required">*</span>
            </label>
            <input
              // ref={nameRef}
              type="text"
              name="name"
              required
              className="col-sm-4 col-10 form-control"
              aria-label="Enter the name"
              value={orderDetails.name}
              onChange={handleFormValueChange}
              onBlur={checkValidity}
            />
            <div
              ref={nameRef}
              className="col-sm-3 col-10 checkout--field__error"
            ></div>
          </div>
          <br />
          <div className="row justify-content-center">
            <label className="col-sm-4 col-10 checkout--field__label">
              Email<span className="checkout__required">*</span>
            </label>
            <input
              // ref={emailRef}
              type="email"
              name="email"
              aria-label="Enter the email"
              required
              className="col-sm-4 col-10 form-control"
              pattern={`^[a-zA-Z]+[a-zA-Z0-9._%+-]+@[a-zA-Z]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$`}
              value={orderDetails.email}
              onChange={handleFormValueChange}
              onBlur={checkValidity}
            />
            <div
              ref={emailRef}
              className="col-sm-3 col-10 checkout--field__error"
            ></div>
          </div>
          <br />
          <div className="row justify-content-center">
            <label className="col-sm-4 col-10 checkout--field__label">
              Additional Notes
            </label>
            <textarea
              name="notes"
              className="col-sm-4 col-10 form-control"
              aria-label="Enter additional notes"
              value={orderDetails.notes}
              onChange={handleFormValueChange}
            />
            <div className="col-sm-3 col-10 checkout--field__error"></div>
          </div>
          <br />
          <div className="row justify-content-center">
            <div className="col-sm-4 col-10"></div>
            <div className="col-sm-4 col-10 checkout--orderBtn__wrapper">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={
                  !orderDetails.name || !EMAIL_PATTERN.test(orderDetails.email)
                }
              >
                Order
              </button>
            </div>
            <div className="col-sm-3 col-10 checkout--field__error"></div>
          </div>
        </form>
      </>
    );
  };

  return (
    <section className="checkout__mainwrapper">
      <h1>Checkout</h1>
      <br />
      <br />
      <div className="row">
        <div className="col-md-6 col-12">
          {options && (
            <CartSummary options={options} selectedItems={selectedItems} />
          )}
        </div>
        <div className="col-md-6 col-12">{buildOrderDetailsForm()}</div>
      </div>
    </section>
  );
};

export default Checkout;
