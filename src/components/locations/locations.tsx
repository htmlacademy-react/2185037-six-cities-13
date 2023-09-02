import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { City } from '../../types/city';
import { switchCity } from '../../store/offers/offer-slice';
import { getCurrentCity } from '../../store/offers/selector';
import { CITIES } from '../../config';

function Locations(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const currentCity = useSelector(getCurrentCity);

  const handleClickCity = (city: City['name']) => () => {
    dispatch(switchCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES && CITIES.map((city) => (
            <li
              className="locations__item"
              key={city}
              onClick={handleClickCity(city)}
            >
              <a
                className={`locations__item-link tabs__item ${
                  city === currentCity ? 'tabs__item--active' : ''
                }`}
                href="#"
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
