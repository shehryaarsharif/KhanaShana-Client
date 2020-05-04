import React from "react";
import './aboutus.css';
import firebase_integration from '../fire.js'

function Aboutus() {
  return (
    <div>
    <div className="aboutus grid-cont">
      <div className="about-text">
        <div className="aboutustitle">ABOUT US</div>
        <blockquote className="otro-blockquote">
          <p>
            Morales ha convertido la ya dúctil democracia boliviana en una
            plastilina con la que sus manos juegan a su antojo.
          </p>
        </blockquote>
        <div className="textabout">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed 
          sollicitudin quam dign issimerat mattis fringilla. Sed sollicitudin 
          quam dign issimerat mattis fringilla. Lorem ipsum dolor sit 
          amet, consectetur adipiscing elit. Sed sollicitudin quam dign 
          issimerat mattis fringilla. Sed sollicitudin quam dign issimerat
          mattis fringilla sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="uzma-img">
        <img
          id="owner1"
          className="img-fluid"
          alt="Woman Cooking"
          src = "https://firebasestorage.googleapis.com/v0/b/khana-shana-2020.appspot.com/o/Mehreen%2FImage%202-image.png?alt=media&token=da361037-4b6a-438f-ad36-08912beb668b"
        /> 
        </div>
        <div className="sign-img">
        <img
          id="owner2"
          className="img-fluid"
          alt="Woman Cooking"
          src = "https://firebasestorage.googleapis.com/v0/b/khana-shana-2020.appspot.com/o/Mehreen%2Fsign.jpg?alt=media&token=f1c04b2e-47b2-4e58-a645-c02517d1e86e"
        /> 
        </div>
      </div>
      <div className="about-img">
        <img
          id="womancook1"
          className="img-fluid"
          alt="Woman Cooking"
          src = "https://firebasestorage.googleapis.com/v0/b/khana-shana-2020.appspot.com/o/Mehreen%2Fauntytest.svg?alt=media&token=f323dfc0-3ae4-4ff4-8766-320a477dbb3f"
        />
      </div>
    </div>
    </div>

  );
}

export default Aboutus;
