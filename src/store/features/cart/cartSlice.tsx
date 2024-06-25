import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "src/types/Product";

export interface ICartItem extends Product {
  count?: number;
}
export interface CartState {
  cart: ICartItem[];
  cartLength: number;
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  cartLength: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const findIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (findIndex < 0) {
        state.cart.push({ ...action.payload, count: 1 });
        state.cartLength += 1;
      } else {
        state.cart[findIndex].count! += 1;
      }
      state.totalPrice += action.payload.price;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const findIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (findIndex > -1) {
        const currentItem = state.cart[findIndex];
        state.totalPrice -= currentItem.price * currentItem.count!;
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.cartLength -= 1;
        if (state.cart.length === 0) {
          state.totalPrice = 0;
        }
      }
    },
    decrementCount: (state, action: PayloadAction<number>) => {
      const findIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (findIndex > -1) {
        const currentItem = state.cart[findIndex];
        if (currentItem.count! > 1) {
          state.cart[findIndex].count! -= 1;
          state.totalPrice -= currentItem.price;
        }
      }
    },
    incrementCount: (state, action: PayloadAction<number>) => {
      const findIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (findIndex > -1) {
        state.totalPrice += state.cart[findIndex].price;
        state.cart[findIndex].count! += 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, decrementCount, incrementCount } =
  cartSlice.actions;

export default cartSlice.reducer;
