import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBRhYgfKEKEemLLTnoNI_fobnKDDWW9jBI",
  authDomain: "myfinance-260f1.firebaseapp.com",
  projectId: "myfinance-260f1",
  storageBucket: "myfinance-260f1.appspot.com",
  messagingSenderId: "271832091793",
  appId: "1:271832091793:web:8312ff3173f717f5bcc330"
};

// init app
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp service
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp }