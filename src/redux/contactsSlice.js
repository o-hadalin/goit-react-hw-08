import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  deletingIds: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load contacts';
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to add contact';
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.deletingIds.push(action.meta.arg);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
        state.deletingIds = state.deletingIds.filter(
          id => id !== action.meta.arg
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.deletingIds = state.deletingIds.filter(
          id => id !== action.meta.arg
        );
        state.error = action.payload || 'Failed to delete contact';
      });
  },
});

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filters.name;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export default contactsSlice.reducer;
