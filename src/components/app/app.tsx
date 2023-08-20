import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../config';
import MainPage from '../../pages/main';
import FavoritesPage from '../../pages/favorites';
import LoginPage from '../../pages/login';
import OfferPage from '../../pages/offer';
import Page404 from '../../pages/404';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initThunk } from '../../store/offer-slice';
import { OFFERS } from '../../mocks/offer';

function App(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const {offers} = useSelector((state: RootState) => state.offers);

  useEffect(() => {
    dispatch(initThunk(OFFERS));
  }, [dispatch]);


  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage offers={offers} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage offers={offers} />} />
          <Route path={AppRoute.NotFound} element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
