import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";

const Searchdiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 10px;
`;

function Navbar() {
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
      <Outlet />
    </>
  );
}

export default Navbar;
