import Popup from "reactjs-popup";
import "./app.scss";
import { Form, Table } from "./components";
import { useState } from "react";
function App() {
  const [popup, setPopup] = useState(false);
  return (
    <div className="App">
      {popup === true ? (
        <Form setPopup={setPopup} />
      ) : (
        <Table setPopup={setPopup} />
      )}
    </div>
  );
}

export default App;
