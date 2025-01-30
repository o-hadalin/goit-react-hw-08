import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div>
      <NavLink to="/register" className={styles.authButton}>
        Register
      </NavLink>
      <NavLink to="/login" className={styles.authButton}>
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
