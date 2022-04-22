import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    ordersCount: 0,
    order: null,
    payment: null,
    analytics: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.orders;
      state.ordersCount = action.payload.count;
    },
    setOrder: (state, action) => {
      state.orders = state.orders.map((order) =>
        order.id === action.payload.id ? { ...action.payload } : order
      );
    },
    setOrderDetail: (state, action) => {
      state.order = action.payload;
    },
    setPaymentDetail: (state, action) => {
      state.payment = action.payload;
    },
    setAnalytics: (state, action) => {
      state.analytics = action.payload;
    },
  },
});

export const getOrders = (body) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchOrders(body));
      dispatch(setOrders(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to Orders");
    }
  };
};

export const getOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchOrderDetail(id));
      dispatch(setOrderDetail(response?.order));
    } catch (error) {
      message.error(error?.message);
      //   setFieldErrorsFromServer(error, form, values);
    }
  };
};

export const getPayment = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchPaymentDetail(id));
      dispatch(setPaymentDetail(response?.payment));
    } catch (error) {
      message.error(error?.message);
      //   setFieldErrorsFromServer(error, form, values);
    }
  };
};

export const getOrdersAnalytics = (type, location_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchOrdersAnalytics(type, location_id)
      );
      dispatch(setAnalytics(response));
    } catch (error) {
      message.error("Failed to Fetch Analytics");
      //   setFieldErrorsFromServer(error, form, values);
    }
  };
};

export const completeOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.completeOrder(id));
      dispatch(setOrder(response?.order));
      message.success(response?.message);
    } catch (error) {
      message.error(error?.data?.message);
      //   setFieldErrorsFromServer(error, form, values);
    }
  };
};

export const cancelOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.cancelOrder(id));
      dispatch(setOrder(response?.order));
      message.success(response?.message);
    } catch (error) {
      message.error(error?.data?.message);
      //   setFieldErrorsFromServer(error, form, values);
    }
  };
};

export const filterOrders = (searchParams, page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.filterOrders(searchParams, page, pageSize)
      );
      dispatch(setOrders(response));
    } catch (err) {
      message.error("Failed to Filter Orders");
    }
  };
};

export const {
  setOrders,
  setOrder,
  setOrderDetail,
  setAnalytics,
  setPaymentDetail,
} = orderSlice.actions;

export default orderSlice.reducer;
