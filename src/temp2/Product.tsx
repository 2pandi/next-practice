import { ProductAddressStructure } from "./ProductAddressStructure";

export interface Product {
  productName: string;
  productPrice: number;
  productAddress: ProductAddressStructure;
}
