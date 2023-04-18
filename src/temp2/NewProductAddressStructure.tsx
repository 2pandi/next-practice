import { ProductAddressStructure } from "./ProductAddressStructure";

export interface NewProductAddressStructure extends ProductAddressStructure {
  zipCode: string;
}
