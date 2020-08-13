import { renderHook, act } from "@testing-library/react-hooks";
import { useIngredients } from "../useIngredients";

describe("useIngredients", () => {
  it("returns 11 ingredients as options", async () => {
    const { result, wait } = renderHook(() => useIngredients(null));
    await wait(() => {
      expect((result.current[2] as any).length).toEqual(11);
    });
  });

  it("defaults to false for enableCheckout if initial value is null", async () => {
    const { result, wait } = renderHook(() => useIngredients(null));
    await wait(() => {
      expect(result.current[3]).toBeFalsy();
    });
  });

  it("using update method must update the selected items and set enable/disable property", async () => {
    const { result, wait, rerender } = renderHook(() => useIngredients(null));
    await wait(() => {
      (result.current[0] as any)("Olives", 10);
      rerender();
      expect(result.current[3]).toBeTruthy();
    });
    await wait(() => {
      (result.current[0] as any)("Olives", 0);
      rerender();
      expect(result.current[3]).toBeFalsy();
    });
    await wait(() => {
      (result.current[0] as any)("Olives", "abc");
      rerender();
      expect(result.current[3]).toBeFalsy();
    });
  });
});

export {};
