import { OfferPreview } from './offer-preview';
import { User } from './user';

export type Offer = OfferPreview & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}
