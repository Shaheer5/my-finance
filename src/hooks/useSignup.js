import { useState } from "react"
import { projectAuth } from "../firebase/config"
import { toast } from 'react-toastify';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (displayName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const response = await projectAuth.createUserWithEmailAndPassword(email, password);
      console.log(response.user);

      if(!response) {
        throw new Error("Couldn't complete signup")
      }

      // add display name to user 
      await response.user.updateProfile({ displayName })

      setIsPending(false);
      setError(null)
      toast.success("Account created successfully", {autoClose: 2000})
    }
    catch (err) {
      console.log(err.message);
      setError(err.message);  
      setIsPending(false);
      toast(err.message, {autoClose: 2000, type: 'error'})
    }
  }

  return { error, isPending, signup };
}
