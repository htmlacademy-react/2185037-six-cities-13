import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCATIONS } from '../mocks/locations';
import { City } from '../types/city';
import { OfferPreview } from '../types/offer-preview';
import { RootState } from './store';
import { AuthorizationStatus } from '../config';

type State = {
  currentCity: City;
  offers: OfferPreview[];
  authorizationStatus: AuthorizationStatus;
  isOffersLoading: boolean;
  error: string | null;
};

const initialState: State = {
  currentCity: LOCATIONS[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersLoading: false,
  error: null,
};

const offerSlice = createSlice({
  name: 'OFFERS',
  initialState,
  reducers: {
    init: (state, { payload }: PayloadAction<OfferPreview[]>) => {
      state.offers = payload;
      state.isOffersLoading = true;
    },
    switchCity: (state, { payload }: PayloadAction<City>) => {
      state.currentCity = payload;
    },
    requireAutorization: (state, { payload }: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = payload;
    },
    setOffersLoadingStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.isOffersLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    }
  },
});

export const { init, switchCity, requireAutorization, setOffersLoadingStatus, setError } = offerSlice.actions;

export const getOffers = (state: RootState) => state.offers;

export const getCurrentsOffers = (state: RootState) =>
  state.offers.offers.filter(
    (offer) => offer.city.name === state.offers.currentCity.name
  );

export const getCurrentCity = (state: RootState) => state.offers.currentCity;

export const getIsOffersLoading = (state: RootState) => state.offers.isOffersLoading;

export default offerSlice.reducer;
