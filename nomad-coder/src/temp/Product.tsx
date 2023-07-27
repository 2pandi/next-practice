export interface Product {
  productName: string;
  productPrice: number;
  productAddress: {
    houseNumber: number;
    streetName: string;
  };
}
