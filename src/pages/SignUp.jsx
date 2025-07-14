import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    roles: ["member"],
  });

  const navigate = useNavigate();

  async function handleUserRegistration(userObject) {
    try {
      const { data } = await axios.post(
        "https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/",
        userObject,
        {
          headers: {
            "novi-education-project-id": "6528bba2-b1b4-4ab4-beb8-01354a92c74e",
            "Content-Type": "application/json",
          },
        },
      );

      navigate("/signin");
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userDetails);
    handleUserRegistration(userDetails);
  }

  return (
    <>
      <h1>Registreren</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
        atque consectetur, dolore eaque eligendi harum, numquam, placeat
        quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda,
        consequuntur deserunt doloremque ea eveniet facere fuga illum in numquam
        quia reiciendis rem sequi tenetur veniam?
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userDetails.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Heb je al een account? Je kunt je <Link to="/signin">hier</Link>{" "}
        inloggen.
      </p>
    </>
  );
}

export default SignUp;
