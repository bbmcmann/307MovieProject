import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border: 1px solid #d9d9d9;
  width: 800px;
  margin: auto;
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
  user_id,
  userName,
  review_txt,
  review_title,
  upvote_list,
  downvote_list,
  date_posted,
  score,
}) {
  const check_voted = () => {
    const up_index = upvote_list.indexOf(user_id);
    const down_index = downvote_list.indexOf(user_id);
    if (up_index > -1) {
      setVote("up");
      return true;
    }
    if (down_index > -1) {
      setVote("down");
      return true;
    }
    return false;
  };

  const updateVoteLists = (isUpVote) => {
    let new_downvotes;
    let new_upvotes;
    if (isUpVote) {
      new_downvotes = downvote_list.filter((id) => id !== user_id);
      new_upvotes = upvote_list.push(user_id);
    } else {
      new_upvotes = upvote_list.filter((id) => id !== user_id);
      new_downvotes = downvote_list.push(user_id);
    }
    console.log(user_id);
    console.log(new_downvotes);
    console.log(new_upvotes);
    //patch request with new lists
  };

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
    if (thisVote === "up") {
      updateVoteLists(true);
    } else {
      updateVoteLists(false);
    }
  };

  const [curUpVote, setCurUpVote] = useState(upvote_list.length);
  const [curDownVote, setCurDownVote] = useState(downvote_list.length);
  const [vote, setVote] = useState("");
  const [voted, setVoted] = useState(() => check_voted()); // might have to save this in db actually to log if they have voted on a review before

  return (
    <StyledCard sx={{ minWidth: 50 }}>
      <TopBlock>
        <h1>{review_title}</h1>
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
  );
}

export default Review;
