import { TOfferPreview } from './offer-preview';
import { TUser } from './user';

export type TOffer = TOfferPreview & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: TUser;
  images: string[];
  maxAdults: number;
}
