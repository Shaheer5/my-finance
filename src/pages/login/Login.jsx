import React from 'react'
import { useState } from 'react'

// styles 
import styles from './Login.module.css'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword);
    setIsValid(isValidPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
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
        />
        {isValid ? (
          <p>Password is valid!</p>
        ) : (
          <p>Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.</p>
        )}
      </label>
      <button className="btn">Login</button>
    </form>
  )
} 
