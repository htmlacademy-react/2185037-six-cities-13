import { OfferPreview } from '../../types/offer-preview';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';
import { useState } from 'react';
import { ONE_PERCENT } from '../../utils/common';
import { Card } from '../../types/card';

type OfferPreviewProps = {
  offer: OfferPreview;
  cardType: Card;
  onListOfferHover?: (id: OfferPreview['id']) => void;
  onListOfferLeave?: () => void;
};

function OfferCard({
  offer,
  cardType,
  onListOfferHover,
  onListOfferLeave,
}: OfferPreviewProps): JSX.Element {
  const [offerState, setFavorite] = useState(offer);

  const {
    id,
    title,
    type,
    price,
    previewImage,
    isFavorite,
    isPremium,
    rating,
  } = offerState;

  const handleClickFavorite = () => {
    setFavorite({
      ...offer,
      isFavorite: !isFavorite,
    });
  };

  const handleListOfferHover = (): void => {
    if (onListOfferHover) {
      onListOfferHover(id);
    }
  };

  const handleOfferCardLeave = (): void => {
    if(onListOfferLeave){
      onListOfferLeave();
    }
  };

  return (
    <article
      className={cardType.card}
      onMouseEnter={handleListOfferHover}
      onMouseLeave={handleOfferCardLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType.imageWrapper} place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">&nbsp;/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
            type="button"
            onClick={handleClickFavorite}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating / ONE_PERCENT}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
