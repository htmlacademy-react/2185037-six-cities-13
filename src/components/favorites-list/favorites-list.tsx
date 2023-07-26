import { Link } from 'react-router-dom';
import { TOfferPreview } from '../../types/offer-preview';
import { AppRoute } from '../../config';
import { ONE_PERCENT } from '../../utils/common';

type FavoritesProps = {
  favorites: TOfferPreview[];
};

type FavoritesByCity = {
  [city: string]: TOfferPreview[];
};

function Favorites({ favorites }: FavoritesProps): JSX.Element {
  const offersFavoriteByCity: FavoritesByCity = {};

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
            <div className="favorites__places">
              {offers.map((offer) => (
                <article className="favorites__card place-card" key={offer.id}>
                  {offer.isPremium && (
                    <div className="place-card__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="favorites__image-wrapper place-card__image-wrapper">
                    <Link to={`${AppRoute.Offer}/${offer.id}`}>
                      <img
                        className="place-card__image"
                        src={offer.previewImage}
                        width={150}
                        height={110}
                        alt="Place image"
                      />
                    </Link>
                  </div>
                  <div className="favorites__card-info place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">
                          €{offer.price}
                        </b>
                        <span className="place-card__price-text">
                          /&nbsp;night
                        </span>
                      </div>
                      <button
                        className="place-card__bookmark-button place-card__bookmark-button--active button"
                        type="button"
                      >
                        <svg
                          className="place-card__bookmark-icon"
                          width={18}
                          height={19}
                        >
                          <use xlinkHref="#icon-bookmark" />
                        </svg>
                        <span className="visually-hidden">In bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span
                          style={{ width: `${offer.rating / ONE_PERCENT}%` }}
                        />
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to={`${AppRoute.Offer}/${offer.id}`}>
                        {offer.title}
                      </Link>
                    </h2>
                    <p className="place-card__type">Apartment</p>
                  </div>
                </article>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Favorites;
