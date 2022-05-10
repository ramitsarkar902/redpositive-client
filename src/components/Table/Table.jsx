import React, { useState, useEffect, useRef } from "react";
import "./table.scss";
import axios from "axios";
import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom";
import { RotateCircleLoading } from "react-loadingg";
import { Link } from "react-router-dom";
function Table({ setPopup, setParticularUser }) {
  const history = createBrowserHistory({ forceRefresh: true });
  const fieldName = useRef();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://redpositive-backend.herokuapp.com/api/users/";
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await axios.get(`${baseUrl}`);
      setData(result.data);
      setLoading(false);
    };
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  const getParticularUser = async (id) => {
    console.log(id);
    history.push(`/${id}`);
  };

  const deleteUser = async (id) => {
    console.log(id);
    await axios.delete(`${baseUrl}${id}`);
    console.log("deleted");
    history.push("/");
  };

  const handleSort = async () => {
    const result = await axios.get(`${baseUrl}sort/${fieldName.current.value}`);
    console.log(result.data);
    setData(result.data);
  };
  return (
    <div className="table">
      {loading === true ? (
        <>
          <RotateCircleLoading />
        </>
      ) : (
        <>
          <div className="table__wrapper">
            <table
              style={{
                borderWidth: "1px",
                borderColor: "#aaaaaa",
                borderStyle: "solid",
                columnWidth: "40px",
              }}
            >
              <caption>The Data</caption>
              <thead>
                <tr>
                  <th>name</th>
                  <th>id</th>
                  <th>email</th>
                  <th>phoneNo</th>
                  <th>hobbies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, index) => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{d._id}</td>
                    <td>{d.email}</td>
                    <td>{d.phoneNo}</td>
                    <td>
                      {d.hobbies.map((h, index) => (
                        <span key={index}>{h},</span>
                      ))}
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          getParticularUser(d._id);
                        }}
                        className="table__button"
                      >
                        Update
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteUser(d._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              style={{ margin: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                setPopup(true);
              }}
            >
              {" "}
              Open Popup Form
            </button>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>Sort By Which Field?</p>
              <input type="text" ref={fieldName} placeholder="Field Name" />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSort();
                }}
              >
                Sort Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Table;
