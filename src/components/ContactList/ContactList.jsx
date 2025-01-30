import { useSelector } from 'react-redux';

import Contact from '../Contact/Contact';
import {
  selectFilteredContacts,
  selectIsLoading,
  selectError,
} from '../../redux/contacts/selectors';

import styles from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) {
    return <p>Loading... Please wait a little</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
};

export default ContactList;
