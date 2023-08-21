import { useState } from 'react';
import { OfferPreview } from '../../types/offer-preview';
import Map from '../map';
import OfferList from '../offer-list';
import { TypeCards, sorting } from '../../utils/common';
import { useSelector } from 'react-redux';
import { getCurrentCity, getCurrentsOffers } from '../../store/offer-slice';
import Sorting from '../sorting';
import { SortingMap } from '../../config';

function Catalog(): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState('');
  const [currentSorting, setCurrentSorting] = useState(SortingMap.Popular);

  const handleCardOfferHover = (id: OfferPreview['id']): void => {
    setSelectedOfferId(id);
  };

  const handleCardOfferLeave = (): void => {
    setSelectedOfferId('');
  };

  const offers = useSelector(getCurrentsOffers);
  const currentCity = useSelector(getCurrentCity);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {currentCity.name}
        </b>
        <Sorting
          currentSorting={SortingMap[currentSorting]}
          onChangeSorting={(newSorting) => setCurrentSorting(newSorting)}
        />
        <OfferList
          cardType={TypeCards.CITIES}
          offers={sorting[currentSorting](offers)}
          onCardOfferHover={handleCardOfferHover}
          onCardOfferLeave={handleCardOfferLeave}
        />
      </section>
      <div className="cities__right-section">
        <Map
          block="cities"
          city={currentCity}
          offers={offers}
          selectedOfferId={selectedOfferId}
        />
      </div>
    </div>
  );
}

export default Catalog;
