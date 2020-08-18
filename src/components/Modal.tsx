import React from "react";
import ReactDom from "react-dom";
import { FaWindowClose } from "react-icons/fa";
import "./../css/Modal.css";

const Modal: React.FC<{
  open: boolean;
  children: any;
  onClose: any;
  title?: string;
}> = ({ open, children, onClose, title = "Summary" }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal__overlay" />
      <div className="modal__main">
        <div>
          <h3 style={{ display: "inline-block", float: "left", color: "red" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{ float: "right" }}
            className="btn btn-light btn-sm"
          >
            <FaWindowClose />
          </button>
        </div>
        <br />
        <section style={{ overflowY: "scroll", overflowX: "hidden" }}>
          {children}
        </section>
      </div>
    </>,
    document.querySelector("#portal") as Element
  );
};

export default Modal;
