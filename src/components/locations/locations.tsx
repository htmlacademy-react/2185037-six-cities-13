import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { City } from '../../types/city';
import { switchCity } from '../../store/offer-slice';
import { LOCATIONS } from '../../mocks/locations';

function Locations(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  const handleClickCity = (city: City) => {
    dispatch(switchCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {LOCATIONS.map((city, index) => (
            <li className="locations__item" key={city.name} >
              <a
                className={`locations__item-link tabs__item ${
                  index === 0 ? 'tabs__item--active' : ''
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
