import React, {
  Component
} from "react";
import firebase from "firebase";

/* initialize firebase for application */
var firebaseConfig = {
  apiKey: "AIzaSyCoI_Hy_IJsXqDp_CtkdD1K81sqvTnzx7E",
  authDomain: "khana-shana-2020.firebaseapp.com",
  databaseURL: "https://khana-shana-2020.firebaseio.com",
  projectId: "khana-shana-2020",
  storageBucket: "khana-shana-2020.appspot.com",
  messagingSenderId: "734527584801",
  appId: "1:734527584801:web:f6cda3a79788e9af12c160",
  measurementId: "G-SC8N0VD5FC",
};

class firebase_integration extends Component {
  constructor() {
    super();
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.firestore();
    this.storage = firebase.storage();
    this.auth = firebase.auth();
  }

  /* authentication with firebase: user login function with email verification */
  login(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser.user.emailVerified === false) {
          alert("Please verify your email to continue");
          this.logout();
        }
      });
  }


  /* authentication with firebase: user logout function */
  logout() {
    return this.auth.signOut();
  }

  /* authentication with firebase: user sign up function */
  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    this.auth.currentUser.sendEmailVerification();
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }


  /* authentication with firebase: forgot password function function */
  passwordreset(email) {
    return this.auth
      .sendPasswordResetEmail(email)
      .then(function () {
        alert("Email Sent!");
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }


  /* initializing firebase before website loading */
  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  /* authentication with firebase: get username of current user to check if logged in */
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  /* authentication with firebase: get name of current user to display on navbar */
  getDisplayName() {
    var name = this.auth.currentUser.displayName;
    var nameArr = name.split(" ");
    return nameArr[0];
  }


  /* authentication with firebase: verify email of username on login */
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  /* store feedback to firestore on form submit */
  addFeedback(CustomerID_par, Date_par, Rating_par, Subject_par, Message_par) {
    this.database
      .collection("CustomerSupport")
      .add({
        CustomerID: CustomerID_par,
        Date: Date_par,
        Rating: Rating_par,
        Subject: Subject_par,
        Message: Message_par,
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }
}

export default new firebase_integration();