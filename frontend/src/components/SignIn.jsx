import React, { useState } from "react";
import styled from "styled-components";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const StyledBlock = styled(Container)`
  padding: 100px;
  margin: 75px;
  justify-content: center;
  background: #f6da73;
  box-shadow: 5px 5px 5px gray;
  width: 500px;
`;

const StyledHead = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
`;

const StyledText = styled.div`
  font-style: normal;
  font-size: 30px;
  padding-top: 25px;
  padding-bottom: 30px;
`;
const StyledInput = styled.input`
  border: 1px solid 3e5336;
  border-radius: 10px;
  height: 33px;
  padding-left: 10px;
  font-size: 20px;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 5px;
  margin-right: 5px;
`;

const StyledError = styled.p`
  color: red;
  font-size: 18px;
`;

const StyledButton = styled.button`
  type: submit;
  display: inline-block;
  border: 1px solid 3e5336;
  border-radius: 10px;
  font-size: 25px;
  padding: 0.5rem 0;
  width: 11rem;
  height: 50px;
  background-color: #3e5336;
  color: white;
`;

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
    <StyledBlock maxWidth="md">
      <form
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
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br></br>
        <StyledError>{validError}</StyledError>
        <StyledButton>Login</StyledButton>
        <p>Don't have an account? Sign up here</p>
      </form>
    </StyledBlock>
  );
}

export default SignIn;
