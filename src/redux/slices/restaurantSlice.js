import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import NetworkCall from '../../network/networkCall'
import Request from '../../network/request'

export const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: [],
    restaurantsCount: 0,
  },
  reducers: {
    addRestaurants: (state, action) => {
      state.restaurants = action.payload.restaurants
      state.restaurantsCount = action.payload.count
    },
  },
})

export const fetchRestaurants = (page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.fetchRestaurants(page, pageSize),
      )
      dispatch(addRestaurants(response))
      return response
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error('Failed to load Brands')
    }
  }
}

export const fetchAllRestaurants = () => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(Request.fetchAllRestaurants())
      return response
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error('Failed to load Brands')
    }
  }
}

export const filterRestaurants = (searchParams) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.filterRestaurants(searchParams),
      )
      dispatch(addRestaurants(response))
      return response
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error('Failed to search Brands')
    }
  }
}

export const fetchSingleRestaurant = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(Request.fetchRestaurant(id))
      return response
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error('Failed to fetch Brand')
    }
  }
}

export const saveRestaurant = (name, subdomain) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.createRestaurant(name, subdomain),
      )
      return response
    } catch (error) {
      message.error('Failed to save Brand')
      return error
    }
  }
}

export const updateRestaurant = (restaurant, id) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(
        Request.updateRestaurant(restaurant, id),
      )
      return response
    } catch (error) {
      message.error('Failed to update Brand')
      return error
    }
  }
}
export const { addRestaurants } = restaurantSlice.actions

export default restaurantSlice.reducer
