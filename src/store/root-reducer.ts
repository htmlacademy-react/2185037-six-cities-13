import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../config';
import offerSlice from './offers/offer-slice';
import userSlice from './user/user-slice';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offerSlice,
  [NameSpace.User]: userSlice
});
