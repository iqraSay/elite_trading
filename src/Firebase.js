import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnBdb9hQMg2_VDuIT-1iFCBEs6YGO1iYc",
  authDomain: "elitetrading-72e.firebaseapp.com",
  projectId: "elitetrading-72e",
  storageBucket: "elitetrading-72e.appspot.com",
  messagingSenderId: "1046016967897",
  appId: "1:1046016967897:web:fb8ce3a900929fac382ac8",
  measurementId: "G-L0N5PY9PXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Firestore and Storage
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, firestore, storage };
