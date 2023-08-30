import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import offerSlice from '../offer-slice';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof offerSlice>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'user/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next;
  };
