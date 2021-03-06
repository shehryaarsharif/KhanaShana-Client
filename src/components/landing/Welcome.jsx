import React from "react";
import { Link } from "react-router-dom";
import firebase_integration from "../fire.js";
import firebase from "../fire";
import "./welcome.css";

function Welcome() {
  /* The if statement below checks whether the last time the user used the 
  discount wheel was 7 or more days ago. And then updates the database 
  variables to allow them to avail discount again. */
  try {
    if (firebase.getCurrentUsername()) {
      var todaysdate = new Date();
      firebase_integration.database
        .collection("CustomerDatabase")
        .doc(firebase_integration.auth.currentUser.uid.toString())
        .get()
        .then((snapshot) => {
          var wheeluseddate = snapshot.data().DateWheelUsed.seconds;
          var processing1 = new Date(wheeluseddate * 1000);
          var processing2 = processing1.setDate(processing1.getDate() + 7);
          var sevenlater = new Date(processing2);
          if (todaysdate >= sevenlater) {
            firebase_integration.database
              .collection("CustomerDatabase")
              .doc(firebase_integration.auth.currentUser.uid.toString())
              .update({
                WheelUsed: false,
                Discount: 0,
              });
          }
        });
    }
  } catch (error) {
    alert("An error occured. Please try again");
  }

  return (
    <div style = {{width: "97.1%"}} className="container-fluid welcome">
      <div className="row">
        <div className="col-lg-6">
          <div className="left-side">
            <div className="Title">KHANA SHANA</div>
            <div className="container Textwelc">
              Do you want to eat something delicious, special and healthy? Worry
              not! We are sincerely for your service. Welcome your arrival!
            </div>
            <div className="orderbtn">
              <Link to="/fullmenu">
                <button
                  id="GFG"
                  type="button"
                  className="button-error pure-button"
                  style={{ fontSize: "1.7rem", width: "40%", border: "none", fontFamily: "'Jost', sans-serif", marginTop: "3%", marginLeft: "15%"}}
                >
                  PLACE ORDER
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="right-side">
            <img
              id="womancookwelcome"
              className="img-fluid"
              alt="Woman Cooking"
              src="https://firebasestorage.googleapis.com/v0/b/khana-shana-2020.appspot.com/o/Mehreen%2FWomanCook.svg?alt=media&token=e0f6a486-76ee-4a06-a152-b0fe8e70748c"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
