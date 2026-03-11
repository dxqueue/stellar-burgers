import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import feedReducer from './slices/feedSlices';
import userReducer from './slices/userSlice';
import profileOrdersReducer from './slices/profileOrderSlice';
import orderReducer from './slices/orderSlice';
import constructorReducer from './slices/constructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  user: userReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer,
  burgerConstructor: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
