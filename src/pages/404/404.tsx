import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';
import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo';

function Page404(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 sities: page not found</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--notfound page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <h1>Page not found</h1>
              <Link
                to={AppRoute.Root}
                className="login__submit form__submit button"
                style={{
                  width: 'max-content',
                  letterSpacing: '.1em',
                }}
              >
                Back to main page
              </Link>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page404;
