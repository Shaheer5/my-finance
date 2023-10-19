import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSignup } from '../../hooks/useSignup';
import { Link } from 'react-router-dom';

// Import your existing styles
import styles from './Signup.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setdisplayName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { signup, isPending, error } = useSignup();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword);
    setIsValid(isValidPassword);
    setIsConfirmed(newPassword === confirmPassword);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setIsConfirmed(password === e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !displayName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill out each input fields", { autoClose: 2000 });
    } else if (!isValid) {
      toast.error("Password is invalid. Please follow the password requirements.", { autoClose: 2000 });
      return;
    } else if (!isConfirmed) {
      toast.warning("Passwords do not match. Please confirm your password.", { autoClose: 2000 });
      return;
    } else if (isConfirmed) {
      signup(displayName, email, password);
      return;
    }
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
      <label>
        <span>username:</span>
        <input
          type="text"
          onChange={(e) => setdisplayName(e.target.value)}
          value={displayName}
          placeholder='freshfries01'
        // required
        />
      </label>
      <label>
        <span>email:</span>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='name@email.com'
        // required
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder='*********'
          className={isValid ? styles['valid-input'] : styles['invalid-input']}
        // required
        />
        {isValid ? (
          <p>Password is valid!</p>
        ) : (
          <p>Password must contain at least one uppercase & lowercase letter, one digit, one special character, and be at least 8 characters long.</p>
        )}
      </label>
      <label>
        <span>confirm password:</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          placeholder='*********'
          className={isConfirmed ? styles['valid-input'] : styles['invalid-input']}
        // required
        />
        {isConfirmed ? (
          <p>Password Matched</p>
        ) : (
          <p>Password must match</p>
        )}
      </label>
      {!isPending && <button className="btn">Signup</button>}
      {isPending && <button className='btn-loading' disabled>loading</button>}
      <Link
        to={'/login'}
        style={{ color: "blue", fontSize: "14px", textAlign: "end" }}
      ><span>login instead</span></Link>
    </form>
  );
}
