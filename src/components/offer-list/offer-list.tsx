import { Card } from '../../types/card';
import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card';

type OfferListProps = {
  cardType: Card;
  offers: OfferPreview[];
  onListOfferHover?: (id: OfferPreview['id']) => void;
  onListOfferLeave?: () => void;
};

function OfferList({
  cardType,
  offers,
  onListOfferHover,
  onListOfferLeave,
}: OfferListProps): JSX.Element {
  return (
    <div className={cardType.list}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onListOfferHover={onListOfferHover}
          onListOfferLeave={onListOfferLeave}
        />
      ))}
    </div>
  );
}

export default OfferList;
