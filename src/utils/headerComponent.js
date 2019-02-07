import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const headerComponent = ({ params }: any) => (
  <section id="header">
    <Link to="/">
      <img src={logo} alt="website logo" />
    </Link>
    <Link to={`/${params.musicStyle}`} className="headerLink">
      {params.musicStyle}
    </Link>
  </section>
);

export default headerComponent;
