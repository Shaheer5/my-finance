import React, { useState } from 'react';
import styles from './Signup.module.css'; // Import your existing styles

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword);
    setIsValid(isValidPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      alert('Password is invalid. Please follow the password requirements.');
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
        />
      </label>
      <label>
        <span>Last Name:</span>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          placeholder='Last Name'
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='name@email.com'
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder='*********'
          className={isValid ? styles['valid-input'] : styles['invalid-input']}
        />
        {isValid ? (
          <p>Password is valid!</p>
        ) : (
          <p>Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.</p>
        )}
      </label>
      <button className="btn">Signup</button>
    </form>
  );
}
