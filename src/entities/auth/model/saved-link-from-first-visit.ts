import { createEvent, createStore } from 'effector';

export const $savedLinkFromFirstVisit = createStore<string | null>(null);
export const setSavedLinkFromFirstVisit = createEvent<string>();
export const resetSavedLinkFromFirstVisit = createEvent();

$savedLinkFromFirstVisit
  .on(setSavedLinkFromFirstVisit, (_, payload) => payload)
  .on(resetSavedLinkFromFirstVisit, () => null);
