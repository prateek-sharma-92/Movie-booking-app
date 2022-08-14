import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Roles from "../userRoles";

const Signup = (props) => {
  const { onSignupSubmit, goToLogin, errorMessageSignup } = props;
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [userType, setUserType] = useState(Roles.CUSTOMER);
  const handleSignup = (e) => {
    const data = { userId, password, name, email, userType };
    onSignupSubmit(data);
    e.preventDefault();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div>
        <h3>Signup</h3>
        <form className="form form-control p-4" onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              className="form-control p-2 m-2 "
              placeholder="Enter UserId"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              className="form-control p-2 m-2"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              className="form-control p-2 m-2"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="email"
              className="form-control p-2 m-2"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="col d-flex justify-content-center align-items-center">
            <label>User Type:</label>
            <Dropdown>
              <DropdownButton
                variant="light"
                title={userType}
                onSelect={(value) => {
                  setUserType(value);
                }}
              >
                <Dropdown.Item eventKey={Roles.CUSTOMER}>
                  CUSTOMER
                </Dropdown.Item>
                <Dropdown.Item eventKey={Roles.CLIENT}>CLIENT</Dropdown.Item>
                <Dropdown.Item eventKey={Roles.ADMIN}>ADMIN</Dropdown.Item>
              </DropdownButton>
            </Dropdown>
          </div>
          <button type="submit" className="btn btn-primary m-2">
            Signup
          </button>
          <div>
            Already have an account?{" "}
            <a href="#" onClick={goToLogin}>
              Login
            </a>
          </div>
          <div className="text-danger">{errorMessageSignup}</div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
