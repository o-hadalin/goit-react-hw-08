import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { selectContacts } from '../../redux/selectors';
import { selectError } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be less than 50 characters')
        .required('Name is required'),
      number: Yup.string()
        .matches(/^\d+$/, 'Phone number must contain only digits')
        .min(7, 'Phone number must be at least 7 digits')
        .max(15, 'Phone number must be less than 15 digits')
        .required('Phone number is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const duplicate = contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      );

      if (duplicate) {
        alert(`${values.name} is already in contacts!`);
        return;
      }

      dispatch(addContact(values));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <label htmlFor="name" className={styles.label}>
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        className={styles.input}
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        autoComplete="name"
      />
      {formik.touched.name && formik.errors.name ? (
        <div className={styles.error}>{formik.errors.name}</div>
      ) : null}
      <label htmlFor="number" className={styles.label}>
        Number
      </label>
      <input
        id="number"
        name="number"
        type="text"
        className={styles.input}
        value={formik.values.number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        autoComplete="tel"
      />
      {formik.touched.number && formik.errors.number ? (
        <div className={styles.error}>{formik.errors.number}</div>
      ) : null}
      {error && <div className={styles.error}>Error: {error}</div>}{' '}
      <button type="submit" className={styles.submitBtn}>
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
