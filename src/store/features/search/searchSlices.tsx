import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/services/api";
import { AllCategoryName } from "src/types/Categories";
import { Product } from "src/types/Product";
import { filterProducts } from "src/utils/helper";
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const res = await api.getAllCategories();
  return res.data;
});
export const getAllProducts = createAsyncThunk("fetchAllProducts", async () => {
  const res = await api.getAllProducts();
  return res.data;
});

type FilterOptions = {
  minPrice?: number;
  maxPrice?: number;
  selectCategory?: string;
};
export interface CartState extends Required<FilterOptions> {
  categories: string[];
  isLoading: boolean;
  error: string;
  products: Product[];
  searchResult: Product[];
  searchText: string;
  filterBadge: number;
}

const initialState: CartState = {
  categories: [],
  isLoading: true,
  error: "",
  selectCategory: "",
  products: [],
  minPrice: 0,
  maxPrice: 0,
  searchText: "",
  searchResult: [],
  filterBadge: 0,
};

const searchSlices = createSlice({
  name: "searchSlices",
  initialState,
  reducers: {
    selectFilter: (state, action: PayloadAction<FilterOptions>) => {
      const {
        selectCategory = "",
        maxPrice = 0,
        minPrice = 0,
      } = action.payload;
      state.selectCategory = selectCategory;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
      state.filterBadge = getFilterBadgeValue(action.payload);
      state.searchResult = filterProducts(
        state.searchText,
        state.products,
        minPrice,
        maxPrice,
        selectCategory
      );
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.searchResult = filterProducts(
        state.searchText,
        state.products,
        state.minPrice,
        state.maxPrice,
        state.selectCategory
      );
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.length > 0) {
        state.categories = [AllCategoryName.All, ...action.payload];
      }
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.length > 0) {
        state.products = action.payload;
      }
    });
  },
});

const getFilterBadgeValue = (values: FilterOptions) => {
  let badgeValue = 0;
  if (values.maxPrice && values.maxPrice > 0) {
    badgeValue += 1;
  }
  if (values.minPrice && values.minPrice > 0) {
    badgeValue += 1;
  }
  if (values.selectCategory) {
    badgeValue += 1;
  }
  return badgeValue;
};

export const { selectFilter, searchProducts } = searchSlices.actions;
export default searchSlices.reducer;
