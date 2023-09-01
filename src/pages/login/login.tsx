import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo';
import { FormEvent, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/api-actions';
import { AppDispatch } from '../../store/store';
import {
  getAuthorizationStatus,
  getLoginStatus,
} from '../../store/user/selector';
import { AppRoute, AuthorizationStatus, Status } from '../../config';
import { redirectToRoute } from '../../store/actions';
import { setLoginStatus } from '../../store/user/user-slice';

function LoginPage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const loginStatus = useSelector(getLoginStatus);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const loginRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
  const [isCorrectLogin, setIsCorrectLogin] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, authorizationStatus]);

  useEffect(() => {
    if (
      loginStatus === Status.Success &&
      loginRef.current &&
      passwordRef.current
    ) {
      dispatch(setLoginStatus(Status.Idle));
      loginRef.current.value = '';
      passwordRef.current.value = '';
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, loginStatus]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsCorrectLogin(true);
    setIsCorrectPassword(true);

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (!passwordRegex.test(passwordRef.current.value)) {
        setIsCorrectPassword(false);
        return;
      }

      if (!loginRegex.test(loginRef.current.value)) {
        setIsCorrectLogin(false);
        return;
      }

      dispatch(
        loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 sities: login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                {!isCorrectLogin && (
                  <p
                    style={{
                      color: 'red',
                      fontSize: '14px',
                    }}
                  >
                    Enter a valid email
                  </p>
                )}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                {!isCorrectPassword && (
                  <p
                    style={{
                      color: 'red',
                      fontSize: '14px',
                    }}
                  >
                    At least 1 letter and 1 number without spaces
                  </p>
                )}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
