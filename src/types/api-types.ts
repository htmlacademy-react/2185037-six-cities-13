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
  offerDetail: Offer;
  reviews: Review[];
  nearby: OfferPreview[];
};
