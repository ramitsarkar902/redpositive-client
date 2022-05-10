import React, { useRef, useState, useEffect } from "react";
import "./form.scss";
import { FaTelegramPlane } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
function Form({ setPopup }) {
  const history = createBrowserHistory({ forceRefresh: true });
  const baseUrl = "http://localhost:5000/api/users/";
  var phoneNo = useRef();
  var email = useRef();
  var name = useRef();
  var hobbies = useRef();

  const [error, setError] = useState({
    emailError: false,
    phoneError: false,
    nameError: false,
  });

  const [data, setData] = useState();
  const id = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/api/users/${id}`);
        setData(result.data);
        email.current.value = result.data.email;
        name.current.value = result.data.name;
        phoneNo.current.value = result.data.phoneNo;
        hobbies.current.value = result.data.hobbies;
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  /*  if (id) {
    name.current.value = data.name;
    email.current.value = data.email;
    
  } */

  /*  const handleTest = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/users/${id}`);
      console.log(result.data);
      setData(result.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
 */
  useEffect(() => {
    if (error.emailError === true) {
      email.current.focus();
      prompt("Email must contain @");
    }
    if (error.phoneError === true) {
      phoneNo.current.focus();
      prompt("Phone number must be of only 10 length");
    }
    if (error.nameError === true) {
      name.current.focus();
      prompt("Name must contain only letters");
    }
  }, [error]);

  const handleSubmit = async () => {
    const user = {
      name: name.current.value,
      email: email.current.value,
      phoneNo: phoneNo.current.value,
      hobbies: hobbies.current.value,
    };
    if (id) {
      await axios.put(`http://localhost:5000/api/users/${id}`, user);
      history.push("/");
    } else {
      await axios.post(`${baseUrl}`, user);
      console.log(user);
    }
    setPopup(false);
  };

  const validateData = () => {
    var phone = phoneNo.current.value;
    var emailId = email.current.value;
    if (phone.length !== 10) {
      setError({ ...error, phoneError: true });
    } else if (phone.match(/^[0-9]+$/) === null) {
      setError({ ...error, phoneError: true });
    }
    if (!emailId.includes("@")) {
      setError({ ...error, emailError: true });
    }
    if (/^[a-zA-Z\s.,]+$/.test(name.current.value) === false) {
      setError({ ...error, nameError: true });
    }
  };

  return (
    <div className="popup__form">
      <form
        type="submit"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            handleTest();
          }}
        >
          Hello
        </button> */}
        <div className="popup__form-wrapper">
          <MdCancel
            className="popup__form-close"
            onClick={(e) => {
              e.preventDefault();
              setPopup(false);
              history.push("/");
            }}
          />

          <h2>Fill Out The Details</h2>
          {error.emailError || error.nameError || error.phoneError ? (
            <span style={{ display: "flex" }}>
              <p style={{ color: "red", fontSize: "1rem", fontWeight: "bold" }}>
                Invalid field error. Refresh and refill
                {"      "}
                <CgDanger />
              </p>
            </span>
          ) : (
            ""
          )}
          <div className="popup__form-first">
            <div className="flex-col">
              <label>Name</label>
              <input type="text" ref={name} placeholder="Enter your name" />
            </div>
            <div className="flex-col">
              <label>Phone No</label>
              <input
                type="number"
                ref={phoneNo}
                placeholder="Enter your phone no"
              />
            </div>
          </div>
          <label>Email Id</label>
          <input type="email" ref={email} placeholder="Enter your email" />
          <label>Hobbies</label>
          <input type="text" ref={hobbies} placeholder="Enter your hobbies" />
          <div className="popup__form-last">
            <button
              onClick={(e) => {
                e.preventDefault();
                validateData();
                handleSubmit();
              }}
              disabled={error.emailError || error.phoneError}
              type="submit"
            >
              <FaTelegramPlane />
              {id ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
