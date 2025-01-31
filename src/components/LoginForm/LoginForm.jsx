import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../redux/auth/operations';
import { clearError } from '../../redux/auth/slice';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import styles from './LoginForm.module.css';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(state => state.auth.error);

  useEffect(() => {
    if (loginError) {
      toast.error(`Login failed: ${loginError}`);
      dispatch(clearError());
    }
  }, [loginError, dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
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
          Log In
        </button>
        <p className={styles.link}>
          No account yet? <Link to="/register">Sign up here</Link>.
        </p>
      </Form>
    </Formik>
  );
};

export default LoginForm;
