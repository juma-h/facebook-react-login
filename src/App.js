import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";

import "./App.css";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // const responseFacebook = (response) => {

  //   console.log("response from Facebook", response);
  //   if (response.accessToken) {
  //     setData(response);
  //     setPicture(response.picture.data.url);
  //     setAccessToken(response.accessToken);
  //     setLogin(true);
  //   } else {
  //     // Handle the case where no access token is received
  //     alert("No access token received");
  //   }
  // };

  const responseFacebook = (response) => {
    console.log(response);
    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");
      setLogin(false);
      return false;
    }
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
      setAccessToken(response.accessToken);
    } else {
      setLogin(false);
    }
  };

  return (
    <div className="container">
      <div style={{ width: "600px" }}>
        <div>
          {!login && (
            <FacebookLogin
              appId="your_app_id_from facebook_developers"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile"
              callback={responseFacebook}
              icon="fa-facebook"
            />
          )}
          {login && <img alt="" src={picture} roundedCircle />}
        </div>
        {login && (
          <div>
            <h2>{data.name}</h2>
            <p>{data.email}</p>
            <p>Access Token: {accessToken}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
