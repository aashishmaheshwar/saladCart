import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

const Checkout: React.FC<RouteComponentProps> = ({ history }) => {
  const { options, selectedItems } = useSelector((state) => state) as any;

  useEffect(() => {
    if (!selectedItems) {
      history.push("/home");
    }
  }, []);

  return <div>Checkout page{JSON.stringify(selectedItems, null, 2)}</div>;
};

export default Checkout;
