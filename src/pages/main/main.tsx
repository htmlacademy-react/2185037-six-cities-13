import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import Locations from '../../components/locations';
import Catalog from '../../components/catalog';
import { useSelector } from 'react-redux';
import { getIsOffersLoading } from '../../store/offer-slice';

function MainPage(): JSX.Element {
  const isOffersLoading = useSelector(getIsOffersLoading);
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 sities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        {!isOffersLoading && <h3>Loading offers</h3> }
        {isOffersLoading && (
          <>
            <Locations />
            <div className="cities">
              <Catalog />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default MainPage;
