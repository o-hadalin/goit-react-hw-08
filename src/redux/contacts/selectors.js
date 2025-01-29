import { createSelector } from 'reselect';

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filters.name;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectDeletingIds = state => state.contacts.deletingIds;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    )
);
