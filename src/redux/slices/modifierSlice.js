import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import {
  setModifierFields,
  setModifierItemsFields,
} from "../../helpers/modifier_helpers";
// import { setFieldErrorsFromServer } from "../../utilities/generalUtility";

export const modifierSlice = createSlice({
  name: "modifiers",
  initialState: {
    modifierGroups: [],
    modifierGroupItems: [],
    modifierGroupsCount: 0,
  },
  reducers: {
    setModifiers: (state, action) => {
      state.modifierGroups = action.payload.ModifierGroups.map((mod, index) => {
        state.modifierGroupItems = mod?.modifier_group_items?.map(
          (item, index) => {
            return { ...item, key: index };
          }
        );
        return { ...mod, key: index };
      });
      state.modifierGroupsCount = action.payload.count;
    },
    setModifier: (state, action) => {
      state.modifierGroups = state.modifierGroups.map((mod, index) => {
        state.modifierGroupItems = mod?.modifier_group_items?.map(
          (item, index) => {
            return item.id === action.payload.id
              ? { ...action.payload, key: index }
              : item;
          }
        );
        return { ...mod, key: index };
      });
    },
  },
});

export const getModifiers = (body) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchModifiers(body));

      dispatch(setModifiers(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Modifiers");
    }
  };
};

export const getActiveModifiers = (location_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchActiveModifiers(location_id)
      );
      dispatch(setModifiers(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Modifiers");
    }
  };
};

export const getModifier = (modifier_id, form) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchModifier(modifier_id)
      );
      setModifierFields(form, response);
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Modifier");
    }
  };
};

export const getModifierItem = (modifier_item_id, form) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchModifierItem(modifier_item_id)
      );

      setModifierItemsFields(form, response);
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to load Modifier Item");
    }
  };
};

export const syncModifiers = (location_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.syncModifiers(location_id)
      );
      dispatch(setModifiers(response));
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error("Failed to Sync Modifiers");
    }
  };
};

export const updateModifier = (modifier_detail) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.updateModifier(modifier_detail)
      );
      if (response?.success) message.success(response?.message);
    } catch (errors) {
      // setFieldErrorsFromServer(errors, form, form.getFieldsValue());
    }
  };
};

export const updateModifierItem = (modifier_item_detail) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.updateModifierItem(modifier_item_detail)
      );
      if (response?.success) {
        message.success(response?.message);
        dispatch(setModifier(response?.modifier_item));
      }
    } catch (errors) {
      // setFieldErrorsFromServer(errors, form, form.getFieldsValue());
    }
  };
};

export const filterModifiers = (searchParams, page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.filterModifiers(searchParams, page, pageSize)
      );
      dispatch(setModifiers(response));
    } catch (err) {
      message.error("Failed to Filter Modifier");
    }
  };
};

export const { setModifiers, setModifier, setModifierItems } =
  modifierSlice.actions;

export default modifierSlice.reducer;
