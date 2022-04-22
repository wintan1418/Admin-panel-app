import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import NetworkCall from '../../network/networkCall'
import Request from '../../network/request'
import { setAddOnFields } from '../../helpers/addon_helpers'
// import { setFieldErrorsFromServer } from '../../utilities/generalUtility'

export const addonSlice = createSlice({
  name: 'addons',
  initialState: {
    addons: [],
    addonsItems: [],
    addonsCount: 0,
  },
  reducers: {
    setAddons: (state, action) => {
      state.addons = action.payload.add_ons.map((mod) => {
        return { ...mod, key: mod?.id }
      })

      state.addonsCount = action.payload.count
    },
    setAddonItems: (state, action) => {
      state.addonsItems = action.payload.addon_items
    },
    setAddonItem: (state, action) => {
      state.addonsItems = state.addonsItems.map((prod) =>
        prod.id === action.payload.id ? { ...action.payload } : prod,
      )
    },
    setAddon: (state, action) => {
      state.addons = state.addons.map((mod) => {
        return mod.id === action.payload.id
          ? { ...action.payload, key: mod?.id }
          : mod
      })
    },
  },
})

export const getAddOns = (body) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchAddOns(body))

      dispatch(setAddons(response))
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error('Failed to load Add Ons')
    }
  }
}

export const createAddon = (addonDetails) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.createAddOn(addonDetails))
      if (response?.success) message.success(response?.message)
    } catch (errors) {
      message.error(errors?.error?.data?.error)
    }
  }
}

export const locationAddons = (location_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.fetchAddonsforLoc(location_id),
      )

      if (response?.success) return response?.add_ons
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error('Failed to load Addons')
    }
  }
}

export const getAddOn = (addon_id, form, setAddonProducts) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchAddOn(addon_id))
      setAddOnFields(form, setAddonProducts, response)
    } catch (error) {
      //   setFieldErrorsFromServer(error, form, values);
      message.error('Failed to load Add On')
    }
  }
}

export const getAddOnItems = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchAddOnItems(id))
      if (response?.success) dispatch(setAddonItems(response))
    } catch (error) {
      message.error('Failed to load Addon Items')
    }
  }
}

export const updateAddOnItem = (product, id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.editProductDetail(product, id),
      )
      if (response?.success) {
        message.success(response?.message)
        dispatch(setAddonItem(response?.product))
      }
    } catch (error) {
      console.log('error', error)
      //   setFieldErrorsFromServer(error, form, values);
      message.error(error?.message?.availablity)
    }
  }
}

export const updateAddOn = (addon_detail) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.updateAddon(addon_detail))
      if (response?.success) {
        message.success(response?.message)
        dispatch(setAddon(response?.menu))
      }
    } catch (errors) {
      // setFieldErrorsFromServer(errors, form, form.getFieldsValue());
    }
  }
}

export const deleteAddOn = (id, body) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.deleteAddOn(id))
      if (response?.status) {
        dispatch(getAddOns(body))
        message.success(response?.message, 5)
      }
    } catch (errors) {
      message.error(errors?.error?.data?.error, 5)
      // setFieldErrorsFromServer(errors, form, form.getFieldsValue());
    }
  }
}

export const deleteProductAddOn = (product_id, add_on_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(
        Request.deleteProductAddOn(product_id, add_on_id),
      )
      if (response?.status) {
        dispatch(getAddOnItems(add_on_id))
        message.success(response?.message, 5)
      }
    } catch (errors) {
      message.error(errors?.error?.data?.error, 5)
      // setFieldErrorsFromServer(errors, form, form.getFieldsValue());
    }
  }
}

export const {
  setAddons,
  setAddonItems,
  setAddon,
  setAddonItem,
} = addonSlice.actions

export default addonSlice.reducer
