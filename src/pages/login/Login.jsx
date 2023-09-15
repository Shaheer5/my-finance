import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles 
import styles from './Login.module.css'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      toast.error("Please Enter Credentials", {autoClose: 2000});
      return;
    } else if (email === "") {
      toast.error("Please Enter Email", {autoClose: 2000});
      return;
    } else if (password === "") {
      toast.error("Please Enter Password", {autoClose: 2000});
      return;
    } else if (email === "freshfries@yes.com" && password === "12345") {
      toast.success("Logged in", {autoClose: 2000});
      setTimeout(() => {
        navigate('/')
      }, 2000);
      return;
    } else {
      toast.error("Credentials are wrong", {autoClose: 2000});
      return;
    }
  };

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
      <p>enter this username for test: <b>freshfries@yes.com</b></p>
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder='*********'
        />
      <p>enter this password for test: <b>12345</b></p>
      </label>
      <button className="btn">Login</button>
    </form>
  )
} 
