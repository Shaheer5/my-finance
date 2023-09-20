import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { toast } from 'react-toastify';
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      const response = await projectAuth.signInWithEmailAndPassword(email, password);

      // dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      // updating state if the component is unmounted
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        toast.success("Logged in successfully", { autoClose: 2000 });
      }
    }
    catch (err) {
      if (!isCancelled) {
        console.log(err.messaga);
        setError(err.messaga);
        setIsPending(false);
        toast.error(err.messaga, { autoClose: 2000 });
      }
    }
  }

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  
  return { login, error, isPending }
}