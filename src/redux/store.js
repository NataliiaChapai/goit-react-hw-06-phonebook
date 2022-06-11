import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsSlice from "./contactsSlice";

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger);

const persistConfig = {
    key: 'contacts',
    storage,
    blacklist: ['filter'],
}

const store = configureStore({
    reducer: {
        contacts: persistReducer(persistConfig, contactsSlice.reducer),
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware,
});

const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };