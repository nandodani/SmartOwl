import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updatePassword,
  updateEmail,
  deleteUser,
  EmailAuthProvider,
signInWithCredential} from "firebase/auth";
import { auth, db, app } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password) => {
    console.log("Bem vindo:" + email, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userCredentialData = userCredential.user;
      const uid = userCredentialData.uid;
      const userEmail = userCredentialData.email;

      localStorage.setItem("uid", uid);

      const userRef = doc(db, "users", uid);
      await setDoc(userRef, { email: userEmail });
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      console.error(error);
    }
  };

  /*
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userCredentialData = userCredential.user;
      const uid = userCredentialData.uid;
      localStorage.setItem("uid", uid);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
*/
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userCredentialData = userCredential.user;
      const uid = userCredentialData.uid;
      localStorage.setItem("uid", uid);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("uid");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Este é o utilizador atual: ", currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <UserContext.Provider
      value={{ createUser, user, login, logout, changePassword, updateEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
