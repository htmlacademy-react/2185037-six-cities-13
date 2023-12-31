import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import FavoritesList from '../../components/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty';
import { useSelector } from 'react-redux';
import { getFavorites, getIsFavoritesLoading } from '../../store/offers/selector';
import Spinner from '../../components/spinner';

function FavoritesPage(): JSX.Element {
  const isFavoritesLoading = useSelector(getIsFavoritesLoading);
  const offersFavorite = useSelector(getFavorites);
  const isEmpty = offersFavorite.length === 0;

  if(isFavoritesLoading){
    return <Spinner />;
  }

  return (
    <div className={`page ${isEmpty ? 'page--favorites-empty' : ''}`}>
      <Helmet>
        <title>6 sities: favorites</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--favorites ${isEmpty ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {isEmpty && <FavoritesEmpty />}
          {!isEmpty && <FavoritesList favorites={offersFavorite} />}
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
