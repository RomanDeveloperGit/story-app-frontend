import { createEvent, createStore } from 'effector';

import { Dto } from '@/infrastructure/api';

// I temporary use fake role types until the backend is ready
export type Role = 'user' | 'admin';

export const setAuthorizedUser = createEvent<Dto['AuthorizedUser'] | null>();

export const $authorizedUser = createStore<Dto['AuthorizedUser'] | null>(null);
$authorizedUser.on(setAuthorizedUser, (_, payload) => payload);

export const $isAuthorized = $authorizedUser.map((user) => Boolean(user));
