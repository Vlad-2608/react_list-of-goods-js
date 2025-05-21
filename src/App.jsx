// import 'bulma/css/bulma.css';
// import './App.scss';

// export const goodsFromServer = [
//   'Dumplings',
//   'Carrot',
//   'Eggs',
//   'Ice cream',
//   'Apple',
//   'Bread',
//   'Fish',
//   'Honey',
//   'Jam',
//   'Garlic',
// ];

// export const App = () => (
//   <div className="section content">
//     <div className="buttons">
//       <button type="button" className="button is-info is-light">
//         Sort alphabetically
//       </button>

//       <button type="button" className="button is-success is-light">
//         Sort by length
//       </button>

//       <button type="button" className="button is-warning is-light">
//         Reverse
//       </button>

//       <button type="button" className="button is-danger is-light">
//         Reset
//       </button>
//     </div>

//     <ul>
//       <li data-cy="Good">Dumplings</li>
//       <li data-cy="Good">Carrot</li>
//       <li data-cy="Good">Eggs</li>
//       <li data-cy="Good">Ice cream</li>
//       <li data-cy="Good">Apple</li>
//       <li data-cy="Good">...</li>
//     </ul>
//   </div>
// );

import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortOrder, setSortOrder] = useState('initial');
  const [isReversed, setIsReversed] = useState(false);

  const applySorting = useCallback(() => {
    const sortedGoods = [...goodsFromServer];

    if (sortOrder === 'alphabetical') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  }, [sortOrder, isReversed]);

  useEffect(() => {
    applySorting();
  }, [applySorting]);

  const handleSortAlphabetically = () => {
    setSortOrder('alphabetical');
    setIsReversed(false);
  };

  const handleSortByLength = () => {
    setSortOrder('length');
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortOrder('initial');
    setIsReversed(false);
  };

  const isInitialOrder =
    JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetical' && !isReversed ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' && !isReversed ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
