import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card';

type OfferListProps = {
  offers: OfferPreview[];
  onListOfferHover: (id: OfferPreview['id']) => void;
};

function OfferList({ offers, onListOfferHover }: OfferListProps): JSX.Element {
  const handleListOfferHover = (id: OfferPreview['id']): void => {
    onListOfferHover(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onListOfferHover={handleListOfferHover}
        />
      ))}
    </div>
  );
}

export default OfferList;
