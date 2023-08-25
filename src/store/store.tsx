import { configureStore } from '@reduxjs/toolkit';
import offerSlice from './offer-slice';
import { createAPI } from '../services/api';

export const api = createAPI();

const store = configureStore({
  reducer: {
    offers: offerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
