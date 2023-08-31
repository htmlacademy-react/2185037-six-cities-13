import { Link } from 'react-router-dom';
import Logo from '../logo';
import { AppRoute, AuthorizationStatus } from '../../config';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffersAction, logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserName } from '../../store/user/selector';
import { getFavorites } from '../../store/offers/selector';

function Header(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  const userName = useSelector(getUserName);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const favoritesCount = useSelector(getFavorites).length;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth && (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {userName}
                      </span>
                      <span className="header__favorite-count">
                        {favoritesCount}
                      </span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Root}
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                        dispatch(fetchOffersAction());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              )}
              {authorizationStatus !== AuthorizationStatus.Auth && (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
