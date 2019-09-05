import React from 'react';
import TopLeftClosed from '../images/top-left-closed.svg';
import TopRightClosed from '../images/top-right-closed.svg';
import BottomLeftClosed from '../images/bottom-left-closed.svg';
import BottomRightClosed from '../images/bottom-right-closed.svg';

import TopLeftOpenH from '../images/top-left-open-h.svg';
import TopRightOpenH from '../images/top-right-open-h.svg';
import BottomLeftOpenH from '../images/bottom-left-open-h.svg';
import BottomRightOpenH from '../images/bottom-right-open-h.svg';

export const OuterFlaps = ({ send, closed }) => {
  if (closed) {
    return (
      <fieldset id="colors">
        <button
          id="red"
          aria-label="red"
          onClick={() => send('SET_COLOR', { value: 'red' })}
        >
          <TopLeftClosed />
        </button>
        <button
          id="green"
          aria-label="green"
          onClick={() => send('SET_COLOR', { value: 'green' })}
        >
          <TopRightClosed />
        </button>
        <button
          id="blue"
          aria-label="blue"
          onClick={() => send('SET_COLOR', { value: 'blue' })}
        >
          <BottomLeftClosed />
        </button>
        <button
          id="purple"
          aria-label="purple"
          onClick={() => send('SET_COLOR', { value: 'purple' })}
        >
          <BottomRightClosed />
        </button>
      </fieldset>
    );
  }
  return (
    <div id="colors">
      <TopLeftOpenH />
      <TopRightOpenH />
      <BottomLeftOpenH />
      <BottomRightOpenH />
    </div>
  );
};
