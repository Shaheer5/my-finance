import { toast } from 'react-toastify';
import { projectFirestore, timestamp } from '../firebase/config';
import { useReducer, useState, useEffect } from 'react';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state;
  }
}
export const useFirestore = (collection) => {

  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
      toast.error("couldn't add transaction", err.message , { autoClose: 2000 });
    }

  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" })

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" })
      toast.success("Transaction Deleted", { autoClose: 2000 });
    }
    catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      toast.error("couldn't delete transaction", err.message, { autoClose: 2000 });
    }

  }

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
