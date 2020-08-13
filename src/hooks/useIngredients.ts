import { useState, useEffect } from "react";

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  image: string;
}

const OPTIONS: Array<Ingredient> = [
  {
    id: "C2-00",
    name: "Lettuce",
    price: 30,
    image: "/images/Lettuce.jpg",
  },
  {
    id: "C2-01",
    name: "Brocolli",
    price: 50,
    image: "/images/Brocolli.jpg",
  },
  {
    id: "C2-02",
    name: "Onion",
    price: 10,
    image: "/images/Onions.jpg",
  },
  {
    id: "C2-03",
    name: "Tomato",
    price: 10,
    image: "/images/Tomato.jpg",
  },
  {
    id: "C2-04",
    name: "Coriander",
    price: 15,
    image: "/images/Coriander.jpg",
  },
  {
    id: "C2-05",
    name: "Zuccini",
    price: 40,
    image: "/images/Zuccini.jpg",
  },
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
  {
    id: "C2-08",
    name: "Jalapeno",
    price: 45,
    image: "/images/Jalapeno.jpg",
  },
  {
    id: "C2-09",
    name: "Mushroom",
    price: 50,
    image: "/images/Mushroom.jpg",
  },
  {
    id: "C2-10",
    name: "Bell Pepper",
    price: 30,
    image: "/images/BellPepper.jpg",
  },
];

export function useIngredients(defaultSelectedItems: Object | null = null) {
  const [selectedItems, setSelectedItems] = useState({} as Object);
  const [enableCheckout, setEnableCheckout] = useState(false);
  const [options, setOptions] = useState([] as Array<Ingredient>);

  useEffect(() => {
    const mockAPIPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(OPTIONS);
      }, 700);
    });
    mockAPIPromise
      .then((response) => {
        setOptions(() => response as Array<Ingredient>);
        const initialSelectedObj = (response as Array<Ingredient>).reduce(
          (acc, option) => ({
            ...acc,
            [option.name]: 0,
          }),
          {}
        );
        setSelectedItems(() => {
          return defaultSelectedItems === null
            ? (initialSelectedObj as any)
            : { ...initialSelectedObj, ...(defaultSelectedItems as Object) };
        });
      })
      .catch(() => {
        alert("Failed to fetch Ingredients. Try again later.");
      });
  }, []);

  useEffect(() => {
    if (
      Object.entries(selectedItems).some(
        ([key, value]) => (value as number) > 0
      )
    ) {
      !enableCheckout && setEnableCheckout(true);
    } else {
      enableCheckout && setEnableCheckout(false);
    }
  }, [selectedItems]);

  const updateIngredientCount = (
    ingredientName: string,
    value: string | number
  ) => {
    if (/^\d+$/.test(value + "")) {
      setSelectedItems(() => {
        return {
          ...selectedItems,
          [ingredientName]: +value,
        };
      });
    } else {
      setSelectedItems(() => {
        return {
          ...selectedItems,
          [ingredientName]: 0,
        };
      });
    }
  };

  return [updateIngredientCount, selectedItems, options, enableCheckout];
}
