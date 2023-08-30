import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../config';
import MainPage from '../../pages/main';
import FavoritesPage from '../../pages/favorites';
import LoginPage from '../../pages/login';
import OfferPage from '../../pages/offer';
import Page404 from '../../pages/404';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus, getError, getIsOffersLoading } from '../../store/offer-slice';
import ErrorScreen from '../../pages/error';
import Spinner from '../spinner';
import HistoryRouter from '../history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const error = useSelector(getError);
  const isOffersLoading = useSelector(getIsOffersLoading);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if(authorizationStatus === AuthorizationStatus.Unknown || !isOffersLoading){
    return <Spinner />;
  }

  if (error) {
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
