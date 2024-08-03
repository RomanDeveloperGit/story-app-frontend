import { startApp } from './model/model';
import { App } from './ui/app';

export const initApp = () => {
  startApp();

  return App;
};
