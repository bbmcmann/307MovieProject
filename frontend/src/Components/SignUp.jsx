import Container from '@mui/material/Container';
import { useState } from 'react';
import styled from 'styled-components'  
import {useNavigate} from 'react-router-dom';

const StyledCon = styled(Container)`
    background: #F6DA73;
    margin: 30px;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
`

const StyledBanana = styled.p`
    font-size: 48px;
    margin-bottom: 5px;
`

const StyledTitle = styled.p`
    font-size: 30px;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 50px;
    padding-left: 70px;
    padding-right: 70px;
`

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 25px;
    color: #3E5336;
    width: 100%;
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

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
`

const StyledError = styled.p`
    color: red;
    font-size: 18px;
`

const StyledSubmit = styled.input`
    background-color: #3E5336;
    color: white;
    border: 2px solid   #F6DA73;
    border-radius: 10px;
    height: 40px;
    font-size: 20px;
`

function SignUp() {

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [validError, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        //very basic validation
        if(fName.length <= 0){
            setError("Please enter a first name")
        }
        else if(lName.length <= 0){
            setError("Please enter a last name")
        }
        else if(userName.length < 4){
            setError("Username must be at least 4 characters")
        }
        else if(!/^\S+@\S+\.\S+$/.test(email)){
            setError("Please enter a valid email address")
        }
        else if(pass.length < 6){
            setError("Password must be at least 6 characters")
        }
        else if(pass !== confirmPass){
            setError("Passwords must match")
        }
        else{
            setError('')
            navigate('/')
        }
    }

    return (
        <StyledCon maxWidth="md">
            <StyledForm
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit();
            }}>
                <StyledBanana>The Banalyst</StyledBanana>
                <StyledTitle>Sign Up</StyledTitle>
                <StyledDiv>
                    <StyledLabel>
                        First Name:
                        <StyledInput 
                            type="text" 
                            name="name" 
                            placeholder="First"
                            onChange={(e) => {setFName(e.target.value)}}
                        />
                    </StyledLabel>
                    <StyledLabel>
                        Last Name:
                        <StyledInput 
                            type="text" 
                            name="name"
                            placeholder="Last"
                            onChange={(e) => {setLName(e.target.value)}} 
                        />
                    </StyledLabel>
                </StyledDiv>
                <StyledLabel>
                    User Name:
                    <StyledInput 
                        type="text" 
                        name="name"
                        placeholder="username" 
                        onChange={(e) => {setUserName(e.target.value)}}
                    />
                </StyledLabel>
                <StyledLabel>
                    Email:
                    <StyledInput 
                        type="text" 
                        name="name"
                        placeholder="example@example.com"
                        onChange={(e) => {setEmail(e.target.value)}} 
                    />
                </StyledLabel>
                <StyledDiv>
                    <StyledLabel>
                        Password:
                        <StyledInput 
                            type="password" 
                            name="name" 
                            placeholder="password"
                            onChange={(e) => {setPass(e.target.value)}}
                        />
                    </StyledLabel>
                    <StyledLabel>
                        Confirm Password:
                        <StyledInput 
                            type="password" 
                            name="name" 
                            placeholder="password"
                            onChange={(e) => {setConfirmPass(e.target.value)}}
                        />
                    </StyledLabel>
                </StyledDiv>
                <StyledError>{validError}</StyledError>
                <StyledSubmit 
                    type="submit" 
                    value="Submit" 
                    onSubmit={(e) => {handleSubmit(e)}}
                />
            </StyledForm>
        </StyledCon>
    );
  }
  
  export default SignUp;