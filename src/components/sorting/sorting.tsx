import { useState } from 'react';
import { SortingMap } from '../../config';

type PropsSorting = {
  currentSorting: string;
  onChangeSorting: (newSorting: string) => void;
};

function Sorting({
  currentSorting,
  onChangeSorting,
}: PropsSorting): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleTypeClick = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleSortingItemClick = (type: string) => () => {
    onChangeSorting(type);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpened ? 'places__options--opened' : ''
        }`}
      >
        {Object.entries(SortingMap).map(([type, value]) => (
          <li
            key={type}
            className={`places__option ${
              type === currentSorting ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={handleSortingItemClick(type)}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
