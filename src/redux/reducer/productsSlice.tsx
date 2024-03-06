import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addUrl,
  categoryUrl,
  deleteUrl,
  editUrl,
  productsUrl,
} from "../../utilities/Constants";

export const token = localStorage.getItem("token");
const initialState = {
  productsList: [
    {
      productId: 0,
      productName: "",
      price: 0,
      quantity: 0,
      weight: "1",
      categoryImage: "",
      categoryName: "",
      productImage: ["", ""],
      discount: 0,
      description: "",
      productCreatedAt: "",
      active: false,
    },
  ],
  isLoading: false,
  status: "loading",
  sellerProductMesage: "",
  categoryList: [
    {
      categoryId: 0,
      categoryName: "",
    },
  ],
};

const Slider = createSlice({
  name: "Slider",
  initialState: initialState,
  reducers: {
    emptySellerProductMsg: (state) => {
      state.sellerProductMesage = "";
    },
    add: () => {},
    handleOptions: (state, action) => {
      const newData = state.productsList.map((item) => {
        if (item.productId === action.payload) {
          item.active = !item.active;
          return item;
        } else {
          item.active = false;
          return item;
        }
      });
      state.productsList = newData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsData.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(productsData.fulfilled, (state, action) => {
        state.productsList = action.payload;
      })
      .addCase(productsData.rejected, (state, action) => {})

      .addCase(addProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.sellerProductMesage = action.payload;
      })

      .addCase(editProduct.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(action.payload.data.message);
        state.sellerProductMesage = action.payload.data.message;
      })
      .addCase(productCategory.fulfilled, (state, action) => {
        state.categoryList = action.payload;
      });
  },
});

export const productsData = createAsyncThunk("products", async () => {
  const response = await fetch(productsUrl);
  const res = await response.json();
  return res.data.data;
});

export const deleteProduct = createAsyncThunk(
  "deleteItem",
  async (id: number) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = axios.delete(deleteUrl + id, options);
    return response;
  }
);

export const editProduct = createAsyncThunk(
  "editItem",
  async (form: FormData) => {
    console.log(form);
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    };
    const response = await fetch(editUrl, options);
    console.log(response);
  }
);
export const productCategory = createAsyncThunk("category", async () => {
  const response = await fetch(categoryUrl);
  const res = await response.json();
  return res.data.data;
});

export const addProduct = createAsyncThunk("addItem", async (arg: any) => {
  console.log(...arg);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: arg,
  };

  const response = await fetch(addUrl, options);
  const res = await response.json();
  console.log(res.data);
  return res.data;
});

export const SliderReducer = Slider.reducer;
export const { add, handleOptions, emptySellerProductMsg } = Slider.actions;
