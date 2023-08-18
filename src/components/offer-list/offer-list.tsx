import { Card } from '../../types/card';
import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card';

type OfferListProps = {
  cardType: Card;
  offers: OfferPreview[];
  onCardOfferHover?: (id: OfferPreview['id']) => void;
  onCardOfferLeave?: () => void;
};

function OfferList({
  cardType,
  offers,
  onCardOfferHover,
  onCardOfferLeave,
}: OfferListProps): JSX.Element {
  return (
    <div className={cardType.list}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onCardOfferHover={onCardOfferHover}
          onCardOfferLeave={onCardOfferLeave}
        />
      ))}
    </div>
  );
}

export default OfferList;
