import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, Status } from '../../config';
import { checkAuthStatus, loginAction, logoutAction } from '../api-actions';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userName: string;
  loginStatus: Status;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userName: '',
  loginStatus: Status.Idle,
};

const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setLoginStatus: (state, { payload }: PayloadAction<Status>) => {
      state.loginStatus = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userName = payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userName = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { setLoginStatus } = userSlice.actions;

export default userSlice.reducer;