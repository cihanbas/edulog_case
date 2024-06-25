import { ProductResponse } from "src/types/Product";
import axios from "./instance";

export const api = {
  getAllCategories: () => axios.get<string[]>("products/categories"),
  getAllProducts: (category?: string) =>
    axios.get<ProductResponse>(
      category ? `products/category/${category}` : "products"
    ),
  getProductByCategory: (category: string) =>
    axios.get<ProductResponse>(`products/category/${category}`),
  productDetail: (productID: string) => axios.get(`products/${productID}`),
};
