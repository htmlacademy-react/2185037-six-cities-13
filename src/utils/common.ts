const ONE_PERCENT: number = 5 / 100;

const URL_MARKER_DEFAULT = './img/pin.svg';

const URL_MARKER_CURRENT = './img/pin-active.svg';

const TILELAYER =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const COPYRIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const NEARBY_OFFERS_COUNT = 3;

const TypeCards = {
  CITIES: {
    list: 'cities__places-list places__list tabs__content',
    card: 'cities__card place-card',
    imageWrapper: 'cities__image-wrapper'
  },
  FAVORITE: {
    list: 'favorites__places',
    card: 'favorites__card place-card',
    imageWrapper: 'favorites__image-wrapper'
  },
  NEAR: {
    list: 'near-places__list places__list',
    card: 'near-places__card place-card',
    imageWrapper: 'near-places__image-wrapper'
  }
};

export {
  ONE_PERCENT,
  URL_MARKER_DEFAULT,
  URL_MARKER_CURRENT,
  TILELAYER,
  COPYRIGHT,
  NEARBY_OFFERS_COUNT,
  TypeCards
};
