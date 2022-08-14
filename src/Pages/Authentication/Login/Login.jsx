import React, { useState } from "react";

function Login(props) {
  const { onLoginSubmit, goToSignup, errorMessageLogin } = props;
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    const data = { userId, password };
    onLoginSubmit(data);
    e.preventDefault();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div>
        <h3>Login</h3>
        <form className="form form-control p-4" onSubmit={handleLogin}>
          <div className="userId p-2">
            <input
              type="text"
              className="input-group form-control"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              placeholder="Username"
            />
          </div>
          <div className="password p-2">
            <input
              type="password"
              className="input-group form-control"
              placeholder="enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div>
            Dont have an account?{" "}
            <a href="#" onClick={goToSignup}>
              Sign up
            </a>
          </div>
          <div className="text-success">{errorMessageLogin}</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
