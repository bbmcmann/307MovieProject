import React, {useState} from "react";
import styled from 'styled-components';
import Container from '@mui/material/Container';
import { Box } from "@mui/material";

const PageBackground = styled.body`
background: #e55b7e;
`

const StyledBlock = styled(Container)`
padding: 100px;
justify-content: center;
background: #f6da73;
box-shadow: 5px 5px 5px gray;
position: absolute;
width: 500px;
height: 550px;
left: 175px;
top: 125px;
`

const StyledHead = styled.div`
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 48px;
line-height: 58px;
text-align: center;
`

const StyledText = styled.div`
font-family: inter;
fint-style: normal;
font-size: 30px;
padding-top: 25px;
padding-bottom: 50px;
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
        <PageBackground>
            <StyledBlock>
                <StyledHead>The Bananalyst</StyledHead>
                <StyledText>Login </StyledText>
                <Box 
                    component= "input" 
                    type="text"
                    name="username"
                    id="username"
                    sx={{width: 200, height: 25, borderRadius: 1, marginBottom: 5, overflow: "hidden"}}
                    placeholder="Username"
                    onChange={handleChange}
                />
                <br></br>
                <Box
                    component= "input"
                    type="text"
                    name="password"
                    id="password"
                    sx={{width: 200, height: 25, borderRadius: 1, marginBottom: 5, overflow: "hidden"}}
                    value={person.password}
                    placeholder="Password"
                    onChange={handleChange}
                />
                <br></br>
                <StyledButton>Login</StyledButton>
                <p>Don't have an account? Sign up here</p>
            </StyledBlock>
        </PageBackground>
    )
}

export default SignIn;