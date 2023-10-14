import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogin } from '../../hooks/useLogin';

// styles 
import styles from './Login.module.css'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();
  
  const navigate = useNavigate();

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
    } else if (email && password) {
        login(email, password)
        navigate('/');
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
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='*********'
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className='btn-loading' disabled>loading</button>}
    </form>
  )
} 
