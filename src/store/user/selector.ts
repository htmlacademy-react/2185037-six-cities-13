import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../config';
import { UserState } from './user-slice';
import { RootState } from '../store';

export const getAuthorizationStatus = createSelector(
  (state: Pick<RootState, NameSpace.User>) => state[NameSpace.User],
  (state: UserState) => state.authorizationStatus
);
