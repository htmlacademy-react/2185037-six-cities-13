import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from '../store/store';
import { Offer } from './offer';
import { Review } from './review';
import { OfferPreview } from './offer-preview';

export type CombinedType = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
};

export type OfferData = {
  offerDetails: Offer;
  reviews: Review[];
  nearby: OfferPreview[];
};

export type ReviewType = {
  comment: string;
  rating: number;
  offerId: string;
};

export type FavoriteType = {
  offerId: string;
  status: number;
};
