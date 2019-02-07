import React from "react";
import logo from '../assets/img/vinyle.png';

export default ({ img, alt }) => (
  <section className="vinyleLogo">
    <img src={img} alt={alt} className="logo"/>
    <img src={logo} alt="vinyle" className="vinyle"/>
  </section>
);
