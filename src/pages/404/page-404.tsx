import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';

function Page404(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 sities: page not found</title>
      </Helmet>
      <Header />
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
