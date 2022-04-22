import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export const locationSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
    fetchedLocation: {},
    locationsCount: 0,
  },
  reducers: {
    addLocations: (state, action) => {
      state.locations = action.payload.locations;
      state.locationsCount = action.payload.count;
    },
    addLocation: (state, action) => {
      state.fetchedLocation = action.payload;
    },
    setLocation: (state, action) => {
      state.locations = state.locations.map((location) =>
        location.id === action.payload.id ? { ...action.payload } : location
      );
    }
  },
});

export const getLocationFromOmnivore = (posLocationId, posName, posType) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchLocationFromOmnivore(posLocationId, posName, posType)
      );
      console.log(response);
      dispatch(addLocation(response.location));
      return response.location;
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to fetch Location!");
      return error;
    }
  };
};

export const createLocation = (location) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.saveLocation(location));
      console.log(response);
      dispatch(addLocation(response.location));
      return response;
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to save location");
      return error;
    }
  };
};

export const updateLocation = (location) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.updateLocation(location, location?.id)
      );
      // console.log(response);
      dispatch(setLocation(response?.location))
      return response;
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to update location");
      return error;
    }
  };
};

export const fetchLocations = (body) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchLocations(body)
      );
      console.log(response);
      dispatch(addLocations(response));
      return response;
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      console.log(error);
      message.error("Something went wrong!");
      return error;
    }
  };
};

export const fetchRestaurantLocations = (restaurant_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchRestaurantLocations(restaurant_id)
      );
      return response;
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Something went wrong!");
    }
  };
};

export const fetchLocationsWithoutPage = () => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.GetAllLocations()
      );
      console.log(response);
      // dispatch(addLocations(response));
      return response;
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      console.log(error);
      message.error("Something went wrong!");
      return error;
    }
  };
};

export const fetchSingleLocation = (location_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchSingleLocation(location_id)
      );
      dispatch(addLocation(response?.location));
      return response;
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      console.log(error);
      message.error("Something went wrong!");
      return error;
    }
  };
};

// export const filterLocations = (searchParams) => {
//   return async (dispatch, getState) => {
//     try {
//       let response = await NetworkCall.fetch(
//         Request.filterLocations(searchParams)
//       );
//       dispatch(addLocations(response?.locations));
//       return response;
//     } catch (error) {
//       //   setFieldErrorsFromServer(error, form, values);
//       console.log(error);
//       message.error("Something went wrong!");
//       return error;
//     }
//   };
// };

export const { addLocations, addLocation, setLocation } = locationSlice.actions;

export default locationSlice.reducer;
