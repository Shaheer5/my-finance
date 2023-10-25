import { projectFirestore } from '../firebase/config';
import { useReducer, useState, useEffect } from 'react';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {

    default:
      return state;
  }
}
export const useFirestore = (collection) => {

  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  
  // collection ref
  const ref = projectFirestore.collection(collection)

  // add a document
  const addDocument = async (doc) => {

  }

  // delete a document
  const deleteDocument = async (id) => {

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
