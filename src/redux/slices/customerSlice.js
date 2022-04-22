import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    customersCount: null,
  },
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload.customers;
      state.customersCount = action.payload.count;
    },
  },
});

export const getCustomers = (body) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.GetAllCustomers(body));
      dispatch(setCustomers(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Customers");
    }
  };
};

export const filterCustomers = (searchParams, page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.filterCustomers(searchParams, page, pageSize)
      );
      dispatch(setCustomers(response));
    } catch (err) {
      message.error("Failed to Filter Customers");
    }
  };
};

export const { setCustomers } = customerSlice.actions;

export default customerSlice.reducer;
