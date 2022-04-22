import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { createReducer } from 'redux-orm'
import orm from './orm'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import User from '../models/user/user'
import Restaurant from '../redux/slices/restaurantSlice'
import Product from '../redux/slices/productSlice'
import Category from '../redux/slices/categorySlice'
import Location from '../redux/slices/locationSlice'
import Auth from '../redux/slices/authSlice'
import Table from '../redux/slices/tableSlice'
import Menu from '../redux/slices/menuSlice'
import Order from '../redux/slices/orderSlice'
import Help from '../redux/slices/helpSlice'
import Modifier from '../redux/slices/modifierSlice'
import Customer from '../redux/slices/customerSlice'
import Addon from '../redux/slices/addonSlice'
import Discount from '../redux/slices/discountSlice'
import Enganements from '../redux/slices/enganements'

orm.register(User)

let reducers = combineReducers({
  restaurant: Restaurant,
  product: Product,
  category: Category,
  location: Location,
  auth: Auth,
  table: Table,
  menu: Menu,
  order: Order,
  help: Help,
  modifier: Modifier,
  customer: Customer,
  addon: Addon,
  discount: Discount,
  enganements: Enganements,
  orm: createReducer(orm),
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
})

const persistor = persistStore(store)
export { persistor, store }
