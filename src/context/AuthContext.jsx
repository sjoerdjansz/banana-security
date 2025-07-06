import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [isAuth, toggleIsAuth] = useState({
    username: "",
    email: "",
    isAuth: false,
  });
  const navigate = useNavigate();

  function login(page, email) {
    toggleIsAuth((previous) => ({
      ...previous,
      isAuth: true,
      email: email,
    }));
    if (page) {
      navigate(page);
    }
    console.log("Gebruiker is ingelogd");
  }

  function logout(page) {
    toggleIsAuth((previous) => ({
      ...previous,
      isAuth: false,
      email: "",
    }));
    if (page) {
      navigate(page);
    }
    console.log("Gebruiker is uitgelogd");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        toggleIsAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
