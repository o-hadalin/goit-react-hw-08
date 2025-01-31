import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectIsLoading, selectError } from '../../redux/contacts/selectors';
import { selectFilterValue } from '../../redux/filters/selectors';

import styles from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(selectFilterValue);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) {
    return <p>Loading... Please wait a little</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredContacts = contacts.filter(contact => {
    const nameMatch = contact.name.toLowerCase().includes(filter);
    const phoneMatch = contact.number.includes(filter);
    return nameMatch || phoneMatch;
  });

  return (
    <ul className={styles.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
};

export default ContactList;
