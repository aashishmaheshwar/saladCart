import React, { CSSProperties } from "react";
import ReactDom from "react-dom";
import { FaWindowClose } from "react-icons/fa";

const MODAL_STYLES: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  width: "50%",
  height: "75%",
  display: "flex",
  flexDirection: "column",
};

const OVERLAY_STYLES: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const Modal: React.FC<{
  open: boolean;
  children: any;
  onClose: any;
  title?: string;
}> = ({ open, children, onClose, title = "Summary" }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
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
