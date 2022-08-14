import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TheatresList from "../../Components/Theatres-List/TheatresList";

function Client() {
  return (
    <div>
      <Navbar />
      <h2 className="container text-dark bg-light">
        Welcome {`${localStorage.getItem("Name")}`}
      </h2>

      <TheatresList />
    </div>
  );
}

export default Client;
