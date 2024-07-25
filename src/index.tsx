import React from 'react';
import ReactDOM from 'react-dom/client';

import { attachLogger } from 'effector-logger';

import { initApp } from './app';

// https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc
// TODO: to think about refresh by the time

if (import.meta.env.DEV) {
  attachLogger();
}

const App = initApp();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
