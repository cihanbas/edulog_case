import { Product, ProductResponse } from "src/types/Product";

export const searchTextInData = (text: string, data: ProductResponse) => {
  if (!text) return [];
  const result: Product[] = [];
  data.forEach((item) => {
    if (item.title.includes(text)) {
      result.push(item);
    }
  });
  return result;
};
