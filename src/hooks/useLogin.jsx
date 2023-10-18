import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { toast } from 'react-toastify';
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [ isCancelled, setIsCancelled ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ isPending, setIsPending ] = useState(false);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // Sign the user in
    try {
      const response = await projectAuth.signInWithEmailAndPassword(email, password);

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      // Update state if the component is Cancelled
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        toast.success("Logged in successfully", { autoClose: 2000 });
        navigate("/");
      }
    }
    catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
        toast.error("Email or Password is Invalid", { autoClose: 2000 });
      }
    }

    // cleanup function
    useEffect(() => {
      return () => setIsCancelled(true);
    }, [])
    
  };
  
  return { login, error, isPending };
};