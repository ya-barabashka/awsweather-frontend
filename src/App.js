import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min";
import Data from "./components/Data";
import Nav from "./components/Nav";
import React from "react";

function App(props) {

    return (
        <div className="App">
          <Nav></Nav>
          <Data ></Data>
        </div>
    );

}

export default App;
