import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../config';
import { OfferPreview } from '../types/offer-preview';
import { initThunk } from './offer-slice';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async(_arg, { dispatch, extra: api }) => {
  const {data} = await api.get<OfferPreview[]>(APIRoute.Offers);
  dispatch(initThunk(data));
});
