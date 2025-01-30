import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import SearchBox from '../components/SearchBox/SearchBox';

import { fetchContacts } from '../redux/contacts/operations';
import { selectIsLoading, selectError } from '../redux/contacts/selectors';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <SearchBox />
      {isLoading ? (
        <p>Loading... Please wait a little</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ContactList />
      )}
    </div>
  );
};

export default ContactsPage;
