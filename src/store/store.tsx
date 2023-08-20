import { configureStore } from '@reduxjs/toolkit';
import offerSlice from './offer-slice';

const store = configureStore({
  reducer: {
    offers: offerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
