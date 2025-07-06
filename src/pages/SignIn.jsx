import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function SignIn() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    login("/profile", email);
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
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />

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
