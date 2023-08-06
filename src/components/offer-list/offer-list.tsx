import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card';

type OfferListProps = {
  offers: OfferPreview[];
  onListOfferHover: (id: OfferPreview['id']) => void;
  onListOfferLeave: () => void;
};

function OfferList({ offers, onListOfferHover, onListOfferLeave }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onListOfferHover={onListOfferHover}
          onListOfferLeave={onListOfferLeave}
        />
      ))}
    </div>
  );
}

export default OfferList;
