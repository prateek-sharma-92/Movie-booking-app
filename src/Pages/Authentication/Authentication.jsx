import React, { useEffect, useState } from "react";
import "../Authentication/Authentication.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { userSignIn, userSignUp } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
import { storeUserDataToLocalStorage } from "../../utils/userData";
import Roles from "./userRoles";

const Authentication = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [errorMessageLogin, setErrorMessageLogin] = useState("");
  const [errorMessageSignup, setErrorMessageSignup] = useState("");
  const navigate = useNavigate();
  const redirectToPage = (userType) => {
    if (userType === Roles.CUSTOMER) {
      navigate("/Customer");
    } else if (userType === Roles.CLIENT) {
      navigate("/Client");
    } else if (userType === Roles.ADMIN) {
      navigate("/Admin");
    }
  };

  const handleLogin = (data) => {
    userSignIn(data)
      .then((res) => {
        const { status, data } = res;
        console.log(res);
        if (status === 200) {
          storeUserDataToLocalStorage(data);
          const userType = data.userTypes;
          redirectToPage(userType);
        }
      })
      .catch((err) => {
        setErrorMessageLogin(err.message);
      });
  };

  useEffect(() => {
    //if we have a query parameter, then it should navigate to Home...code to be added

    if (localStorage.getItem("Token")) {
      redirectToPage(localStorage.getItem("user Type"));
    }
  }, []);

  const handleSignup = (data) => {
    userSignUp(data)
      .then((res) => {
        const { status } = res;
        console.log(res);
        if (status === 201) {
          setErrorMessageLogin("Signup Successful. Please Login!");
          setShowSignup(false);
        }
      })
      .catch((err) => {
        setErrorMessageSignup(err.message);
      });
  };

  const goToSignup = () => {
    setShowSignup(true);
  };
  const goToLogin = () => {
    setShowSignup(false);
  };
  return (
    <div>
      {!showSignup && (
        <Login
          onLoginSubmit={handleLogin}
          goToSignup={goToSignup}
          errorMessageLogin={errorMessageLogin}
        />
      )}
      {showSignup && (
        <Signup
          onSignupSubmit={handleSignup}
          goToLogin={goToLogin}
          errorMessageSignup={errorMessageSignup}
        />
      )}
    </div>
  );
};

export default Authentication;
