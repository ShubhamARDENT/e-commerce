import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../../interfaces/cartInterface";

interface CartState {
  cart: Products[];
  mainData: Products[];
  status: string;
}

const initialState: CartState = {
  cart: [],
  mainData: [],
  status: "idle",
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

  extraReducers: (builder) => {
    builder
      .addCase(apiThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        apiThunk.fulfilled,
        (state, action: PayloadAction<Products[]>) => {
          state.status = "fullfilled";
          state.mainData = action.payload;
        }
      )
      .addCase(apiThunk.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const apiThunk = createAsyncThunk("apiCall", async () => {
  const data = await fetch(
    "https://dummyjson.com/products?limit=12&select=title,price,id,thumbnail,price,description,category"
  );
  const response = await data.json();
  return response.products;
});

export const { addtoCart, decrementQuantity, incrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
