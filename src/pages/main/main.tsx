import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer-preview';
import Header from '../../components/header';
import OfferList from '../../components/offer-list';
import { City } from '../../types/city';
import Locations from '../../components/locations';

type MainScreenProps = {
  offers: OfferPreview[];
  locations: City[];
};

function MainPage({ offers, locations }: MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 sities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations locations={locations} />
        <div className="cities">
          <OfferList offers={offers} />
        </div>
      </main>
    </div>
  );
}

export default MainPage;
