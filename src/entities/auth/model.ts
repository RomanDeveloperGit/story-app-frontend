import { createEvent, createStore } from 'effector';

import { Dto } from '@/infrastructure/api';

export const setAuthorizedUser = createEvent<Dto['AuthorizedUser'] | null>();

export const $authorizedUser = createStore<Dto['AuthorizedUser'] | null>(null);
$authorizedUser.on(setAuthorizedUser, (_, payload) => payload);

export const $isAuthorized = $authorizedUser.map((user) => Boolean(user));
