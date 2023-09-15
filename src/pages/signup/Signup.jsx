import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import your existing styles
import styles from './Signup.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const navigate = useNavigate();

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
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill out each input fields", {autoClose: 2000});
    } else if (!isValid) {
      toast.error("Password is invalid. Please follow the password requirements.", {autoClose: 2000});
      return;
    } else if (!isConfirmed) {
      toast.warning("Passwords do not match. Please confirm your password.", {autoClose: 2000});
      return;
    } else if (isConfirmed) {
      toast.success("Passwords Created Successfully, Navigating to Home Page", {autoClose: 2000});
      setTimeout(() => {
        navigate('/')
      }, 2000);
      return;
    }
    console.log(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
      <label>
        <span>First Name:</span>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          placeholder='First Name'
          // required
        />
      </label>
      <label>
        <span>Last Name:</span>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          placeholder='Last Name'
          // required
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='name@email.com'
          // required
        />
      </label>
      <label>
        <span>Password:</span>
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
          <p>Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.</p>
        )}
      </label>
      <label>
        <span>Confirm Password:</span>
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
      <button className="btn">Signup</button>
    </form>
  );
}
