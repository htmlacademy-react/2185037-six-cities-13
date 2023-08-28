import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../config';
import { OfferPreview } from '../types/offer-preview';
import { init, requireAutorization } from './offer-slice';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { CombinedType, OfferData } from '../types/api-types';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  CombinedType
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
  dispatch(init(data));
});

// export const fetchOfferDetailAction = createAsyncThunk<
//   OfferData,
//   string,
//   CombinedType
// >('data/fetchOfferDetail', async (offerId, { extra: api }) => {
//   const { data: offerDetails } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
//   const { data: reviews } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
//   const { data: nearby } = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${offerId}/${APIRoute.Nearby}`);

//   return { offerDetails, reviews, nearby };
// });

export const checkAuthStatus = createAsyncThunk<
  void,
  undefined,
  CombinedType
>('user/checkAuthStatus', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAutorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAutorization(AuthorizationStatus.NoAuth));
  }
});

export const LoginAction = createAsyncThunk<
  void,
  AuthData,
  CombinedType
>('user/login', async ({ login: email, password }, { dispatch, extra: api}) => {
  const { data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
  saveToken(token);
  dispatch(requireAutorization(AuthorizationStatus.Auth));
});

export const LogoutAction = createAsyncThunk<
  void,
  undefined,
  CombinedType
>('user/logout', async (_arg, { dispatch, extra: api}) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAutorization(AuthorizationStatus.NoAuth));
});
