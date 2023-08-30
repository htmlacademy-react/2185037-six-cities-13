import { fetchOffersAction } from '../../store/api-actions';
import store from '../../store';
import { useSelector } from 'react-redux';
import { getError } from '../../store/offer-slice';

export default function ErrorScreen(): JSX.Element {
  const error = useSelector(getError);

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">{error}</h1>
            <button
              onClick={() => {
                store.dispatch(fetchOffersAction());
              }}
              type="button"
              className=""
            >
              To try one more time ...
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
