import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { toast } from 'react-toastify';
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const signup = async (displayName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const response = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!response) {
        throw new Error("Couldn't complete signup")
      }

      // create display name for user 
      await response.user.updateProfile({ displayName })

      // dispatch login action
      dispatch({ type: "LOGIN", payload: response.user })

      // updating state if the component is unmounted
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        toast.success("Account created successfully", { autoClose: 2000 });
        navigate("/");
      }
    }
    catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
        toast(err.message, { autoClose: 2000, type: 'error' });
      }
    }
  }

    // cleanup function
    useEffect(() => {
      return () => setIsCancelled(true);
    }, []);

  return { signup, error, isPending };
}
