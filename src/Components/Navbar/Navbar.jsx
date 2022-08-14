import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const { filterMoviesBySearch, showSearch } = props;
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const isUserLoggedIn = localStorage.getItem("Token");

  const logout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const login = () => {
    navigate("/Login");
  };

  const searchFn = (e) => {
    console.log(searchText);
    e.preventDefault();
    filterMoviesBySearch(searchText);
  };

  return (
    <div className="container-fluid">
      <div className="bg-dark text-danger py-2 d-flex justify-content-between display-6 align-items-center">
        <h3>Book my Tickets</h3>

        {showSearch && (
          <form className="d-flex" onSubmit={searchFn}>
            <input
              type="text"
              className="custom-input display-6"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder={"Enter movie name"}
            />
            <button type="submit" color="danger" className="px-3 searchBtn">
              Search
            </button>
          </form>
        )}

        {isUserLoggedIn ? (
          <button className="btn btn-danger m-2" onClick={logout}>
            Logout
          </button>
        ) : (
          <button type="submit" className="btn btn-danger m-2" onClick={login}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
