import { useState, useEffect, useRef } from 'react'
import { projectFirestore } from '../firebase/config'
import { toast } from 'react-toastify';

export default function useCollection(collection, _query) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;

  useEffect(() => {

    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

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
      toast.error("couldn't fetch transactions", { autoClose: 2000 });
    })

    // unsubscribe on unmount
    return () => unsubcribe()
  }, [collection, query])


  return { documents, error }
}
