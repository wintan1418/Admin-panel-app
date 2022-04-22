import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export const authSlice = createSlice({
  name: "locations",
  initialState: {
    authlocations: [],
    selectedLocation: null,
  },
  reducers: {
    setLocations: (state, action) => {
      state.authlocations = action.payload;
      state.selectedLocation = state.selectedLocation ?? action.payload[0];
    },
    selectLocation: (state, action) => {
      state.selectedLocation = state.authlocations.find(
        (data) => data.id === action.payload
      );
    },
    clearLocation: (state, action) => {
      state.authlocations = [];
      state.selectedLocation = null;
    },
  },
});

export const getLocations = () => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.GetAllLocations());
      dispatch(setLocations(response?.locations));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to Locations");
    }
  };
};

export const { setLocations, selectLocation, clearLocation } =
  authSlice.actions;

export default authSlice.reducer;
