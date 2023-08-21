import { useState } from 'react';
import { SortingMap } from '../../config';

type PropsSorting = {
  currentSorting: SortingMap;
  onChangeSorting: (newSorting: SortingMap) => void;
};

function Sorting({
  currentSorting,
  onChangeSorting,
}: PropsSorting): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleTypeClick = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleSortingItemClick = (type: SortingMap) => () => {
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
        {Object.values(SortingMap).map((type) => (
          <li
            key={type}
            className={`places__option ${
              type === currentSorting ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={handleSortingItemClick(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
