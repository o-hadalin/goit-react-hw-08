import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import contactsReducer from './contactsSlice';
import filtersReducer from './filtersSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
