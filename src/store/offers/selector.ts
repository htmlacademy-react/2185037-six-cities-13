import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../config';
import { RootState } from '../store';
import { OffersState } from './offer-slice';

export const getOffers = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.offers
);

export const getOfferDetails = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.offerDetails
);

export const getOfferPageDataStatus = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.statusOfferPageData
);

export const getIsOffersLoading = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.isOffersLoading
);

export const getCurrentCity = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.currentCity
);

export const getCurrentsOffers = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.offers.filter((offer) => offer.city.name === state.currentCity.name)
);

export const getFavorites = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.favorites
);

export const getErrorStatus = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.hasError
);

export const getIsFavoritesLoading = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.isFavoritesLoading
);

export const getIsFavoriteAdding = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.isFavoriteAdding
);

export const getNearByOffers = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.nearby
);

export const getReviews = createSelector(
  (state: Pick<RootState, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersState) => state.reviews
);
