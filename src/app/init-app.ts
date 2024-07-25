import { App } from './app';
import { startApp } from './model/model';

export const initApp = () => {
  startApp();

  return App;
};
