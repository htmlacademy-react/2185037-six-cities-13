import { fetchOffersAction } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

export default function ErrorPage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Failed to load data from server</h1>
            <button
              onClick={() => {
                dispatch(fetchOffersAction());
              }}
              type="button"
              className="login__submit form__submit button"
              style={{
                width: 'max-content',
                letterSpacing: '.1em',
              }}
            >
              To try one more time ...
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
