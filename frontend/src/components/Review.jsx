import Card from '@mui/material/Card';
import styled from 'styled-components'

const StyledCard = styled(Card)`
  border: 1px solid #D9D9D9;
  width: 700px;
  margin-bottom: 10px;
  box-shadow: 5px 5px 5px gray;
  text-align: left;
`

const TopBlock = styled.div`
  padding-left: 20px;
  padding-right: 50px;
  padding-top: 3px;
  padding-bottom: 2px;
  background: #D9D9D9;
  line-height: normal;
  //margin-top: 5px;
`

const TextBlock = styled.div`
  padding-left: 30px;
  padding-right: 30px;
`

const VoteDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 50px;
  padding-left: 50px;
`

function Review({
  userName,
  review_txt,
  review_header,
  upvotes,
  downvotes, 
  date_posted,
  score}) {
    

  return (
    <div>
      <StyledCard sx={{minWidth: 50}}>
        <TopBlock>
          <h1>{review_header}</h1>
          <p>Reviewed by: {userName} on {date_posted}</p>
          <p>Score: {score}</p>
        </TopBlock>
        <TextBlock>
          <p>{review_txt}</p>
        </TextBlock>
        <VoteDiv>
          <p>Upvotes: {upvotes}</p>
          <p>Downvotes: {downvotes}</p>
        </VoteDiv>
        
      </StyledCard>

    </div>)
    // <Card>
    //   <p>{userName}</p>
    // </Card>)
  
  }
  
  export default Review;