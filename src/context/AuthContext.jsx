import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuth: false,
    user: null,
    status: "pending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Context wordt gerefresht!");
    const token = localStorage.getItem("token");

    if (token) {
      const { userId } = jwtDecode(token);

      fetchUserDetails(userId);
    } else {
      setAuthState((previous) => ({
        ...previous,
        isAuth: false,
        user: null,
        status: "done",
      }));
    }
  }, []);

  async function fetchUserDetails(id) {
    const controller = new AbortController();

    const token = localStorage.getItem("token");
    if (!token || !isTokenStillValid(token)) {
      console.log("Gebruiker niet ingelogd of token verlopen");
      return;
    }

    console.log(id);

    try {
      const response = await axios.get(
        `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "novi-education-project-id": "6528bba2-b1b4-4ab4-beb8-01354a92c74e",
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        },
      );

      console.log(response.data);

      setAuthState((previous) => ({
        ...previous,
        isAuth: true,
        user: response.data,
        status: "done",
      }));
    } catch (e) {
      console.error(e);
    }
  }

  const isTokenStillValid = (token) => {
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000;
  };

  async function login(data) {
    const { token } = data;

    localStorage.setItem("token", token);

    const decodedToken = jwtDecode(token);

    await fetchUserDetails(decodedToken.userId);

    navigate("/profile");
  }

  function logout(page) {
    setAuthState((previous) => ({
      ...previous,
      isAuth: false,
      user: null,
    }));

    localStorage.removeItem("token");

    if (page) {
      navigate(page);
    }
    console.log("Gebruiker is uitgelogd");
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        login,
        logout,
      }}
    >
      {authState.status === "done" ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
