import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-hddie7J-3bSfZygFw3sP0PgXZWQOhNQ",
  authDomain: "dropbox-ee88c.firebaseapp.com",
  projectId: "dropbox-ee88c",
  storageBucket: "dropbox-ee88c.appspot.com",
  messagingSenderId: "602202076833",
  appId: "1:602202076833:web:cd17540a05e2e9b5fce2e0",
  measurementId: "G-3DFFGKD41R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, storage, auth, provider };
