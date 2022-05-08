import React, { useRef, useState, useEffect } from "react";
import "./form.scss";
import { FaTelegramPlane } from "react-icons/fa";
function Form() {
  var phoneNo = useRef();
  var email = useRef();
  const [error, setError] = useState({ emailError: false, phoneError: false });

  /*  useEffect(() => {
    if (phoneNo.current.value !== null) {
      if (email.current.value !== null) {
        validateData();
      }
    }
  }, [phoneNo.current.value, email.current.value]); */

  const handleClick = async () => {
    console.log("hello");
  };

  const validateData = () => {
    var phone = phoneNo.current.value;
    var emailId = email.current.value;
    if (phone.length === 10) {
      if (!emailId.includes("@")) {
        setError({ emailError: true, phoneError: false });
      } else {
        setError({ emailError: false, phoneError: false });
      }
    } else {
      setError({ emailError: false, phoneError: true });
    }
  };

  return (
    <div className="popup__form">
      <form
        onSubmit={(e) => {
          handleClick();
        }}
      >
        <div className="popup__form-wrapper">
          <h2>Fill Out The Details</h2>
          <div className="popup__form-first">
            <div className="flex-col">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
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
          <input type="text" placeholder="Enter your hobbies" />
          <div className="popup__form-last">
            <button
              onClick={(e) => {
                e.preventDefault();
                validateData();
              }}
              disabled={error.emailError || error.phoneError}
              type="submit"
            >
              <FaTelegramPlane />
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
