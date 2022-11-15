import styled from "styled-components";
import Container from "@mui/material/Container";

const StyledCon = styled(Container)`
  background: #f6da73;
  margin: 30px;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 50px;
  padding-left: 70px;
  padding-right: 70px;
`;

const StyledHead = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  margin-bottom: 5px;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  color: #3e5336;
  width: 100%;
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
  margin-bottom: 15px;
  margin-left: 5px;
  margin-right: 5px;
`;

const StyledSubmit = styled.input`
  background-color: #3e5336;
  color: white;
  border: 2px solid #f6da73;
  border-radius: 10px;
  height: 40px;
  font-size: 20px;
  width: 100%;
  margin-top: -15px;
`;

const StyledError = styled.p`
  color: red;
  font-size: 18px;
`;

export {
  StyledSubmit,
  StyledCon,
  StyledForm,
  StyledInput,
  StyledError,
  StyledHead,
  StyledText,
  StyledLabel,
};
