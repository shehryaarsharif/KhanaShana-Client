import React from "react";
import Header from "../navigation/Header";
import Welcome from "./Welcome";
import Deals from "./Deals";
import Services from "./Services";
import Menu from "./Menu";
import Aboutus from "./Aboutus";
import Carousel from "./Reviews"
import DiscountContextProvider from '../context/discount';
import { Link, animateScroll as scroll } from "react-scroll";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function LandingPage() {
  return (
    <div>
      <Header />
      <div id="">
        <Welcome />
      </div>
      {/* <DiscountContextProvider> */}
      <div id="to-deals">
        <Deals />
      </div>
      <div id="to-services">
        <Services />
      </div>
      <div id="to-menu">
        <Menu />
      </div>
      {/* </DiscountContextProvider> */}
      <div id="to-about">
        <Aboutus />
      </div>
      <div id="to-reviews">
        <Carousel />
      </div>
      {/* <Contact/> */}
      {/* <Login/> */}
    </div>
  );
}

export default LandingPage;
