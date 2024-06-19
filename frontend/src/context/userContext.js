import { createContext, useContext, useState } from "react";

import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  onAuthStateChanged, signOut, updateProfile,
  sendPasswordResetEmail, signInWithPopup,
  GoogleAuthProvider, GithubAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useState(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const registerUser = (email, password, name) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: name,
        })
      )
      .then((res) => {
        toast.success("Usuário registrado com sucesso!");
        console.log(res);
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          toast.error("Este e-mail já está sendo utilizado por outra conta.");
        } else {
          toast.error(err.message);
        }
      })
      .finally(() => setLoading(false));
  };

  const signInUser = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        toast.success("Login realizado com sucesso!");
        console.log(res);
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          toast.error("Usuário não encontrado.");
        } else if (err.code === "auth/wrong-password") {
          toast.error("Senha incorreta.");
        } else {
          toast.error(err.message);
        }
      })
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => {
        toast.success("Login realizado com Google com sucesso!");
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const signInWithGithub = () => {
    setLoading(true);
    signInWithPopup(auth, new GithubAuthProvider())
      .then((res) => {
        toast.success("Login realizado com GitHub com sucesso!");
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("E-mail de redefinição de senha enviado com sucesso!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const contextValue = {
    user,
    loading,
    signInUser,
    registerUser,
    logoutUser,
    forgotPassword,
    signInWithGoogle,
    signInWithGithub,
  };
  
  return (
    <UserContext.Provider value={contextValue}>
      {children}
      <ToastContainer autoClose={2000}/>
    </UserContext.Provider>
  );
};