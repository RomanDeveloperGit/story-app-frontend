import { createEvent, createStore } from 'effector';

import { Dto } from '@/shared/api';

export const $authorizedUser = createStore<Dto['AuthorizedUser'] | null>(null);
export const $isAuthorized = $authorizedUser.map((user) => Boolean(user));
export const setAuthorizedUser = createEvent<Dto['AuthorizedUser'] | null>();

$authorizedUser.on(setAuthorizedUser, (_, payload) => payload);
