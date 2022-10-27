import Review  from "./Review.jsx"
import Container from '@mui/material/Container';
import styled from 'styled-components'

const StyledCon = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

function ReviewList() {

    const testData = [
        {userName: "BananaEnjoyer34",
        review_txt: "This film was NOT b a n a n a s",
        review_header: "Quit disappointed",
        upvotes: 100,
        downvotes: 10,
        date_posted: "10/10/2022",
        score: 7},

        {userName: "sussy",
        review_txt: "Eggselent film",
        review_header: "Bruh.",
        upvotes: 1,
        downvotes: 10,
        date_posted: "10/10/2022",
        score: 3},
    ];


    return (
      <StyledCon>
        {testData ? testData.map((review) => {
            return (
              <Review {...review}/>
            )
        }) : <p>No Reviews Yet</p>}
      </StyledCon>
    );
  }
  
  export default ReviewList;