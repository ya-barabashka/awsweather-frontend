import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min";
import {WiThermometer} from "weather-icons-react";

export default class Nav extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <nav className="navbar navbar-dark bg-dark">
                <ul className="nav">
                    <a className="navbar-brand" href="#"><WiThermometer size={24} color='#FFF' /></a>
                    <li className="nav-item">
                        <a className="nav-link active" href="#" color='#FFF'>Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" color='#FFF'>Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" color='#FFF'>Disabled</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
