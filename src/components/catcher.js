import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { OuterFlaps } from './outer-flaps';
import { cootieMachine } from '../state/app';
import { useMachine } from '@xstate/react';

const Catcher = () => {
  const [current, send] = useMachine(cootieMachine);
  const { color, closed, countString } = current.context;
  const { message } = Object.values(current.meta)[0];
  let displayString;
  if (countString) {
    displayString =
      typeof countString === 'number' ? countString : countString[0];
  }

  console.log(current.context);
  return (
    <form className="catcher" action="#">
      <h2>{message}</h2>
      {displayString && <p>{displayString}</p>}
      <OuterFlaps send={send} closed={closed} />
      {color && (
        <fieldset>
          <legend>Numbers</legend>
          <button
            id="one"
            aria-label="one"
            onClick={() => send('SET_NUMBER', { value: 1 })}
          >
            1
          </button>
          <button
            id="two"
            aria-label="two"
            onClick={() => send('SET_NUMBER', { value: 2 })}
          >
            2
          </button>
          <button
            id="three"
            aria-label="three"
            onClick={() => send('SET_NUMBER', { value: 3 })}
          >
            3
          </button>
          <button
            id="four"
            aria-label="four"
            onClick={() => send('SET_NUMBER', { value: 4 })}
          >
            4
          </button>
        </fieldset>
      )}
    </form>
  );
};

export default Catcher;
