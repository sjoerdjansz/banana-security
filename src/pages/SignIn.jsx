import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function SignIn() {
  const { login } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  async function handleUserLogin(userObject) {
    try {
      const { data } = await axios.post(
        "https://novi-backend-api-wgsgz.ondigitalocean.app/api/login",
        userObject,
        {
          headers: {
            "novi-education-project-id": "6528bba2-b1b4-4ab4-beb8-01354a92c74e",
            "Content-Type": "application/json",
          },
        },
      );

      console.log(data);
      login(data);
    } catch (e) {
      console.error(e);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginDetails);
    handleUserLogin(loginDetails);
  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum
        debitis dolor dolore fuga id molestias qui quo unde?
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={loginDetails.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={loginDetails.password}
        />

        <button type="submit">Inloggen</button>
      </form>

      <p>
        Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan
        eerst.
      </p>
    </>
  );
}

export default SignIn;
