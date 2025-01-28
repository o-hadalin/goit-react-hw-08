import { createSelector } from 'reselect';

export const selectFilterValue = state => state.filters.name;
export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectDeletingIds = state => state.contacts.deletingIds;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilterValue],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
