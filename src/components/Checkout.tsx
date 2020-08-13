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

const EMAIL_PATTERN = /^[a-z]?[a-z0-9._%+-]+@[a-z]?[a-z0-9.-]+\.[a-z]{2,3}$/i;

const Checkout: React.FC<RouteComponentProps> = ({ history }) => {
  const { options, selectedItems } = useSelector((state) => state) as any;
  const [ordered, setOrdered] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    notes: "",
  });
  const dispatch = useDispatch();
  // const nameRef: RefObject<HTMLInputElement> = useRef() as any;
  // const emailRef: RefObject<HTMLInputElement> = useRef() as any;
  // const formRef: RefObject<HTMLFormElement> = useRef() as any;

  useEffect(() => {
    if (!selectedItems) {
      history.push("/home");
    }
  }, []);

  const goToHome = () => {
    // if (ordered) {
    dispatch({
      type: "CLEAR_CART",
    });
    history.push("/home");
    // }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.dir("submit event is ", e);
    setOrdered(true);
  };

  const handleFormValueChange = (e: ChangeEvent) => {
    const { name, value } = e.target as any;
    setOrderDetails((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  // const checkValidity = (e: FocusEvent<HTMLInputElement>) => {
  //   const { name } = e.target as any;
  //   // formRef.current?.checkValidity();
  //   // if (name === "email") {
  //   //   // emailRef.current?.checkValidity();
  //   //   if (!emailRef.current?.validity.valid)
  //   //     emailRef.current?.setCustomValidity("Enter a valid email address");
  //   // } else {
  //   //   if (!emailRef.current?.validity.valid)
  //   //     nameRef.current?.setCustomValidity("Name cannot be left blank");
  //   // }
  // };

  const buildOrderDetailsForm = () => {
    return (
      <>
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
        <h4>Contact Details</h4>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <label className="col-sm-4" style={{ textAlign: "right" }}>
              Name*
            </label>
            <input
              // ref={nameRef}
              type="text"
              name="name"
              required
              className="col-sm-3 col-10 form-control"
              aria-label="Enter the name"
              value={orderDetails.name}
              onChange={handleFormValueChange}
              // onBlur={checkValidity}
            />
          </div>
          <br />
          <div className="row justify-content-center">
            <label className="col-sm-4" style={{ textAlign: "right" }}>
              Email*
            </label>
            <input
              // ref={emailRef}
              type="email"
              name="email"
              aria-label="Enter the email"
              required
              className="col-sm-3 col-10 form-control"
              pattern={`^[a-zA-Z]?[a-zA-Z0-9._%+-]+@[a-zA-Z]?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$`}
              value={orderDetails.email}
              onChange={handleFormValueChange}
              // onBlur={checkValidity}
            />
          </div>
          <br />
          <div className="row justify-content-center">
            <label className="col-sm-4" style={{ textAlign: "right" }}>
              Additional Notes
            </label>
            <textarea
              name="notes"
              className="col-sm-3 col-10 form-control"
              aria-label="Enter additional notes"
              value={orderDetails.notes}
              onChange={handleFormValueChange}
            />
          </div>
          <br />
          <div className="row justify-content-center">
            <div className="col-sm-4"></div>
            <div
              className="col-sm-3"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: 0,
              }}
            >
              <button
                type="submit"
                disabled={
                  !orderDetails.name || !EMAIL_PATTERN.test(orderDetails.email)
                }
              >
                Order
              </button>
            </div>
          </div>
        </form>
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
