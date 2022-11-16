import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import Pun from "./Pun";

function Landing() {
  return (
    <div className="Home Page">
      <Pun />
    </div>
  );
}

export default Landing;
