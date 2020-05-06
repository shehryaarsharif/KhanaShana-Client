import React from "react";
import "./footer.css";
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
import firebase_integration from '../fire.js'

function Footer() {
  const [restaurantDetails, setdetails] = React.useState({})

  React.useEffect(() => {
    /* Fetching restaurant details to be displayed on the footer from the backend database. */
    firebase_integration.database.collection("RestaurantDetails").doc("jOzlK1WWsNPdRrjcYLGv").onSnapshot((snapshot) => {
      setdetails(snapshot.data())
    })
  }, restaurantDetails)

  return (
    <div className="footerdiv">
      <footer className="footer">
        <div className="footer__addr">
          <Link to="/">
            <h1 className="footer__logo">
              <b>{restaurantDetails.Name}</b>
            </h1>
          </Link>
          <h2>
            <b>CONTACT</b>
          </h2>
          <address>
            {restaurantDetails.Address}
            <br />
            {restaurantDetails.ContactDetails}
            <br />
            {restaurantDetails.Email}
          </address>
        </div>

        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">
              <b>Information</b>
            </h2>

            <ul className="nav__ul">
              <HashLink smooth to="/#to-menu">
                <li>
                  <a>Menu</a>
                </li>
              </HashLink>
              <HashLink smooth to="/#to-services">
                <li>
                  <a>Our Services</a>
                </li>
              </HashLink>
              <HashLink smooth to="/#to-about">
                <li>
                  <a>About Us</a>
                </li>
              </HashLink>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">
              <b>Social Media</b>
            </h2>

            <ul className="nav__ul">
              <li>
                <a href="https://www.instagram.com/bonappetempt.pk/">Instagram</a>
              </li>

              <li>
                <a href="https://www.facebook.com/uzmascuisine/">Facebook</a>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">
              <b>HOURS</b>
            </h2>

            <ul className="nav__ul">
              <li>Monday-Friday 12PM-9PM</li>

              <li>Saturday-Sunday 12PM-12AM</li>
            </ul>
          </li>
        </ul>
        <div className="legal">
          <p>&copy; CS 360 - Khana Shana.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
