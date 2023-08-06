import { City } from '../../types/city';

type LocationsProps = {
  locations: City[];
};

function Locations({ locations }: LocationsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map(({ name }, index) => (
            <li className="locations__item" key={name}>
              <a
                className={`locations__item-link tabs__item ${
                  index === 0 ? 'tabs__item--active' : ''
                }`}
                href="#"
              >
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
