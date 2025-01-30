import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

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
