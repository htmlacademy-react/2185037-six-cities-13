import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCATIONS } from '../mocks/locations';
import { City } from '../types/city';
import { OfferPreview } from '../types/offer-preview';
import { AppDispatch, RootState } from './store';
import { AuthorizationStatus } from '../config';

type State = {
  currentCity: City;
  offers: OfferPreview[];
  authorizationStatus: AuthorizationStatus;
};

const initialState: State = {
  currentCity: LOCATIONS[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown
};

const offerSlice = createSlice({
  name: 'OFFERS',
  initialState,
  reducers: {
    init: (state, { payload }: PayloadAction<OfferPreview[]>) => {
      state.offers = payload;
    },
    switchCity: (state, { payload }: PayloadAction<City>) => {
      state.currentCity = payload;
    },
    requireAutorization: (state, { payload }: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = payload;
    }
  },
});

export const { init, switchCity } = offerSlice.actions;

export const initThunk = (offers: OfferPreview[]) => (dispatch: AppDispatch) => {
  const timer = setTimeout(() => {
    dispatch(init(offers));
    clearTimeout(timer);
  }, 3000);

  return 'started';
};

export const getCurrentsOffers = (state: RootState) =>
  state.offers.offers.filter(
    (offer) => offer.city.name === state.offers.currentCity.name
  );

export const getCurrentCity = (state: RootState) => state.offers.currentCity;

export default offerSlice.reducer;
