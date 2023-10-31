import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'
import { toast } from 'react-toastify';

export default function useCollection(collection) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    let ref = projectFirestore.collection(collection);

    const unsubcribe = ref.onSnapshot(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        console.log(doc);
        results.push({ ...doc.data(), id: doc.id });
      });

      // update status
      setDocuments(results);
      setError(null);
    }, (error) => {
      console.log(error);
      setError(error.message);
      toast.error("couldn't fetch transactions", {autoClose: 2000});
    }) 
  
    // unsubscribe on unmount
    return () => unsubcribe()
  }, [collection])
  

  return { documents, error }
}
