import React from 'react';

export const { Provider, Consumer } = React.createContext({});

export function clickHandler(handler) {
  return event => {
    event.preventDefault();
    handler();
  };
}
