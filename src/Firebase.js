import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
export const getUsers = async () => {
  const usersCollection = collection(firestore, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  return usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getCategory = async () => {
  const categoriesCollection = collection(firestore, 'categories');
  const categoriesSnapshot = await getDocs(categoriesCollection);
  return categoriesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export { app, analytics, auth, firestore, storage };
