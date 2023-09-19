import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {

  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth context must be inside an AuthContextProvider');
  }
  
  return context;
}