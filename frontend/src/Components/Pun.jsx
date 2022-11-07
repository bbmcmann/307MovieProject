import React from "react";

function Pun() {
  let pun_q = [
    "How is a banana peel on the floor similar to music?",
    "Why don't bananas snore?",
    "Why do banana have to wear sunscreen?",
    "What do you call a banana who gets all the girls?",
    "I was walking down the street when I stood on a banana?",
    "What's the difference between time and bananas?",
  ];
  let pun_a = [
    "Because if you don't C Sharp you'll B Flat",
    "Because they don't want to wake up the rest of the bunch",
    "Because they peel",
    "A banana smoothie",
    "Luckily, I was wearing my SlipKnot t-shirt",
    "Time flies like an arrow, fruit flies like a banana",
  ];
  let randomNum = Math.floor(Math.random() * pun_q.length);

  return (
    <div className="App-body">
      <h2 className="App-h2">&#127820; Pun-ana of the Day : &#127820;</h2>
      &#x1F34C;{pun_q[randomNum]}
      <br></br>
      <br></br>
      &#x1F34C;{pun_a[randomNum]}
    </div>
  );
}

export default Pun;
