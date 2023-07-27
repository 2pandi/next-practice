import { NewProductAddressStructure } from "./NewProductAddressStructure";
import { Product } from "./Product";

export interface NewProduct extends Product {
  productAddress: NewProductAddressStructure;
}

let productInfo: NewProduct = {
  productName: "Nike - Air Max",
  productPrice: 500,
  productAddress: {
    zipCode: "1233",
    houseNumber: 345,
    streetName: "brooklyn street",
  },
};

console.log(productInfo.productName);
console.log(productInfo.productPrice);
console.log(productInfo.productAddress);
