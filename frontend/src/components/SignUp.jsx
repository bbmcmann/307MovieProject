import axios from "axios";
import { useState } from "react";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  StyledCon,
  StyledError,
  StyledForm,
  StyledHead,
  StyledInput,
  StyledLabel,
  StyledSubmit,
  StyledText,
} from "./StyledComponents.jsx";

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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

function SignUp() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [validError, setError] = useState("");

  // const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    //very basic validation
    if (fName.length <= 0) {
      setError("Please enter a first name");
    } else if (lName.length <= 0) {
      setError("Please enter a last name");
    } else if (userName.length < 4) {
      setError("Username must be at least 4 characters");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
    } else if (pass.length < 6) {
      setError("Password must be at least 6 characters");
    } else if (pass !== confirmPass) {
      setError("Passwords must match");
    } else {
      try {
        // api call to authenticate user
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/signup`, {
          username: userName,
          password: pass,
          first_name: fName,
          last_name: lName,
          email: email,
        });
        navigate(-1);
      } catch (error) {
        setError("Something went wrong. Try again");
      }
    }
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
        <StyledText>Sign Up</StyledText>
        <StyledDiv>
          <StyledLabel>
            First Name:
            <StyledInput
              type="text"
              name="name"
              placeholder="First"
              onChange={(e) => {
                setFName(e.target.value);
              }}
            />
          </StyledLabel>
          <StyledLabel>
            Last Name:
            <StyledInput
              type="text"
              name="name"
              placeholder="Last"
              onChange={(e) => {
                setLName(e.target.value);
              }}
            />
          </StyledLabel>
        </StyledDiv>
        <StyledLabel>
          User Name:
          <StyledInput
            type="text"
            name="name"
            placeholder="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </StyledLabel>
        <StyledLabel>
          Email:
          <StyledInput
            type="text"
            name="name"
            placeholder="example@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </StyledLabel>
        <StyledDiv>
          <StyledLabel>
            Password:
            <StyledInput
              type="password"
              name="name"
              placeholder="password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </StyledLabel>
          <StyledLabel>
            Confirm Password:
            <StyledInput
              type="password"
              name="name"
              placeholder="password"
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
          </StyledLabel>
        </StyledDiv>
        <StyledError>{validError}</StyledError>
        <StyledSubmit
          type="submit"
          value="Submit"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        />
      </StyledForm>
    </StyledCon>
  );
}

export default SignUp;
