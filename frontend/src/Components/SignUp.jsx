import Container from '@mui/material/Container';
import styled from 'styled-components'


const StyledCon = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

function SignUp() {

    return (
        <StyledCon>
            <form>
                <label>
                    First Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    User Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Email:
                    <input type="text" name="name" />
                </label>
                <label>
                    Password:
                    <input type="text" name="name" />
                </label>
                <label>
                    Confirm Password:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </StyledCon>
    );
  }
  
  export default SignUp;