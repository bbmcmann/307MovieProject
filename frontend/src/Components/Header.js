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

const StyledLink = styled(Link)`
  a:active {
    text-decoration: none;
  }
  ,
  a:hover {
    text-color: #ffffff;
  }
  ,
  a:visited {
    text-decoration: none;
  }
  ,
  a:link {
    text-decoration: none;
  }
  color: #000000;
`;

function Header() {
  return (
    <>
      <header className="App-header">
        <Searchdiv>
          {" "}
          <Search />{" "}
        </Searchdiv>
        <h1 className="App-h1">
          <StyledLink to="/">The Bananalyst</StyledLink>
        </h1>
        <nav className="App-nav">
          <h2>
            <div className="dropdown">
              {/* //Changed here: */}
              <button name="movies-btn" className="dropbtn">
                <StyledLink to="movie"> Movies </StyledLink>
              </button>
              <div className="dropcont">
                {/* TODO: Finalize navigation on all buttons. Currently on temporary  */}
                <p>Popular Movies</p>
                <p>
                  <StyledLink to="movie/3">Suggested Movies</StyledLink>
                </p>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">
                <StyledLink to="review/">Review</StyledLink>
              </button>
            </div>
            <div className="dropdown">
              <button className="dropbtn">
                <StyledLink to="profile">Sign In</StyledLink>
              </button>
            </div>
          </h2>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
