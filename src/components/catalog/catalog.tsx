import { useCallback, useState } from 'react';
import { OfferPreview } from '../../types/offer-preview';
import Map from '../map';
import OfferList from '../offer-list';
import { TypeCards, sorting } from '../../utils/common';
import { useDispatch, useSelector } from 'react-redux';
import Sorting from '../sorting';
import { SortingMap } from '../../config';
import { AppDispatch } from '../../store/store';
import { useEffect } from 'react';
import { fetchOffersAction } from '../../store/api-actions';
import { getCurrentCity, getCurrentsOffers } from '../../store/offers/selector';

function Catalog(): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState('');
  const [currentSorting, setCurrentSorting] = useState(SortingMap.Popular);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const offers = useSelector(getCurrentsOffers);
  const currentCityName = useSelector(getCurrentCity);

  const handleCardOfferHover = useCallback((id: OfferPreview['id']): void => {
    setSelectedOfferId(id);
  }, []);

  const handleCardOfferLeave = useCallback((): void => {
    setSelectedOfferId('');
  }, []);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {currentCityName}
        </b>
        <Sorting
          currentSorting={currentSorting}
          onChangeSorting={(newSorting) => setCurrentSorting(newSorting)}
        />
        <OfferList
          cardType={TypeCards.CITIES}
          offers={sorting(offers, currentSorting)}
          onCardOfferHover={handleCardOfferHover}
          onCardOfferLeave={handleCardOfferLeave}
        />
      </section>
      <div className="cities__right-section">
        <Map
          block="cities"
          city={offers[0].city}
          offers={offers}
          selectedOfferId={selectedOfferId}
        />
      </div>
    </div>
  );
}

export default Catalog;
