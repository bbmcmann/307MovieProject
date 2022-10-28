import React from 'react';

function GetHeader(){
    return (
      <header className="App-header">
        <form className="App-form">
          <input type="search" name="q" placeholder="Find Movie" />
        </form>
        <h1 className="App-h1">
          The Bananalyst
        </h1> 
        <nav className="App-nav">
          <h2>
            <div className = "dropdown">
              <button className="dropbtn">Movies</button>
              <div className="dropcont">
                <p>Popular Movies</p>
                <p>Suggested Movies</p>
              </div>    
            </div>
            <div className="dropdown">
              <button className="dropbtn">Review</button>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Sign In</button>
            </div>
          </h2>
        </nav>
      </header> 
    );
}

function GetPun() {
    let pun_q = ["How is a banana peel on the floor similar to music?", "Why don't bananas snore?", "Why do banana have to wear sunscreen?", "What do you call a banana who gets all the girls?", "I was walking down the street when I stood on a banana?", "What's the difference between time and bananas?"];
    let pun_a = ["Because if you don't C Sharp you'll B Flat", "Because they don't want to wake up the rest of the bunch", "Because they peel", "A banana smoothie", "Luckily, I was wearing my SlipKnot t-shirt", "Time flies like an arrow, fruit flies like a banana"];
    let randomNum = Math.floor(Math.random() * pun_q.length);

    function GetQuestion() {
        return (
            pun_q[randomNum]
        );
    }

    function GetAnswer() {
        return (
            pun_a[randomNum]
        );
    }

    return (
        <div className="App-body">
            <h2 className="App-h2">Pun-ana of the Day :</h2>
            <GetQuestion />
            <br></br>
            <br></br>
            <GetAnswer />
        </div>
    );
}

function Header() {
    return (
        <div className="Home Page">
            <GetHeader />
            <GetPun />
        </div>
    );
}

export default Header;
