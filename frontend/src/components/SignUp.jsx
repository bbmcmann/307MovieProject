import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  StyledSubmit,
  StyledCon,
  StyledForm,
  StyledInput,
  StyledError,
  StyledHead,
  StyledText,
  StyledLabel,
} from "./StyledComponents.jsx";

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

  const navigate = useNavigate();

  const handleSubmit = () => {
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
      setError("");
      navigate("/");
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
        <StyledHead>The Bananalyst</StyledHead>
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
