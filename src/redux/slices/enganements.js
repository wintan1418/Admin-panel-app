import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export const enganementSlice = createSlice({
  name: "enganements",
  initialState: {
    guests: [],
    guestsCount: 0,
  },
  reducers: {
    addGuest: (state, action) => {
      state.guests = action.payload.guests;
      state.guestsCount = action.payload.count;
    },
    setGuest: (state, action) => {
      state.guests = action.payload.guest;
      state.guestsCount = action.payload.count;
    },
  },
});

export const fetchAllGuests = (body) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.fetchEnganementGuests(body)
      );

      dispatch(
        addGuest({
          guests: response,
          count: response?.length,
        })
      );

      return response;
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Guests");
    }
  };
};

export const fetchSingleGuestbyId = (body) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.fetchEnganementGuestbyId(body)
      );

      dispatch(
        setGuest({
          guest: response,
          count: response?.length,
        })
      );

      return response;
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error("Failed to fetch Guests");
    }
  };
};

export const { addGuest, setGuest } = enganementSlice.actions;

export default enganementSlice.reducer;
