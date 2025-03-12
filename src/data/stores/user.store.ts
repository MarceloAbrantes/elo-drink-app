import { LOCAL_STORAGE_KEYS } from 'domain/constants';
import { createStore } from 'lupi';

export const useMeStore = createStore(
  {
    avatar: '',
    accessToken: '',
    refreshToken: '',
  },
  {
    storageKey: LOCAL_STORAGE_KEYS.userStore,
    encryptKey: process.env.USER_ENCRYPT_KEY,
  },
);
