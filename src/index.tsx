import React from 'react';
import ReactDOM from 'react-dom/client';
import { attachLogger } from 'effector-logger';

import { App } from './app';

if (import.meta.env.DEV) {
  attachLogger();
}

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
