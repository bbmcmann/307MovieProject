import Container from "@mui/material/Container";
import styled from "styled-components";
import Review from "./Review.jsx";
import { Cookies } from "react-cookie";

const StyledCon = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function ReviewList({ reviews }) {
  const cookies = new Cookies();

  return (
    <StyledCon>
      {reviews ? (
        reviews
          .slice(0)
          .reverse()
          .map((review) => {
            return (
              <div key={review.userName}>
                <Review logged_in_user={cookies.get("userId")} {...review} />
              </div>
            );
          })
      ) : (
        <p>No Reviews Yet</p>
      )}
    </StyledCon>
  );
}

export default ReviewList;
