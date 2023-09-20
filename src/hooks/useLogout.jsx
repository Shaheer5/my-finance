import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { toast } from 'react-toastify';
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      await projectAuth.signOut()

      // dispatch logout action
      dispatch({ type: "LOGOUT" })

      // updating state if the component is unmounted
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        toast.success("Logged out successfully", { autoClose: 2000 });
      }
    }
    catch (err) {
      if (!isCancelled) {
        console.log(err.messaga);
        setError(err.messaga);
        setIsPending(false);
        toast.error("Logout unsuccessful", { autoClose: 2000 });
      }
    }
  }

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending }
}