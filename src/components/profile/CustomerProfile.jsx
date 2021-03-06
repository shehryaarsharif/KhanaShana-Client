import React from "react";
import { Link } from "react-router-dom";
import firebase_integration from "../fire.js";
import Header from "../navigation/Header";
import "./profilestyles.css";

function CustomerProfile() {
  /* states for form input values */
  const [editname, seteditname] = React.useState(false);
  const [editemail, seteditemail] = React.useState(false);
  const [editnumber, seteditnumber] = React.useState(false);
  const [editpassword, seteditpassword] = React.useState(false);
  const [editgender, seteditgender] = React.useState(false);
  /* states for reading data from database and making changes in the database */
  const [ID, setID] = React.useState();
  const [name, setname] = React.useState();
  const [email, setemail] = React.useState();
  const [number, setnumber] = React.useState();
  const [dob, setdob] = React.useState();
  const [password, setpassword] = React.useState();
  const [gender, setgender] = React.useState();

  /* reading customer profile data from database */
  try {
    React.useEffect(() => {
      firebase_integration.database
        .collection("CustomerDatabase")
        .where(
          "CustomerID",
          "==",
          firebase_integration.auth.currentUser.uid.toString()
        )
        .onSnapshot((snapshot) => {
          var customerdata = {};
          snapshot.docs.forEach((doc) => {
            customerdata = doc.data();
          });
          setID(customerdata.CustomerID);
          setname(customerdata.Name);
          setemail(customerdata.Email);
          setnumber(customerdata.ContactNo);
          setdob(
            customerdata.DOB.toDate().getDate() +
              "-" +
              customerdata.DOB.toDate().getMonth() +
              1 +
              "-" +
              customerdata.DOB.toDate().getFullYear()
          );
          setpassword(customerdata.Password);
          setgender(customerdata.Gender);
        });
    }, [ID]);
  } catch (error) {
    alert("An error occured. Please try again");
  }

  /* functions for updating the database */
  async function updatename(value) {
    firebase_integration.auth.currentUser
      .updateProfile({
        displayName: value,
      })
      .then(function () {
        firebase_integration.database
          .collection("CustomerDatabase")
          .doc(firebase_integration.auth.currentUser.uid.toString())
          .update({
            Name: value,
          })
          .catch(function (error) {
            alert("An error occured. Please try again");
          });
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }
  async function updateemail(value) {
    firebase_integration.auth.currentUser
      .updateEmail(value)
      .then(function () {
        firebase_integration.database
          .collection("CustomerDatabase")
          .doc(firebase_integration.auth.currentUser.uid.toString())
          .update({
            Email: value,
          });
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }
  async function updatenumber(value) {
    firebase_integration.database
      .collection("CustomerDatabase")
      .doc(firebase_integration.auth.currentUser.uid.toString())
      .update({
        ContactNo: value,
      }).catch(function (error) {
        alert("An error occured. Please try again");
      });
  }
  async function updatepassword(value) {
    firebase_integration.auth.currentUser
      .updatePassword(value)
      .then(function () {
        alert("Your password has been updated");
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }
  async function updategender(value) {
    firebase_integration.database
      .collection("CustomerDatabase")
      .doc(firebase_integration.auth.currentUser.uid.toString())
      .update({
        Gender: value,
      }).catch(function (error) {
        alert("An error occured. Please try again");
      });
  }

  /* form displays input field and edit buttons */
  return (
    <div class="profileback">
      <Header />
      <div class="hehe container-fluid">
        <div class="row my-2">
          <div class="col-lg-7 order-lg-2">
            <ul style={{ marginTop: "10%" }} class="nav nav-tabs">
              <li class="nav-item">
                <a
                  style={{ color: "#955F61" }}
                  href=""
                  data-target="#profile"
                  data-toggle="tab"
                  class="nav-link active"
                >
                  Profile
                </a>
              </li>
              <Link to="./orderhistory">
                <li class="nav-item">
                  <a style={{ color: "white" }} class="nav-link">
                    Order History
                  </a>
                </li>
              </Link>
              <Link to="./feedback">
                <li class="nav-item">
                  <a style={{ color: "white" }} class="nav-link">
                    Feedback
                  </a>
                </li>
              </Link>
            </ul>

            <div class="tab-content py-8">
              <div id="edit">
                <form role="form">
                  <div class="form-group row">
                    <label class="col-lg-2 col-form-label form-control-label">
                      Full name
                    </label>
                    {/* if edit state is true, render an editable input field, else render a read only field*/}
                    {editname === false ? (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          value={name}
                          readonly
                        />
                      </div>
                    ) : (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          type="text"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                        />
                      </div>
                    )}
                    {/* if edit state is true, render a save button, else render edit pencil */}
                    {editname === false ? (
                      <div class="col-lg-1">
                        <a class="pencil" onClick={() => seteditname(true)}>
                          <ion-icon
                            style={{ color: "#955F61" }}
                            size="large"
                            name="create-outline"
                          ></ion-icon>
                        </a>
                      </div>
                    ) : (
                      <div className="col-lg-1 input-group-append">
                        <button
                          className="btn"
                          type="button"
                          id="button-addon2"
                          onClick={() => {
                            seteditname(false);
                            updatename(name);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-2 col-form-label form-control-label">
                      Email
                    </label>
                    {editemail === false ? (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="email"
                          placeholder="Enter Email"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          readonly
                        />
                      </div>
                    ) : (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="email"
                          placeholder="Enter Email"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                    )}
                    {editemail === false ? (
                      <div class="col-lg-1">
                        <a class="pencil" onClick={() => seteditemail(true)}>
                          <ion-icon
                            style={{ color: "#955F61" }}
                            size="large"
                            name="create-outline"
                          ></ion-icon>
                        </a>
                      </div>
                    ) : (
                      <div className="col-lg-1 input-group-append">
                        <button
                          className="btn"
                          type="button"
                          id="button-addon2"
                          onClick={() => {
                            seteditemail(false);
                            updateemail(email);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-2 col-form-label form-control-label">
                      Number
                    </label>
                    {editnumber === false ? (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Enter Phone Number"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={number}
                          readonly
                        />
                      </div>
                    ) : (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Enter Phone Number"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={number}
                          onChange={(e) => setnumber(e.target.value)}
                        />
                      </div>
                    )}
                    {editnumber === false ? (
                      <div class="col-lg-1">
                        <a class="pencil" onClick={() => seteditnumber(true)}>
                          <ion-icon
                            style={{ color: "#955F61" }}
                            size="large"
                            name="create-outline"
                          ></ion-icon>
                        </a>
                      </div>
                    ) : (
                      <div className="col-lg-1 input-group-append">
                        <button
                          className="btn"
                          type="button"
                          id="button-addon2"
                          onClick={() => {
                            seteditnumber(false);
                            updatenumber(number);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-2 col-form-label form-control-label">
                      Date Of Birth
                    </label>
                    <div class="col-lg-8">
                      <input
                        class="form-control"
                        type="text"
                        value={dob}
                        readonly
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-2 col-form-label form-control-label">
                      Gender
                    </label>
                    {editgender === false ? (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Enter Gender"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={gender}
                          readonly
                        />
                      </div>
                    ) : (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Enter Gender"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={gender}
                          onChange={(e) => setgender(e.target.value)}
                        />
                      </div>
                    )}
                    {editgender === false ? (
                      <div class="col-lg-1">
                        <a class="pencil" onClick={() => seteditgender(true)}>
                          <ion-icon
                            style={{ color: "#955F61" }}
                            size="large"
                            name="create-outline"
                          ></ion-icon>
                        </a>
                      </div>
                    ) : (
                      <div className="col-lg-1 input-group-append">
                        <button
                          className="btn"
                          type="button"
                          id="button-addon2"
                          onClick={() => {
                            seteditgender(false);
                            updategender(gender);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-2 col-form-label form-control-label">
                      Password
                    </label>
                    {editpassword === false ? (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="password"
                          placeholder="Enter New Password"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={password}
                          readonly
                        />
                      </div>
                    ) : (
                      <div class="col-lg-8">
                        <input
                          class="form-control"
                          type="password"
                          placeholder="Enter New Password"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                        />
                      </div>
                    )}
                    {editpassword === false ? (
                      <div class="col-lg-1">
                        <a class="pencil" onClick={() => seteditpassword(true)}>
                          <ion-icon
                            style={{ color: "#955F61" }}
                            size="large"
                            name="create-outline"
                          ></ion-icon>
                        </a>
                      </div>
                    ) : (
                      <div className="col-lg-1 input-group-append">
                        <button
                          className="btn"
                          type="button"
                          id="button-addon2"
                          onClick={() => {
                            seteditpassword(false);
                            updatepassword(password);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-3 order-lg-1 text-center">
            <img
              id="profilepic"
              className="mx-auto img-fluid img-circle d-block"
              alt="ProfilePicture"
              src="https://firebasestorage.googleapis.com/v0/b/khana-shana-2020.appspot.com/o/CustomerProfile%2Fprofilepic.svg?alt=media&token=ee543aa0-18be-4d30-a73c-1c53d838ac7c"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CustomerProfile;
