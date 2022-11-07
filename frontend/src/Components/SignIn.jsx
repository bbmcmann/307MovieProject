import React, {useState} from "react";
import styled from 'styled-components';
import Container from '@mui/material/Container';
import { Box } from "@mui/material";

const StyledBlock = styled(Container)`
padding: 100px;
justify-content: center;
background: #f6da73;
box-shadow: 5px 5px 5px gray;
position: absolute;
width: 500px;
height: 550px;
left: 175px;
top: 100px;
`

const StyledHead = styled.div`
font-style: normal;
font-weight: 400;
font-size: 48px;
line-height: 58px;
text-align: center;
`

const StyledText = styled.div`
fint-style: normal;
font-size: 30px;
padding-top: 25px;
padding-bottom: 30px;
`
const StyledInput = styled.input`
border: 1px solid 3E5336;
    border-radius: 10px;
    height: 33px;
    padding-left: 10px;
    font-size: 20px;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 20px;
    margin-left: 5px;
    margin-right: 5px;
`

// add effects to button
const StyledButton = styled.button`
type: submit;
display: inline-block;
border: none;
font-size: 25px;
border-radius: 3px;
padding: 0.5rem 0;
width: 11rem;
height: 50px;
background-color: #3E5336;
color: white;
border: 2px solid white;
`

function SignIn() {
    const [person, setPerson] = useState({
        username: "",
        password: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "username")
            setPerson({
               username: value, password: person["password"]
            });
        else
            setPerson({
                username: person["username"], password: value
            });
    }   

    // need for when we link to backend / authorize
    function submitForm() {
        // props.handleSubmit(person);
        setPerson({username: "", password: ""});
        <input type="button" value="Submit" onClick={submitForm} />
    }

    return (

            <StyledBlock>
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
                <StyledButton>Login</StyledButton>
                <p>Don't have an account? Sign up here</p>
            </StyledBlock>

    )
}

export default SignIn;