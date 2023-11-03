import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// styles
import styles from './Navbar.module.css'

export default function Navbar() {

  const { logout } = useLogout();
  const { user } = useAuthContext();


  return (
    <nav className={styles.navbar}>
      <div className={styles.title}><Link to="/">myFinance</Link></div>

      {user ?
        (
          <div className={styles.navRight}>
            <p>Hello, <span style={{ textTransform: "capitalize", fontWeight: "bold", textAlign: 'right' }}>{user.displayName}</span></p>
            <button className="btn" onClick={logout} >Logout</button>
          </div>
        ) : (
          <div className={styles.navRight}>
            <p style={{ marginRight: "8px" }}><Link to="/login">Login</Link></p>
            <Link to="/signup">Signup</Link>
          </div>
        )}
    </nav>
  )
}
