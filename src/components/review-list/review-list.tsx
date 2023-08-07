import { Review } from '../../types/review';
import { ONE_PERCENT } from '../../utils/common';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <li className="reviews__item" key={review.id}>
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={review.user.avatarUrl}
                width={54}
                height={54}
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">{review.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${review.rating / ONE_PERCENT}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">{review.comment}</p>
            <time
              className="reviews__time"
              dateTime={new Date(review.date).toISOString().split('T')[0]}
            >
              {new Date(review.date).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;
