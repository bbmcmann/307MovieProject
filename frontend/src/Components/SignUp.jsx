import Container from '@mui/material/Container';
import { useState } from 'react';
import styled from 'styled-components'  

const StyledCon = styled(Container)`
  background: #D9D9D9;
  margin: 30px;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
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

const StyledSubmit = styled.input`
    background-color: #3E5336;
    color: white;
    border: 2px solid   #F6DA73;
    border-radius: 10px;
    height: 33px;
    font-size: 20px;
`

function SignUp() {

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <StyledCon maxWidth="md">
            <StyledForm>
                <StyledDiv>
                    <StyledLabel>
                        First Name:
                        <StyledInput 
                            type="text" 
                            name="name" 
                            onChange={(e) => {setFName(e.target.value)}}
                        />
                    </StyledLabel>
                    
                    <StyledLabel>
                        Last Name:
                        <StyledInput 
                            type="text" 
                            name="name"
                            onChange={(e) => {setLName(e.target.value)}} 
                        />
                    </StyledLabel>
                </StyledDiv>
                
                <StyledLabel>
                    User Name:
                    <StyledInput 
                        type="text" 
                        name="name" 
                        onChange={(e) => {setUserName(e.target.value)}}
                    />
                </StyledLabel>
                <StyledLabel>
                    Email:
                    <StyledInput 
                        type="text" 
                        name="name"
                        onChange={(e) => {setEmail(e.target.value)}} 
                    />
                </StyledLabel>
                <StyledDiv>
                    <StyledLabel>
                        Password:
                        <StyledInput type="text" name="name" />
                    </StyledLabel>
                    <StyledLabel>
                        Confirm Password:
                        <StyledInput type="text" name="name" />
                    </StyledLabel>
                </StyledDiv>
                <StyledSubmit type="submit" value="Submit" />
            </StyledForm>
        </StyledCon>
    );
  }
  
  export default SignUp;