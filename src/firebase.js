import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCs-MWC3eWkrZgX7Q2flo_8VSJ1sekFaEU",
  authDomain: "instagram-react-6f590.firebaseapp.com",
  projectId: "instagram-react-6f590",
  storageBucket: "instagram-react-6f590.appspot.com",
  messagingSenderId: "591820892681",
  appId: "1:591820892681:web:351b5f5674c4de18b1a6d8",
  measurementId: "G-EMBRCR665W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, storage, auth, provider };
