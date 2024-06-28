import { AllCategoryName } from "src/types/Categories";
import { Product } from "src/types/Product";
import { COLORS } from "src/utils/theme";

export const filterProducts = (
  text: string,
  data: Product[],
  minPrice: number = 0,
  maxPrice: number = 0,
  category: string = ""
) => {
  const result: Product[] = [];
  data.forEach((item) => {
    if (item.title.includes(text)) {
      if (minPrice > 0 && item.price < minPrice) {
        return;
      } else if (maxPrice > 0 && item.price > maxPrice) {
        return;
      } else if (category && item.category !== category) {
        return;
      }
      result.push(item);
    }
  });

  return result;
};

const getCategoryColor = (item: string, selectCategory: string) => {
  if (selectCategory === "" && item === AllCategoryName.All) {
    return COLORS.primary;
  }
  return selectCategory === item ? COLORS.primary : COLORS.black;
};
const getColorOfFilterCategory = (item: string, selectCategory: string) => {
  if (selectCategory === "" && item === AllCategoryName.All) {
    return COLORS.white;
  }
  return selectCategory === item ? COLORS.primary : COLORS.white;
};
export { getCategoryColor, getColorOfFilterCategory };
