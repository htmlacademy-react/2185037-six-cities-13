import { Offer } from '../../types/offer';
import { OfferPreview } from '../../types/offer-preview';
import { TypeCards } from '../../utils/common';
import OfferList from '../offer-list';

type FavoritesListProps = {
  favorites: (Offer | OfferPreview)[];
};

type FavoritesListByCity = {
  [city: string]: OfferPreview[];
};

function FavoritesList({ favorites }: FavoritesListProps): JSX.Element {
  const offersFavoriteByCity: FavoritesListByCity = {};

  favorites.forEach((offer) => {
    if (offersFavoriteByCity?.[offer.city.name]) {
      offersFavoriteByCity[offer.city.name].push(offer);
    } else {
      offersFavoriteByCity[offer.city.name] = [offer];
    }
  });

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(offersFavoriteByCity).map(([city, offers]) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <OfferList cardType={TypeCards.FAVORITE} offers={offers} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoritesList;
