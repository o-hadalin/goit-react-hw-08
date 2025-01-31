import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
<<<<<<< HEAD
import { toast } from 'react-hot-toast';

import { useDispatch } from 'react-redux';
=======
import { useDispatch, useSelector } from 'react-redux';
>>>>>>> 01d990f5623c2ead5ca38adab7dbf0bf1f1adb3a
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { register } from '../../redux/auth/operations';
import { clearError } from '../../redux/auth/slice';

import styles from './RegistrationForm.module.css';

const registrationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const registerError = useSelector(state => state.auth.error);

  useEffect(() => {
    if (registerError) {
      toast.error(`Registration failed: ${registerError}`);
      dispatch(clearError());
    }
  }, [registerError, dispatch]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success('Registration successful!');
      resetForm();
    } catch (error) {
      toast.error(error || 'Registration failed. Please try again.');
    }
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
          <Field className={styles.input} type="email" name="email" />
          <ErrorMessage className={styles.error} name="email" component="div" />
        </label>
        <label className={styles.label}>
          Password:
          <Field className={styles.input} type="password" name="password" />
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
