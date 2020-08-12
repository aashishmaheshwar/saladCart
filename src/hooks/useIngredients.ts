import { useState, useEffect } from "react";

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  image: string;
}

const options: Array<Ingredient> = [
  {
    id: "C2-00",
    name: "Mustard seeds",
    price: 80,
    image:
      "http://img1.exportersindia.com/product_images/bc-small/dir_54/1611062/mustard-seeds-1208829.jpg",
  },
  {
    id: "C2-01",
    name: "Pepper",
    price: 120,
    image:
      "http://img1.exportersindia.com/product_images/bc-small/dir_23/674664/black-pepper-seed-1680115.jpg",
  },
  {
    id: "C2-02",
    name: "Cumin seeds/jeera",
    price: 180,
    image: "http://puritytest.in/public/img/product_images/jeera1_1_1.jpg",
  },
  {
    id: "C2-03",
    name: "Poppy seeds/Khus khus",
    price: 180,
    image:
      "http://img1.exportersindia.com/product_images/bc-small/dir_113/3382222/2-khas-khas-poppy-seeds-2203115.jpg",
  },
  {
    id: "C2-04",
    name: "Coriander seeds/Dhania",
    price: 180,
    image:
      "http://img1.exportersindia.com/product_images/bc-small/dir_105/3122483/watermark/eagle-coriander-seeds-1201536.jpg",
  },
  {
    id: "C2-05",
    name: "Fennel seeds",
    price: 180,
    image:
      "http://img1.exportersindia.com/product_images/bc-small/dir_115/3440565/fennel-seeds-1693027.jpg",
  },
  {
    id: "C2-06",
    name: "Dry ginger piece or powder",
    price: 180,
    image:
      "http://img1.exportersindia.com/product_images/bc-small/dir_62/1835594/ginger-powder-677521.jpg",
  },
  {
    id: "C2-07",
    name: "Black or white sesame seeds",
    price: 180,
    image:
      "http://img1.exportersindia.com/product_images/bc-small/dir_105/3144460/sesame-seeds-1947019.jpg",
  },
  {
    id: "C2-08",
    name: "Ajwain",
    price: 180,
    image: "https://4.imimg.com/data4/HJ/KJ/MY-22994316/ajwain-250x250.jpeg",
  },
  {
    id: "C2-09",
    name: "Hing/Asafetida",
    price: 180,
    image: "http://3.imimg.com/data3/RG/SE/MY-16380257/4-250x250.jpg",
  },
];

const initialSelectedObj = options.reduce(
  (acc, option) => ({
    ...acc,
    [option.name]: 0,
  }),
  {}
);

export function useIngredients() {
  const [selectedItems, setSelectedItems] = useState(initialSelectedObj as any);
  const [enableCheckout, setEnableCheckout] = useState(false);

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

  return [selectedItems, updateIngredientCount, options, enableCheckout];
}
