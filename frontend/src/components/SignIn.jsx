import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  StyledCon,
  StyledError,
  StyledForm,
  StyledHead,
  StyledInput,
  StyledSubmit,
  StyledText,
} from "./StyledComponents.jsx";
import getBackendUrl from "./util.jsx";

const StyledLink = styled(Link)`
  a:active {
    text-decoration: none;
  }
  ,
  a:hover {
    text-color: #ffffff;
  }
  ,
  a:visited {
    text-decoration: none;
  }
  ,
  a:link {
    text-decoration: none;
  }
  color: #000000;
`;

function SignIn(props) {
  const navigate = useNavigate();
  const [validError, setError] = useState("");
  const [person, setPerson] = useState({
    username: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(["token"]);

  const handleSubmit = async () => {
    if (person.username.length <= 0 && person.password.length <= 0) {
      setError("Please enter a username and password");
    } else if (person.username.length <= 0) {
      setError("Please enter a username");
    } else if (person.password.length <= 0) {
      setError("Please enter a password");
    } else {
      try {
        // api call to create user
        const data = await axios.post(`${getBackendUrl()}auth/login`, {
          username: person.username,
          password: person.password,
        });
        setCookie("token", data.data.token, {
          maxAge: 86400,
          path: "/",
        });
        setCookie("userId", data.data.id, {
          maxAge: 86400,
          path: "/",
        });
        setCookie("username", person.username, {
          maxAge: 86400,
          path: "/",
        });
        console.log(cookies);
        props.setUserId(data.data.id);
        navigate(-1);
      } catch (error) {
        setError("Invalid credentials");
      }
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

  const navigateSignUp = () => {
    navigate("/signup");
  };

  return (
    <StyledCon maxWidth="md">
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <StyledHead>
          <StyledLink to="/">The Bananalyst</StyledLink>
        </StyledHead>
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
        <StyledSubmit
          type="button"
          value="Create an Account"
          onClick={navigateSignUp}
        />
      </StyledForm>
    </StyledCon>
  );
}

export default SignIn;
