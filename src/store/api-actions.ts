import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute } from '../config';
import { OfferPreview } from '../types/offer-preview';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import {
  CombinedType,
  FavoriteType,
  OfferData,
  ReviewType,
} from '../types/api-types';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './actions';

export const fetchOffersAction = createAsyncThunk<
  OfferPreview[],
  undefined,
  CombinedType
>('offers/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
  return data;
});

export const fetchOfferDetailAction = createAsyncThunk<
  OfferData,
  string,
  CombinedType
>('offers/fetchOfferDetail', async (offerId, { extra: api }) => {
  const { data: offerDetails } = await api.get<Offer>(
    `${APIRoute.Offers}/${offerId}`
  );
  const { data: reviews } = await api.get<Review[]>(
    `${APIRoute.Comments}/${offerId}`
  );
  const { data: nearby } = await api.get<OfferPreview[]>(
    `${APIRoute.Offers}/${offerId}/${APIRoute.Nearby}`
  );

  return { offerDetails, reviews, nearby };
});

export const checkAuthStatus = createAsyncThunk<
  string,
  undefined,
  CombinedType
>('user/checkAuthStatus', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data.email;
});

export const loginAction = createAsyncThunk<string, AuthData, CombinedType>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Root));
    return email;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, CombinedType>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchFavoritesAction = createAsyncThunk<
  OfferPreview[],
  undefined,
  CombinedType
>('offers/fetchFavoritesAction', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(`${APIRoute.Favorite}`);
  return data;
});

export const reviewAction = createAsyncThunk<Review, ReviewType, CombinedType>(
  'user/review',
  async ({ comment, rating, offerId }, { extra: api }) => {
    const response = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {
      comment,
      rating,
    });
    return response.data;
  }
);

export const favoriteStatusAction = createAsyncThunk<
  Offer,
  FavoriteType,
  CombinedType
>('offers/favoriteStatus', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(
    `${APIRoute.Favorite}/${offerId}/${status}`,
    {}
  );

  return data;
});
