import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';

import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={styles.userMenu}>
      <span>Welcome, {user.name}!</span>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default UserMenu;
