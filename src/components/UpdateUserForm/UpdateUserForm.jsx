import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { MdCancel } from "react-icons/md";

function UpdateUserForm() {
  const { id } = useParams();
  const history = createBrowserHistory({ forceRefresh: true });
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5000/api/users/${id}`);
      setData(result.data);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {};

  return <div className="popup__form">hello</div>;
}

export default UpdateUserForm;
