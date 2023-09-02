import { OfferPreview } from '../../types/offer-preview';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../config';
import { ONE_PERCENT } from '../../utils/common';
import { Card } from '../../types/card';
import { favoriteStatusAction, fetchOffersAction } from '../../store/api-actions';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user/selector';
import { AppDispatch } from '../../store/store';
import { redirectToRoute } from '../../store/actions';

type OfferPreviewProps = {
  offer: OfferPreview;
  cardType: Card;
  onCardOfferHover?: (id: OfferPreview['id']) => void;
  onCardOfferLeave?: () => void;
};

function OfferCard({
  offer,
  cardType,
  onCardOfferHover,
  onCardOfferLeave,
}: OfferPreviewProps): JSX.Element {
  console.log('Offer');
  const {
    id,
    title,
    type,
    price,
    previewImage,
    isFavorite,
    isPremium,
    rating,
  } = offer;

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch: AppDispatch = useDispatch();

  const handleCardOfferHover = (): void => {
    if (onCardOfferHover) {
      onCardOfferHover(id);
    }
  };

  const handleCardOfferLeave = (): void => {
    if(onCardOfferLeave){
      onCardOfferLeave();
    }
  };

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.Login));
    }

    try {
      dispatch(
        favoriteStatusAction({
          offerId: id,
          status: Number(!offer.isFavorite),
        })
      );
    } finally {
      dispatch(fetchOffersAction());
    }
  };

  return (
    <article
      className={cardType.card}
      onMouseEnter={handleCardOfferHover}
      onMouseLeave={handleCardOfferLeave}
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
            onClick={handleFavoriteClick}
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
