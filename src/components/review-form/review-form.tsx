import {
  ChangeEvent,
  Fragment,
  useState,
  useEffect,
  useRef,
  FormEvent,
} from 'react';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusReview } from '../../store/offers/selector';
import { Status } from '../../config';
import { setStatusReview } from '../../store/offers/offer-slice';
import { reviewAction } from '../../store/api-actions';
import { Offer } from '../../types/offer';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;
const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

type ReviewEvent = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

type ReviewFormProps = {
  offerId: Offer['id'];
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const reviewStatus = useSelector(getStatusReview);
  const formRef = useRef<HTMLFormElement | null>(null);
  const isValid =
    comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating !== 0;

  useEffect(() => {
    if (reviewStatus === Status.Success && formRef) {
      dispatch(setStatusReview(Status.Idle));
      setRating(0);
      setComment('');
    }
  }, [dispatch, reviewStatus]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isValid) {
      dispatch(
        reviewAction({
          comment,
          rating,
          offerId,
        })
      );
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" ref={formRef} onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                id={`${score}-stars`}
                type="radio"
                checked={Number(rating) === Number(score)}
                onChange={({ target }: ReviewEvent) => {
                  setRating(Number(target.value));
                }}
                value={score}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={({ target }: ReviewEvent) => {
          setComment(target.value);
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
