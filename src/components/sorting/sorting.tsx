import { useState } from 'react';
import { SortingMap } from '../../config';
import classNames from 'classnames';

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

  const getSortingHandler = (type: SortingMap) => () => {
    onChangeSorting(type);
    setIsOpened(false);
  };

  return (
    <div className="places__sorting">
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
            className={classNames('places__option', {
              'places__option--active': type === currentSorting,
            })}
            tabIndex={0}
            onClick={getSortingHandler(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sorting;
