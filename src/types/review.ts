import { TUser } from './user';

export type TReview = {
  id: string;
  date: string;
  user: TUser;
  comment: string;
  rating: number;
}
