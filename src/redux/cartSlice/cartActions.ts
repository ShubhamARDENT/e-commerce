import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../../interfaces/cartInterface";

import { ICategories } from "../../interfaces/categoryinterface";

// cart interface
interface CartState {
  cart: Products[];
  mainData: Products[];
  status: string;
  totalItems: number;
}

const initialState: CartState = {
  cart: [],
  mainData: [],
  status: "idle",
  totalItems: 0,
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
        (
          state,
          action: PayloadAction<{ products: Products[]; total: number }>
        ) => {
          state.status = "fullfilled";
          state.mainData = action.payload.products;
          state.totalItems = action.payload.total;
        }
      )
      .addCase(apiThunk.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const apiThunk = createAsyncThunk(
  "apiCall",
  async ({
    page,
    limit,
    search,
    category,
  }: {
    page: number;
    limit: number;
    search: string;
    category: string;
  }) => {
    const skip = (page - 1) * limit;

    //  show products by catrgory

    /**
     * search for product or display all products
     */

    if (category) {
      const data = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const response = await data.json();
      return { products: response.products, total: response.total };
    }

    if (search) {
      const data = await fetch(
        `https://dummyjson.com/products/search?q=${search}`
      );
      const response = await data.json();
      return { products: response.products, total: response.total };
    }

    const data = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,id,thumbnail,price,description,category`
    );
    const response = await data.json();
    return { products: response.products, total: response.total };
  }
);

export const { addtoCart, decrementQuantity, incrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
