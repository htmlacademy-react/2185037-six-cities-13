import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card';

type OfferListProps = {
  blockClassName: string;
  offers: OfferPreview[];
  onListOfferHover: (id: OfferPreview['id']) => void;
  onListOfferLeave: () => void;
};

function OfferList({ blockClassName, offers, onListOfferHover, onListOfferLeave }: OfferListProps): JSX.Element {
  return (
    <div className={blockClassName}>
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
