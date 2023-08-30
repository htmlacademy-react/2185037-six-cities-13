import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { City } from '../../types/city';
import { getCurrentCity, switchCity } from '../../store/offers/offer-slice';
import { LOCATIONS } from '../../mocks/locations';

function Locations(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const currentCity = useSelector(getCurrentCity);

  const handleClickCity = (city: City) => () => {
    dispatch(switchCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {LOCATIONS.map((city) => (
            <li
              className="locations__item"
              key={city.name}
              onClick={handleClickCity(city)}
            >
              <a
                className={`locations__item-link tabs__item ${
                  city.name === currentCity.name ? 'tabs__item--active' : ''
                }`}
                href="#"
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
