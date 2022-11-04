import Review  from "./Review.jsx"
import Container from '@mui/material/Container';
import styled from 'styled-components'

const StyledCon = styled(Container)`
  display: flex;
  flex-direction: row;
  // margin: auto;
  justify-content: center;
  //padding: 10px;
  //border: 1px solid black;

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

        {userName: "Steve",
        review_txt: "Truly, quite indescribable. Perchance",
        review_header: "I have a lot to say...",
        upvotes: 9999,
        downvotes: 2,
        date_posted: "10/10/2022",
        score: 6},

        {userName: "TheBanalyst",
        review_txt: "Truly, quite indescribable. Perchance, perchance, if a chance was perchance given we could understand the chance of perchance. Truly, quite indescribable. Perchance, perchance, if a chance was perchance given we could understand the chance of perchance. Truly, quite indescribable. Perchance, perchance, if a chance was perchance given we could understand the chance of perchance. Truly, quite indescribable. Perchance, perchance, if a chance was perchance given we could understand the chance of perchance.",
        review_header: "A quick analysis",
        upvotes: 2,
        downvotes: 2,
        date_posted: "10/10/2022",
        score: 6},
    ];


    return (
      <StyledCon>
        {testData ? testData.map((review) => {
            return (
              <div key={review.userName}>
                <Review {...review}/>
              </div>
              
            )
        }) : <p>No Reviews Yet</p>}
      </StyledCon>
    );
  }
  
  export default ReviewList;