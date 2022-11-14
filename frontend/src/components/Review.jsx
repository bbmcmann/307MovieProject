import Card from "@mui/material/Card";
import { Rating, IconButton } from "@mui/material";
import styled from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";

const StyledCard = styled(Card)`
  border: 1px solid #d9d9d9;
  width: 800px;
  margin-bottom: 10px;
  padding-top: 50px
  box-shadow: 5px 5px 5px gray;
  text-align: left;
`;

const TopBlock = styled.div`
  padding-left: 30px;
  padding-right: 50px;
  padding-top: 3px;
  padding-bottom: 2px;
  background: #3e5336;
  color: white;
  line-height: normal;
  //margin-top: 5px;
`;

const ScoreBlock = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const TextBlock = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 12px;
`;

const VoteBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 50px;
  padding-left: 50px;
  padding-bottom: 15px;
`;

const VoteDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const UpVote = styled(ArrowUpwardIcon)`
  padding-left: 10px;
  color: #f6da73;
  transform: scale(1.4);
`;
const DownVote = styled(ArrowDownwardIcon)`
  padding-left: 10px;
  color: #f6da73;
  transform: scale(1.4);
`;
const RevWrap = styled.div`
  padding-left: 16px;
`;

function Review({
  userName,
  review_txt,
  review_header,
  upvotes,
  downvotes,
  date_posted,
  score,
}) {
  const handleVote = (thisVote) => {
    if (!voted) {
      setVoted(true);
      setVote(thisVote);
      if (thisVote === "up") {
        setCurUpVote(curUpVote + 1);
      } else {
        setCurDownVote(curDownVote + 1);
      }
    } else if (vote !== thisVote) {
      setVote(thisVote);
      if (thisVote === "up") {
        setCurUpVote(curUpVote + 1);
        setCurDownVote(curDownVote - 1);
      } else {
        setCurDownVote(curDownVote + 1);
        setCurUpVote(curUpVote - 1);
      }
    }
  };

  const [curUpVote, setCurUpVote] = useState(upvotes);
  const [curDownVote, setCurDownVote] = useState(downvotes);
  const [voted, setVoted] = useState(false); // might have to save this in db actually to log if they have voted on a review before
  const [vote, setVote] = useState("");

  return (
    <div>
      <StyledCard sx={{ minWidth: 50 }}>
        <TopBlock>
          <h1>{review_header}</h1>
          <p>
            Reviewed by: {userName} on {date_posted}
          </p>
          <ScoreBlock>
            <p>Score: {score}</p>
            <RevWrap>
              <Rating readOnly value={score} max={7} />
            </RevWrap>
          </ScoreBlock>
        </TopBlock>
        <TextBlock>
          <p>{review_txt}</p>
        </TextBlock>
        <VoteBar>
          <VoteDiv>
            <p>Upvotes: {curUpVote}</p>
            <IconButton onClick={() => handleVote("up")}>
              <UpVote />
            </IconButton>
          </VoteDiv>
          <VoteDiv>
            <p>Downvotes: {curDownVote}</p>
            <IconButton onClick={() => handleVote("down")}>
              <DownVote />
            </IconButton>
          </VoteDiv>
        </VoteBar>
      </StyledCard>
    </div>
  );
}

export default Review;
