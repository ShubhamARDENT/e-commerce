import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../../interfaces/cartInterface";

interface CartState {
  cart: Products[];
}

const initialState: CartState = {
  cart: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add product to cart with inital quantity 1
    addtoCart: (state, action: PayloadAction<Products>) => {
      state.cart.push({ ...action.payload, quantity: 1 });
    },

    // increase quanity of product
    incrementQuantity: (state, action: PayloadAction<Products>) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct?.quantity) {
        existingProduct.quantity += 1;
      }
    },

    // deceremnt quantity of product
    decrementQuantity: (state, action: PayloadAction<Products>) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct?.quantity && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
    },
  },
});

export const { addtoCart, decrementQuantity, incrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
