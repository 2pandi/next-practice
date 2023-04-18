import { Product } from "./Product";

export type NewProduct = Product & {
  productAddress: {
    zipCode: string;
  };
};

let productInfo: NewProduct = {
  productName: "Nike - Air Max",
  productPrice: 500,
  productAddress: {
    houseNumber: 1233,
    streetName: "brooklyn street",
    zipCode: "1233",
  },
};

console.log(productInfo.productName);
console.log(productInfo.productPrice);
console.log(productInfo.productAddress);
