import React from "react";
import { Link } from "react-router-dom";
import "../styles/endProject.css";

const BluesIsForEveryOne = () => (
  <div className="Blues4all">
    <div className="Blues4allContainer">
      <p className="blues4allTitle">Blues Is For Every One</p>
      <div className="subtitleBluesContainer">
        <p className="blues4allSubtitle">Discover more music styles</p>
        <Link className="endButton" to="/">
          {" "}
          Let's Go{" "}
        </Link>
      </div>
    </div>
  </div>
);

export default BluesIsForEveryOne;
