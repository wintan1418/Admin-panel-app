import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export const helpSlice = createSlice({
  name: "helps",
  initialState: {
    helps: [],
    helpsCount: 0,
    help: null,
  },
  reducers: {
    setHelps: (state, action) => {
      state.helps = action.payload.helps;
      state.helpsCount = action.payload.count;
    },
    setHelpDetail: (state, action) => {
      state.help = action.payload;
    },
  },
});

export const createHelp = (helpDetails) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.createHelp(helpDetails));
      message.success(response?.message);
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to Send Help Message");
    }
  };
};

export const getHelps = (page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchHelps(page, pageSize)
      );
      dispatch(setHelps(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Helps");
    }
  };
};

export const getHelp = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchHelpDetail(id));
      dispatch(setHelpDetail(response?.help));
    } catch (error) {
      message.error(error?.message);
      //   setFieldErrorsFromServer(error, form, values);
    }
  };
};

export const filterHelps = (searchParams, page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.filterHelps(searchParams, page, pageSize)
      );
      dispatch(setHelps(response));
    } catch (err) {
      message.error("Failed to Filter Helps");
    }
  };
};

export const { setHelps, setHelpDetail } = helpSlice.actions;

export default helpSlice.reducer;
