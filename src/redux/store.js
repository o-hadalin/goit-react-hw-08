import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  

import contactsReducer from './contacts/slice';
import filtersReducer from './filters/slice';
import authReducer from './auth/slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts', 'filters', 'auth'], 
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'], 
    },
  }),
});

export const persistor = persistStore(store);
