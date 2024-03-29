import React, { useEffect, useState } from "react";
import { Ingredient } from "../hooks/useIngredients";
import { AnyRecordWithTtl } from "dns";

const CartSummary: React.FC<{
  options: Array<Ingredient>;
  selectedItems: any;
}> = ({ options, selectedItems }) => {
  const [tableData, setTableData] = useState([] as any);

  useEffect(() => {
    const tempData = options
      .filter((option) => selectedItems[option.name] > 0)
      .map(({ name, id, price }) => {
        return {
          name,
          id,
          price,
          quantity: selectedItems[name],
          totalPrice: selectedItems[name] * price,
        };
      });
    setTableData(() => tempData);
  }, [options, selectedItems]);

  return (
    <div>
      <h4>Order Summary</h4>
      <br />
      <section
        className="row justify-content-center"
        style={{ overflowX: "auto" }}
      >
        <table className="col-sm-7 table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item: any, index: number) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))}
            <tr key={`Grand Total`}>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>Grand Total: </b>
              </td>
              <td>
                <b>
                  {tableData.reduce(
                    (acc: number, { totalPrice }: { totalPrice: number }) =>
                      acc + totalPrice,
                    0
                  )}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default React.memo(CartSummary);
