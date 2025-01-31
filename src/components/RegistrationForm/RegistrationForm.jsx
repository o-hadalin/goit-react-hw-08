import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../../redux/auth/operations';

import styles from './RegistrationForm.module.css';

const registrationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={registrationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label className={styles.label}>
          Name:
          <Field className={styles.input} type="text" name="name" />
          <ErrorMessage className={styles.error} name="name" component="div" />
        </label>
        <label className={styles.label}>
          Email:
          <Field className={styles.input} type="email" name="email" autoComplete="email"/>
          <ErrorMessage className={styles.error} name="email" component="div" />
        </label>
        <label className={styles.label}>
          Password:
          <Field className={styles.input} type="password" name="password" autoComplete="current-password"/>
          <ErrorMessage
            className={styles.error}
            name="password"
            component="div"
          />
        </label>
        <button className={styles.button} type="submit">
          Register
        </button>

        <p className={styles.link}>
          Already have an account? <Link to="/login">Log in here</Link>.
        </p>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
