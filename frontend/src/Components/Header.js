import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";

const Searchdiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 10px;
`;

function Header() {
  function linkTo(event){
    //TODO: Add navigation
    const name = event.target;
    if(name === 'movies-btn')
      return(
        <Link to='./Movies/3' />
      );
  }

  return (
    <>
      <header className="App-header">
        <Searchdiv>
          {" "}
          <Search />{" "}
        </Searchdiv>
        <h1 className="App-h1">The Bananalyst</h1>
        <nav className="App-nav">
          <h2>
            <div className="dropdown">
              {/* //Changed here: */}
              <button
                name="movies-btn"
                className="dropbtn"
                onClick={linkTo}
              >
                Movies
              </button>
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
      <Outlet />
    </>
  );
}

export default Header;
