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
      <ul className="">
        <li className={styles.title}><Link to="/">myFinance</Link></li>

        {user ?
          (
            <>
              <li>Hello, <span style={{textTransform: "capitalize", fontWeight: "bold"}}>{user.displayName}</span></li>
              <li>
                <button className="btn" onClick={logout} >Logout</button>
              </li>
            </>
          ) : (
            <>
              <li style={{marginRight: "4px"}}><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}

      </ul>
    </nav>
  )
}
