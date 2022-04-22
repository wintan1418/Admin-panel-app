import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import NetworkCall from '../../network/networkCall'
import Request from '../../network/request'

export const discountSlice = createSlice({
  name: 'discounts',
  initialState: {
    discounts: [],
    discountsCount: 0,
  },
  reducers: {
    setDiscounts: (state, action) => {
      state.discounts = action.payload.discounts
      state.discountsCount = action.payload.count
    },
    setDiscount: (state, action) => {
      state.discounts = state.discounts.map((discount) =>
        discount.id === action.payload.id ? { ...action.payload } : discount,
      )
    },
  },
})

export const fetchDiscounts = (body) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.fetchDiscounts(body))
      dispatch(setDiscounts(response))
    } catch (error) {
      message.error('Failed to load Loyalties')
    }
  }
}

export const syncDiscountsfromOmnivore = (location_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.syncDiscounts(location_id))
      dispatch(setDiscounts(response))
      message.info('Loyalties have been synced!')
    } catch (error) {
      message.error('Failed to load Loyalties')
    }
  }
}

export const updateDiscount = (discount) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.updateDiscount(discount))
      message.success(response?.message)
      dispatch(setDiscount(response?.discount))
    } catch (errors) {
      console.log('Error: klamsldkmalsdkmlasmkdlask')
    }
  }
}

export const { setDiscounts, setDiscount } = discountSlice.actions

export default discountSlice.reducer
