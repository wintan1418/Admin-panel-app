import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import NetworkCall from '../../network/networkCall'
import Request from '../../network/request'

export const tableSlice = createSlice({
  name: 'tables',
  initialState: {
    tables: [],
    tablesCount: 0,
  },
  reducers: {
    addTables: (state, action) => {
      state.tables = action.payload.tables
      state.tablesCount = action.payload.count
    },
    setTable: (state, action) => {
      state.tables = state.tables.map((table) =>
        table.id === action.payload.id ? { ...action.payload } : table,
      )
    },
  },
})

export const syncTables = (location_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(Request.syncTables(location_id))
      dispatch(addTables(response))
      return response
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error('Failed to load Tables')
      return error
    }
  }
}

export const fetchAllTables = (body) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(Request.fetchTables(body))
      dispatch(addTables(response))
      return response
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error('Failed to load Tables')
    }
  }
}

export const fetchSingleTable = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(Request.fetchTable(id))
      return response
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values);
      message.error('Failed to fetch Table')
    }
  }
}

export const updateTable = (table) => {
  return async (dispatch, getState) => {
    try {
      let response = await NetworkCall.fetch(Request.updateTable(table))
      dispatch(setTable(response?.table))
      return response
    } catch (error) {
      console.log(error)
      // message.error(error?.error?.data?.error, 5);
    }
  }
}

// export const filterTables = (searchParams) => {
//     return async (dispatch, getState) => {
//         try {
//             let response = await NetworkCall.fetch(Request.filterTables(searchParams))
//             dispatch(addTables(response?.tables))
//             return response
//         } catch (error) {
//             console.log(error)
//             message.error("Something went wrong!");
//             return error
//         }
//     };
// };

export const tableStatusHandler = (table) => {
  return async (dispatch, getState) => {
    try {
      const response = await NetworkCall.fetch(Request.updateTableStatus(table))
      if (response?.status) {
        dispatch(setTable(response?.table))
        message.success(response?.message)
      }
      //   console.log(response)
      return response
    } catch (error) {
      message.error(error?.error?.data?.errors)
      // message.error('Failed to save table!')
      //   console.log(error)
      return error
    }
  }
}

export const { addTables, setTable } = tableSlice.actions

export default tableSlice.reducer
