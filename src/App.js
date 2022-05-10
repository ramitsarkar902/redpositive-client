import Popup from "reactjs-popup";
import "./app.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Table, UpdateUserForm } from "./components";
import { useState } from "react";
import { useParams } from "react-router";

function App() {
  const [popup, setPopup] = useState(false);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            {popup === true ? (
              <Form setPopup={setPopup} />
            ) : (
              <Table setPopup={setPopup} />
            )}
          </div>
        </Route>
        <Route path="/:id">
          <Form setPopup={setPopup} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
