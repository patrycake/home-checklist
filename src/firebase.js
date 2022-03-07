import { initializeApp } from "firebase/app";
import { useState, useEffect, useContext, createContext } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQTj2JXODiii_XZKOPytRke6nSQ_Brp84",
  authDomain: "home-checklist-abd8f.firebaseapp.com",
  projectId: "home-checklist-abd8f",
  storageBucket: "home-checklist-abd8f.appspot.com",
  messagingSenderId: "120808063156",
  appId: "1:120808063156:web:89f9a106e8548a5e0517e1",
};

const app = initializeApp(firebaseConfig);
/* Context in react is a tool that allows you to share state throughout 
the whole react component without having to pass it down by props. */
const AuthContext = createContext();
const auth = getAuth(app);
const db = getFirestore(app);

const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      setUser,
      setError,
      setLoading(false)
    );
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user, error, loading }} {...props} />;
};

const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};

const googleProvider = new GoogleAuthProvider();
const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  AuthContext,
  useAuthState,
  AuthContextProvider,
  loginWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
