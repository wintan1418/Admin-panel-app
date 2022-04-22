import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import { setProductFields } from "../../helpers/product_helpers";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsCount: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload.products;
      state.productsCount = action.payload.count;
    },
    setProduct: (state, action) => {
      state.products = state.products.map((prod) =>
        prod.id === action.payload.id ? { ...action.payload } : prod
      );
    },
  },
});

export const getProducts = (body) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(Request.fetchProducts(body));
      dispatch(addProducts(response));
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Products");
    }
  };
};

export const locationProducts = (location_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.fetchProductsforLoc(location_id)
      );
      if (response?.success) return response?.products;
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Products");
    }
  };
};

export const getProduct = (id, form, setImage) => {
  return async (dispatch, getState) => {
    try {
      let res = await NetworkCall.fetch(Request.fetchProductDetail(id));
      setProductFields(form, setImage, res);
    } catch (error) {
      message.error(error?.message);
      //   setFieldErrorsFromServer(error, form, values);
    }
  };
};

export const syncProducts = (location_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.syncProducts(location_id)
      );
      dispatch(addProducts(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to Sync Products");
    }
  };
};

export const filterProducts = (searchParams, page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.filterProduct(searchParams, page, pageSize)
      );
      dispatch(addProducts(response));
    } catch (err) {
      message.error("Failed to Filter Products");
    }
  };
};

export const updateProduct = (product, id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.editProductDetail(product, id)
      );
      if (response?.success) {
        message.success(response?.message);
        dispatch(setProduct(response?.product));
      }
    } catch (error) {
      console.log("error", error);
      //   setFieldErrorsFromServer(error, form, values);
      message.error(error?.message?.availablity);
    }
  };
};

export const { addProducts, setProduct } = productSlice.actions;

export default productSlice.reducer;
