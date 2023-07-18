import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainPage from '../../pages/main';
import FavoritesPage from '../../pages/favorites';
import LoginPage from '../../pages/login';
import OfferPage from '../../pages/offer';
import Page404 from '../../pages/not-found';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  placesCount: number;
};

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage placesCount={placesCount} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<Page404 />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
