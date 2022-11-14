import React, { useState } from "react";
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

function SignIn() {
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
      setError("");
      navigate("/");
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

  // need for when we link to backend / authorize
  /* 
  function submitForm() {
    // props.handleSubmit(person);
    setPerson({ username: "", password: "" });
    <input type="button" value="Submit" onClick={submitForm} />;
  } 
  */

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
