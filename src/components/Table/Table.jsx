import React, { useState, useEffect } from "react";
import "./table.scss";
import axios from "axios";
import { RotateCircleLoading } from "react-loadingg";
function Table({ setPopup }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const baseUrl = "http://localhost:5000/api/users/";
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await axios.get(`${baseUrl}`);
      setData(result.data);
      console.log(result.data);
      setLoading(false);
    };
    setTimeout(() => {
      fetchData();
    }, 2000);

    /*  console.log(data); */
  }, []);
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
                  <th>Name</th>
                  <th>Id</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Hobbies</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setPopup(true);
            }}
          >
            Open Popup Form
          </button>
        </>
      )}
    </div>
  );
}

export default Table;
