import { useState } from 'react';
import { City } from '../../types/city';
import { OfferPreview } from '../../types/offer-preview';
import Map from '../map';
import OfferList from '../offer-list';
import { TypeCards } from '../../utils/common';

type CitiesProps = {
  offers: OfferPreview[];
  city: City;
};

function Cities({ offers, city }: CitiesProps): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState('');

  const handleOfferCardHover = (id: OfferPreview['id']): void => {
    setSelectedOfferId(id);
  };

  const handleOfferCardLeave = (): void => {
    setSelectedOfferId('');
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in Amsterdam
        </b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by&nbsp;</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>
              Popular
            </li>
            <li className="places__option" tabIndex={0}>
              Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
              Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
              Top rated first
            </li>
          </ul>
        </form>
        <OfferList
          cardType={TypeCards.CITIES}
          offers={offers}
          onListOfferHover={handleOfferCardHover}
          onListOfferLeave={handleOfferCardLeave}
        />
      </section>
      <div className="cities__right-section">
        <Map
          block="cities"
          city={city}
          offers={offers}
          selectedOfferId={selectedOfferId}
        />
      </div>
    </div>
  );
}

export default Cities;
