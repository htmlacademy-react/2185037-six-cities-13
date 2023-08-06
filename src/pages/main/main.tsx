import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer-preview';
import Header from '../../components/header';
import { City } from '../../types/city';
import Locations from '../../components/locations';
import Cities from '../../components/cities';

type MainScreenProps = {
  offers: OfferPreview[];
  locations: City[];
};

function MainPage({ offers, locations }: MainScreenProps): JSX.Element {
  const firstCity = locations[0];
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
          <Cities offers={offers} city={firstCity} />
        </div>
      </main>
    </div>
  );
}

export default MainPage;
