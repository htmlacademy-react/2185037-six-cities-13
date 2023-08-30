import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../config';
import MainPage from '../../pages/main';
import FavoritesPage from '../../pages/favorites';
import LoginPage from '../../pages/login';
import OfferPage from '../../pages/offer';
import Page404 from '../../pages/404';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import ErrorScreen from '../../pages/error';
import Spinner from '../spinner';
import HistoryRouter from '../history-route';
import browserHistory from '../../browser-history';
import { AppDispatch } from '../../store/store';
import { fetchFavoritesAction, fetchOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { getErrorStatus, getIsOffersLoading } from '../../store/offers/selector';
import { getAuthorizationStatus } from '../../store/user/selector';

function App(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const hasError = useSelector(getErrorStatus);
  const isOffersLoading = useSelector(getIsOffersLoading);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(fetchOffersAction());
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [authorizationStatus, dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || !isOffersLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<MainPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
          <Route path={AppRoute.NotFound} element={<Page404 />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
