import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCATIONS } from '../../mocks/locations';
import { City } from '../../types/city';
import { OfferPreview } from '../../types/offer-preview';
import { NameSpace, Status } from '../../config';
import {
  favoriteStatusAction,
  fetchFavoritesAction,
  fetchOfferDetailAction,
  fetchOffersAction,
  reviewAction,
} from '../api-actions';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

export type OffersState = {
  currentCity: City;
  offers: OfferPreview[];
  offerDetails: Offer;
  reviews: Review[];
  nearby: OfferPreview[];
  favorites: (Offer | OfferPreview)[];
  isOffersLoading: boolean;
  hasError: boolean;
  isFavoritesLoading: boolean;
  isFavoriteAdding: boolean;
  statusOfferPageData: Status;
  statusReview: Status;
};

const initialState: OffersState = {
  currentCity: LOCATIONS[0],
  offers: [],
  offerDetails: {} as Offer,
  reviews: [],
  nearby: [],
  favorites: [],
  isOffersLoading: false,
  hasError: false,
  isFavoritesLoading: false,
  isFavoriteAdding: false,
  statusOfferPageData: Status.Idle,
  statusReview: Status.Idle,
};

const offerSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    switchCity: (state, { payload }: PayloadAction<City>) => {
      state.currentCity = payload;
    },
    setOffersLoadingStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.isOffersLoading = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, { payload }) => {
        state.offers = payload;
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
        state.hasError = true;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, { payload }) => {
        state.favorites = payload;

        state.isFavoritesLoading = false;
      })
      .addCase(reviewAction.pending, (state) => {
        state.statusReview = Status.Loading;
      })
      .addCase(reviewAction.fulfilled, (state, {payload}) => {
        state.reviews.push(payload);
        state.statusReview = Status.Success;
      })
      .addCase(reviewAction.rejected, (state) => {
        state.statusReview = Status.Error;
      })
      .addCase(favoriteStatusAction.pending, (state) => {
        state.isFavoriteAdding = true;
      })
      .addCase(favoriteStatusAction.fulfilled, (state, action) => {
        const isRemoval = action.meta.arg.status === 0;
        const { id, isFavorite } = action.payload;
        state.offers.forEach((offer) => {
          if (offer.id === id) {
            offer.isFavorite = isFavorite;
          }
        });

        if (isRemoval) {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== action.payload.id
          );
        } else {
          state.favorites = [...state.favorites, action.payload];
        }
        state.offerDetails = action.payload;
        state.isFavoriteAdding = false;
      })
      .addCase(favoriteStatusAction.rejected, (state) => {
        state.isFavoriteAdding = true;
      })
      .addCase(fetchOfferDetailAction.fulfilled, (state, action) => {
        state.offerDetails = action.payload.offerDetails;
        state.reviews = action.payload.reviews;
        state.nearby = action.payload.nearby;
        state.statusOfferPageData = Status.Success;
      })
      .addCase(fetchOfferDetailAction.pending, (state) => {
        state.statusOfferPageData = Status.Loading;
      })
      .addCase(fetchOfferDetailAction.rejected, (state) => {
        state.statusOfferPageData = Status.Error;
      });
  },
});

export const { switchCity, setOffersLoadingStatus } =
  offerSlice.actions;

export default offerSlice.reducer;
