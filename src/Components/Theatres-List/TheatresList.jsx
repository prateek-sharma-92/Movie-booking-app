import React, { useState, useEffect } from "react";
import { getAllTheatres, updateTheatre } from "../../api/Theatres";
import MaterialTable from "@material-table/core";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

function TheatresList() {
  const [theatresList, setTheatreList] = useState();
  const [selectedTheatre, setSelectedTheatre] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllTheatres()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          setTheatreList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteTheatre = (rowData) => {
    const id = rowData._id;
    let index = -1;

    theatresList.forEach((theatre, i) => {
      if (theatre._id === id) {
        index = i;
      }
    });

    const updatedTheatreList = [...theatresList];
    updatedTheatreList.splice(index, 1);
    setTheatreList(updatedTheatreList);
  };

  const editTheatre = (rowData) => {
    console.log(rowData);
    setSelectedTheatre(rowData);
    setShowModal(true);
  };

  const handleTheatreUpdate = (e) => {
    const tempTheatreDetails = { ...selectedTheatre };
    if (e.target.name === "name") {
      tempTheatreDetails.name = e.target.value;
    } else if (e.target.name === "city") {
      tempTheatreDetails.city = e.target.value;
    } else if (e.target.name === "pinCode") {
      tempTheatreDetails.pinCode = e.target.value;
    } else if (e.target.name === "description") {
      tempTheatreDetails.description = e.target.value;
    }

    setSelectedTheatre(tempTheatreDetails);
  };

  const fetchTheatreList = () => {
    getAllTheatres()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          setTheatreList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTheatreUpdateSubmit = (e) => {
    const id = selectedTheatre._id;
    // Api call to save the updated theatre data
    // send the id and updated theatre data
    // on saving successfully, close the modal and re-render the theatre list
    //empty the selected Theatre
    //show the error
    try {
      updateTheatre(id, selectedTheatre).then((res) => {
        const { message, status } = res;
        if (status === 200) {
          setShowModal(false);
          fetchTheatreList();
        } else {
          setErrorMessage(message);
        }
      });
    } catch (err) {
      setErrorMessage(err.message);
    }

    e.preventDefault();
  };

  return (
    <div className="container">
      <MaterialTable
        columns={[
          { title: "Name", field: "name" },
          { title: "Theatre Id", field: "_id" },
          { title: "Description ", field: "description" },
          { title: "Location", field: "city" },
          { title: "Pin Code", field: "pinCode" },
        ]}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit Theatre",
            onClick: (event, rowData) => {
              editTheatre(rowData);
            },
          },
          {
            icon: Delete,
            tooltip: "Delete Theatre",
            onClick: (event, rowData) => {
              deleteTheatre(rowData);
            },
          },
        ]}
        options={{ actionsColumnIndex: -1, sorting: true }}
        data={theatresList}
        title="Theatres List"
      />

      {showModal && (
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Theatre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex  align-items-center m-2">
              <label className="col-2">Theatre Id: </label>
              <h6>{selectedTheatre._id}</h6>
            </div>
            <hr />
            <form onSubmit={handleTheatreUpdateSubmit}>
              <div className="d-flex justify-content-center align-items-center m-1">
                <label className="col-2">Theatre Name: </label>
                <input
                  className="form-control"
                  name="name"
                  onChange={handleTheatreUpdate}
                  value={selectedTheatre.name}
                ></input>
              </div>
              <div className="d-flex justify-content-center align-items-center m-1">
                <label className="col-2">Theatre City: </label>
                <input
                  className="form-control"
                  value={selectedTheatre.city}
                  name="city"
                  onChange={handleTheatreUpdate}
                ></input>
              </div>
              <div className="d-flex justify-content-center align-items-center m-1">
                <label className="col-2">Theatre Pin Code: </label>
                <input
                  className="form-control"
                  value={selectedTheatre.pinCode}
                  name="pinCode"
                  onChange={handleTheatreUpdate}
                ></input>
              </div>
              <div className="d-flex justify-content-center align-items-center m-1">
                <label className="col-2">Theatre Description: </label>
                <textarea
                  className="form-control"
                  value={selectedTheatre.description}
                  name="description"
                  onChange={handleTheatreUpdate}
                ></textarea>
              </div>

              <button
                className="btn btn-secondary mx-2"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
              <button className="btn btn-primary mx-2" type="submit">
                Save Changes
              </button>
            </form>
          </Modal.Body>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </Modal>
      )}
    </div>
  );
}

export default TheatresList;
