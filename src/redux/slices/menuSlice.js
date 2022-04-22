import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import { setMenuFields } from "../../helpers/menu_helpers";

export const menuSlice = createSlice({
  name: "menus",
  initialState: {
    menus: [],
    selectedMenu: null,
    menuitems: [],
    menuitemsCount: 0,
  },
  reducers: {
    setMenus: (state, action) => {
      state.menus = action.payload;
    },
    setMenu: (state, action) => {
      state.menus = state.menus.map((menu) =>
        menu.id === action.payload.id ? { ...action.payload } : menu
      );
    },
    setSelectedMenu: (state, action) => {
      state.selectedMenu = state.menus.find(
        (menu) => menu.id === action.payload
      );
    },
    setMenuItems: (state, action) => {
      state.menuitems = action.payload.menu_items;
      state.menuitemsCount = action.payload.count;
    },
    setMenuItem: (state, action) => {
      state.menuitems = state.menuitems.map((prod) =>
        prod.id === action.payload.id ? { ...action.payload } : prod
      );
    },
    clearMenuItems: (state, action) => {
      state.menuitems = null;
      state.menuitemsCount = 0;
    },
  },
});

export const createMenu = (menuDetails, setQr, setMenuUrl) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.createMenu(menuDetails));
      message.success(response?.message);
      setQr(response?.data?.qr_image_url);
      setMenuUrl(response?.data?.menu_url);
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to Create Menu");
    }
  };
};

export const createMenuItems = (product_ids) => {
  return async (dispatch, getState) => {
    try {
      let { id, name } = getState().menu.selectedMenu;
      let response = await NetworkCall.fetch(
        Request.createMenuItem(id, product_ids)
      );
      if (response?.success) {
        message.success(response?.message);
        dispatch(setSelectedMenu({ id, name }));
      }
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to Add Products");
    }
  };
};

export const updateMenu = (menuDetails, menu_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.updateMenu(menuDetails, menu_id)
      );
      if (response?.success) {
        message.success(response?.message);
        dispatch(setMenu(response?.menu));
      }
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to Update Menu");
    }
  };
};

export const getMenus = (body) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchMenus(body));
      dispatch(setMenus(response?.menus));
      dispatch(setSelectedMenu(response?.menus[0]?.id));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Menus");
    }
  };
};

export const getMenu = (
  menu_id,
  form,
  setImage,
  setTimings,
  setQr,
  setMenuUrl
) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchMenuDetail(menu_id));
      setMenuFields(form, setImage, setTimings, setQr, setMenuUrl, response);
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Menu Details");
    }
  };
};

export const filterMenuItems = (menu_id, searchParams, page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.filterMenuItems(menu_id, searchParams, page, pageSize)
      );
      dispatch(setMenuItems(response));
    } catch (err) {
      message.error("Failed to Filter Products");
    }
  };
};

export const getMenuItems = (page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      let menu_id = getState().menu.selectedMenu?.id;
      let response = await NetworkCall.fetch(
        Request.fetchMenuItems(menu_id, page, pageSize)
      );
      dispatch(setMenuItems(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Menu Items");
    }
  };
};

export const updateMenuItem = (product, id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.editProductDetail(product, id)
      );
      if (response?.success) {
        message.success(response?.message);
        dispatch(setMenuItem(response?.product));
      }
    } catch (error) {
      console.log("error", error);
      //   setFieldErrorsFromServer(error, form, values);
      message.error(error?.message?.availablity);
    }
  };
};

export const deleteMenuItem = (
  menu_id,
  product_id,
  page = 1,
  pageSize = 10
) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.deleteMenuItem(menu_id, product_id)
      );
      if (response?.status) {
        dispatch(getMenuItems(page, pageSize));
        message.success(response?.message, 5);
      }
    } catch (err) {
      message.error("Failed to delete Menu Item");
    }
  };
};

export const {
  setMenus,
  setMenu,
  setMenuItems,
  setMenuItem,
  clearMenuItems,
  setSelectedMenu,
} = menuSlice.actions;

export default menuSlice.reducer;
