import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import { setCategoryFields } from "../../helpers/category_helpers";
import { setFieldErrorsFromServer } from "../../utilities/generalUtility";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    categoriesCount: 0,
  },
  reducers: {
    addCategories: (state, action) => {
      state.categories = action.payload.categories;
      state.categoriesCount = action.payload.count;
    },
    setCategory: (state, action) => {
      state.categories = state.categories.map((cat) =>
        cat.id === action.payload.id ? { ...action.payload } : cat
      );
    },
  },
});

export const getCategories = (body) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchCategories(body));
      dispatch(addCategories(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Categories");
    }
  };
};

export const locationCategories = (forProduct, location_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.fetchCategoriesforLoc(forProduct, location_id)
      );
      if (response?.success) return response?.categories;
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Products");
    }
  };
};

export const syncCategories = (location_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.syncCategories(location_id)
      );
      dispatch(addCategories(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to Sync Categories");
    }
  };
};

export const getCategory = (id, form) => {
  return async (dispatch, getState) => {
    try {
      let res = await NetworkCall.fetch(Request.fetchCategoryDetail(id));
      setCategoryFields(form, res);
    } catch (error) {
      message.error(error?.message);
      //   setFieldErrorsFromServer(error, form, values);
    }
  };
};

export const updateCategory = (category, id, form) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.updateCategory(category, id)
      );
      if (response?.success) {
        message.success(response?.message);
        dispatch(setCategory(response?.category));
      }
    } catch (errors) {
      setFieldErrorsFromServer(errors, form, form.getFieldsValue());
    }
  };
};

export const createCategory = (catDetails, form) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.createCategory(catDetails)
      );
      message.success(response?.message);
    } catch (errors) {
      setFieldErrorsFromServer(errors, form, form.getFieldsValue());
      // message.error(errors?.error?.data?.error);
    }
  };
};

export const filterCategories = (searchParams, page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.filterCategories(searchParams, page, pageSize)
      );
      dispatch(addCategories(response));
    } catch (err) {
      message.error("Failed to Filter Category");
    }
  };
};

export const { addCategories, setCategory } = categorySlice.actions;

export default categorySlice.reducer;
