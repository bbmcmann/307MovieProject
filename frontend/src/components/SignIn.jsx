import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  StyledSubmit,
  StyledCon,
  StyledForm,
  StyledInput,
  StyledError,
  StyledHead,
  StyledText,
} from "./StyledComponents.jsx";

function SignIn(props) {
  const navigate = useNavigate();
  const [validError, setError] = useState("");
  const [person, setPerson] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    if (person.username.length <= 0 && person.password.length <= 0) {
      setError("Please enter a username and password");
    } else if (person.username.length <= 0) {
      setError("Please enter a username");
    } else if (person.password.length <= 0) {
      setError("Please enter a password");
    } else {
      submitForm();
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "username") {
      setPerson({
        username: value,
        password: person["password"],
      });
    } else {
      setPerson({
        username: person["username"],
        password: value,
      });
    }
  }

  function submitForm() {
    makeLoginCall(person).then((response) => {
      if (response && response.status === 200) {
        const token = response.data;
        setPerson({ username: "", password: "" });
        props.setToken(token);
        navigate("/");
      } else {
        setError("Invalid Login Credentials");
        navigate("");
      }
    });
  }

  async function makeLoginCall(user) {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        user
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <StyledCon maxWidth="md">
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <StyledHead>The Bananalyst</StyledHead>
        <StyledText>Login </StyledText>
        <StyledInput
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <br></br>
        <StyledInput
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br></br>
        <StyledError>{validError}</StyledError>
        <StyledSubmit type="submit" value="Login" />
        <br></br>
        <a href="./signup">Don't have an account? Sign up here</a>
      </StyledForm>
    </StyledCon>
  );
}

export default SignIn;
