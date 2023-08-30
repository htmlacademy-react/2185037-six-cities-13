import store from '../store';
import { clearErrorAction } from '../store/api-actions';
import { setError } from '../store/offer-slice';

export const proccessErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
