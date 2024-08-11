import React from 'react';
import ReactDOM from 'react-dom/client';

import { attachReduxDevTools } from '@effector/redux-devtools-adapter';

import { initApp } from './app';

if (import.meta.env.DEV) {
  attachReduxDevTools({
    name: 'Story app',
    trace: true,
  });
}

const App = initApp();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
