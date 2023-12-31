import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import Locations from '../../components/locations';
import Catalog from '../../components/catalog';

function MainPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 sities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations />
        <div className="cities">
          <Catalog />
        </div>
      </main>
    </div>
  );
}

export default MainPage;
