import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import ReviewForm from '../../components/review-form';
import { useParams } from 'react-router-dom';
import { OfferPreview } from '../../types/offer-preview';
import { AppRoute, AuthorizationStatus, Status } from '../../config';
import { NEARBY_OFFERS_COUNT, ONE_PERCENT, TypeCards } from '../../utils/common';
import Map from '../../components/map';
import ReviewList from '../../components/review-list';
import OfferList from '../../components/offer-list';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNearByOffers,
  getOfferDetails,
  getOfferPageDataStatus,
} from '../../store/offers/selector';
import { AppDispatch } from '../../store/store';
import {
  favoriteStatusAction,
  fetchOfferDetailAction,
  fetchOffersAction,
} from '../../store/api-actions';
import Page404 from '../404';
import { getAuthorizationStatus } from '../../store/user/selector';
import classNames from 'classnames';
import { redirectToRoute } from '../../store/actions';

function OfferPage(): JSX.Element {
  const id = useParams().id as string;
  const dispatch: AppDispatch = useDispatch();
  const offerDetails = useSelector(getOfferDetails);
  const nearbyOffers = useSelector(getNearByOffers)
    .filter(
      (item) =>
        offerDetails.city.name === item.city.name && offerDetails.id !== item.id
    )
    .slice(0, NEARBY_OFFERS_COUNT);
  const statusOfferPageData = useSelector(getOfferPageDataStatus);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  useEffect(() => {
    let isOfferPageMounted = true;

    if (id && isOfferPageMounted) {
      dispatch(fetchOfferDetailAction(id));
    }

    return () => {
      isOfferPageMounted = false;
    };
  }, [dispatch, id]);

  const [selectedOfferId, setSelectedOfferId] = useState(id);

  const handleOfferCardHover = (offerId: OfferPreview['id']): void => {
    setSelectedOfferId(offerId);
  };

  const handleOfferCardLeave = (): void => {
    setSelectedOfferId(id);
  };

  if (statusOfferPageData === Status.Error) {
    return <Page404 />;
  }

  const {
    title,
    isPremium,
    type,
    price,
    rating,
    city,
    images,
    goods,
    bedrooms,
    maxAdults,
    host,
    isFavorite,
    description,
  } = offerDetails;

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.Login));
    }

    try {
      dispatch(
        favoriteStatusAction({
          offerId: id,
          status: Number(!offerDetails.isFavorite),
        })
      );
    } finally {
      dispatch(fetchOffersAction());
    }
  };

  return (
    <div className="page">
      <Helmet>
        <title>6 sities: {title || ''}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images &&
                images.map((imageSrc) => (
                  <div className="offer__image-wrapper" key={imageSrc}>
                    <img
                      className="offer__image"
                      src={imageSrc}
                      alt="Photo studio"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={classNames(
                    'offer__bookmark-button',
                    {
                      'offer__bookmark-button--active': isFavorite,
                    },
                    'button'
                  )}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${rating / ONE_PERCENT}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What`s inside</h2>
                <ul className="offer__inside-list">
                  {goods &&
                    goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                {host && (
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{host.name}</span>
                    {host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                )}
                {description && (
                  <div className="offer__description">
                    <p className="offer__text">{description}</p>
                  </div>
                )}
              </div>
              <section className="offer__reviews reviews">
                <ReviewList />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm offerId={id} />
                )}
              </section>
            </div>
          </div>
          {city && (
            <Map
              block="offer"
              city={city}
              offers={[offerDetails, ...nearbyOffers]}
              selectedOfferId={selectedOfferId}
            />
          )}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferList
              cardType={TypeCards.NEAR}
              offers={nearbyOffers}
              onCardOfferHover={handleOfferCardHover}
              onCardOfferLeave={handleOfferCardLeave}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
