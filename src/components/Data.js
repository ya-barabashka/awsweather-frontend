import React from 'react';
import axios from 'axios';
// import map from './map/map.js';
import {Helmet} from "react-helmet";
import OLMapFragment from "./map/OLMapFragment";
import OSM from "./map/OSM";

export default class Data extends React.Component {
     constructor(props){
         super(props);
     }

    state = {
        validation: [],
        observation: [],
        meteoParams: [],
        currentObservationTime: "select",
        currentValidationTime: "select",
        currentMeteoParams: [],
        observationSelector: "",
        validationSelector: "",
        meteoParamsSelector: "",
        generalWeatherInf: {
            uComponentMap: [],
            vComponentMap: [],
            temperatureMap: [],
            cloudMap: [],
            humidityMap: []
        },
        meteo: [],
        cloudcover: [],
        pressure: [],
        humidity: [],
        temperature: [],
        ucomp: [],
        vcomp: []
    }

     componentDidMount(){
         this.validation = axios.get("http://localhost:8080/data/validation")
             .then(response => response.data)
             .then(data => {
                 this.setState({validation : data});
             });
         this.observation = axios.get("http://localhost:8080/data/observation")
             .then(response => response.data)
             .then(data => {
                 this.setState({observation : data});
                 console.log(this.state.observation);
             });
         this.meteoParams = axios.get("http://localhost:8080/data/meteo/params")
             .then(response => response.data)
             .then(data => {
                 this.setState({meteoParams : data});
                 console.log(this.state.meteoParams);
             });

         // this.header.createScriptElement("https://maps.googleapis.com/maps/api/js?key=AIzaSyDzxBe9nA8HDVTMXLckdw9UVpi91nhowu0&amp;v=3.exp&amp;language=ua&callback=initMap");

    }

    createScriptElement(path){
        const script = document.createElement("script");
        script.src = path;
        script.async = true;
        document.body.appendChild(script);
    }

    selectedObservationTime(){
        this.setState({currentObservationTime: this.refs.observationSelector.value});
        console.log(this.refs.observationSelector.value);
    }

    selectedValidationTime(){
        this.setState({currentValidationTime: this.refs.validationSelector.value});
        console.log(this.refs.validationSelector.value);
    }

    selectedMeteoParams(e){
        this.setState({
            currentMeteoParams: Array.from(e.target.selectedOptions, item => item.value)
        });
    }

    // clearSelectedMeteoParams(){
    //     this.setState({
    //         currentMeteoParams: []
    //     });
    // }

    postWeatherTime = e => {
        e.preventDefault();
        // console.log('observationSelector: ', {
        //     currentObservationTime: this.state.currentObservationTime,
        //     currentValidationTime: this.state.currentValidationTime,
        //     currentMeteoParams: this.state.currentMeteoParams}
        //     )

        var requestData = {
            currentObservationTime: this.state.currentObservationTime,
            currentValidationTime: this.state.currentValidationTime,
            currentMeteoParams: this.state.currentMeteoParams
        };

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        };

        // JSON.stringify(response)
        var cloudcover = [];
        var pressure =[];
        var humidity = [];
        var temperature = [];
        var ucomp =[];
        var vcomp = [];
        fetch('http://localhost:8080/data/weather/init', requestOptions)
            .then(response => response.json())
            .then(data => {
                var arr = JSON.parse(JSON.stringify(data)); // all meteo entities
                arr.forEach(element => {
                    var item = JSON.parse(element); // selected meteo entity
                    var object = JSON.parse(JSON.stringify((item))); // object representation of meteo entity

                    if(object["cloudcover"] != undefined){
                        cloudcover.push(object["cloudcover"]);
                    }
                    if(object["pressure"] != undefined){
                        pressure.push(object["pressure"]);
                    }
                    if(object["humidity"] != undefined){
                        humidity.push(object["humidity"]);
                    }
                    if(object["temperature"] != undefined){
                        temperature.push(object["temperature"]);
                        console.log(object["temperature"]);
                    }
                    if(object["ucomp"] != undefined){
                        ucomp.push(object["ucomp"]);
                    }
                    if(object["vcomp"] != undefined){
                        vcomp.push(object["vcomp"]);
                    }
                })
            });


        // .then(response => response.json())
            // .then(json => { generalWeatherInf: this.createGeneralWeatherInf(json) })
            // .then(json => { this.setState({generalWeatherInf: this.createGeneralWeatherInf(json)}) })
            // .then(() => { console.log('generalWeatherInf: ', this.state.generalWeatherInf) });

    }

    createGeneralWeatherInf(data) {
        const allowed = ['uComponentMap', 'vComponentMap', 'temperatureMap', 'cloudMap', 'humidityMap'];
        return Object.keys(data)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});
            // .forEach(key => {
            // console.log(key, json[key]) });
        // console.log(filtered);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
         if(prevState.generalWeatherInf != this.state.generalWeatherInf){
             console.log('componentDidUpdate: ', this.state.generalWeatherInf) ;
         }
    }

    render(){
        const{ currentObservationTime, currentValidationTime, currentMeteoParams } = this.state;
        return (
            <div>

            <form id="weatherForecast-time" onSubmit={this.postWeatherTime.bind(this)} style={{padding: "8px", width: "500px", height: "300px", background: "#FF5"}}>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="observation-time">Observation time</label>
                            <select id="observation-time"
                                    className="custom-select"
                                    ref="observationSelector"
                                    onChange={(e)=>{this.selectedObservationTime()}}
                                    value={currentObservationTime}
                                    style={{ width: "220px"}}
                                    >
                                { this.state.observation.map((x,y) => <option  key={y}>{x}</option>) }
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="validating-time">Validation time</label>
                            <select id="validating-time"
                                    className="custom-select"
                                    ref="validationSelector"
                                    onChange={(e)=>{this.selectedValidationTime()}}
                                    value={currentValidationTime}
                                    style={{width: "220px"}}
                                    >
                                { this.state.validation.map((x,y) => <option  key={y}>{x}</option>) }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="meteo-params">Meteorological parameters</label>
                            <select id="meteo-params"
                                    className="custom-select"
                                    ref="meteoParamsSelector"
                                    onChange={(e)=>this.selectedMeteoParams(e)}
                                    // onMouseOver={()=>this.clearSelectedMeteoParams()}
                                    value={currentMeteoParams}
                                    style={{width: "220px"}}
                                    multiple
                            >
                                { this.state.meteoParams.map((x,y) => <option  key={y}>{x}</option>) }
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <ol>
                        { currentMeteoParams.map((x,y) =>  <li key={y}> {x} </li> )}
                        </ol>
                    </div>
                </div>
                <button type="submit" className="btn btn-dark float-right">Dark</button>
            </form>

                {/*<div id='react-container' ref="react-container" style={{width:"200px", height:"200px"}}></div>*/}
                {/*<OLMapFragment />*/}
                <OSM generalWeatherInf={this.state.generalWeatherInf}></OSM>
            </div>

        );
    };

}