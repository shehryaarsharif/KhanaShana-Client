import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../navigation/footer";
import Header from "../navigation/Header";
import CheckoutContext from "../context/checkoutcontext";
import "./tystyles.css";

function ThankYou() {
  const { orderdetails } = useContext(
    CheckoutContext
  ); /* Giving ThankYou.jsx access to the orderdetails context. */
  return (
    <div id="tybackground">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <div className="ordernumbox align-baseline">
              <div id="ordnum">ORDER ID: {orderdetails.orderid}</div>
              <div id="msg">
                You will receive an Email confirmation shortly!
              </div>
              <Link to="/orderhistory">
                <button
                  type="button"
                  id="trackbtn"
                  class="btn btn-primary"
                  /* Linking the Thank You Screen with an individual user's Order History screen. */
                >
                  TRACK YOUR ORDER
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <img
              id="aunty"
              src="https://firebasestorage.googleapis.com/v0/b/khana-shana-2020.appspot.com/o/Mehreen%2Faunty.svg?alt=media&token=30c3cbb1-b363-4d53-9cf4-bd94cf3c1bff"
              className="img-fluid"
              alt="aunty"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ThankYou;
