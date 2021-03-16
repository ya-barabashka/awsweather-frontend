import React from 'react';
import {Feature, Map, View} from 'ol';
import XYZ from "ol/source/XYZ";
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import { Style, Fill, Stroke, Text, Icon } from "ol/style";
import Point from "ol/geom/Point";
import {fromLonLat} from "ol/proj";
import {Vector as VectorSource} from "ol/source";
import image from "./dot.png";

export default class OSM extends React.Component {

    map;

    constructor(props){
        super(props)
        this.map = new Map();
    };

    putMarkers(data){
        // var labelStyle = new Style({
        //     text: new Text({
        //         font: '12px Calibri,sans-serif',
        //         overflow: true,
        //         fill: new Fill({
        //             color: '#000',
        //         }),
        //         stroke: new Stroke({
        //             color: '#fff',
        //             width: 3,
        //         }),
        //     }),
        // });

        var markers = [];

        data.forEach(element => {
            var geoMarker = new Feature({
                geometry: new Point(fromLonLat([element.weatherPK.longitude, element.weatherPK.latitude]))

            });
            geoMarker.setStyle(new Style({
                    // image: new Icon(({
                    //     crossOrigin: 'anonymous',
                    //     src: image,
                    //     scale: [0.03, 0.03],
                    // })),
                text: new Text({
                    font: '12px Roboto',
                    text: new String(element.meteoParameter),
                    fill: new Fill({
                        color: '#ffbb00'
                    }),
                    stroke: new Stroke({
                        color: '#000',
                        width: 1
                    })
                })
            }));
            markers.push(geoMarker);
            }
        )

        // var geoMarker1 = new Feature({
        //     // type: 'geoMarker',
        //     geometry: new Point(fromLonLat([32.2858, 48.01398]))
        // });
        //
        // var geoMarker2 = new Feature({
        //     // type: 'geoMarker',
        //     geometry: new Point(fromLonLat([33.2858, 47.01398]))
        // });
        //
        // var geoMarker3 = new Feature({
        //     // type: 'geoMarker',
        //     geometry: new Point(fromLonLat([30.2858, 50.01398]))
        // });

        // geoMarker.setStyle(new Style({
        //     image: new Icon(({
        //         crossOrigin: 'anonymous',
        //         src: image,
        //         scale: [0.03, 0.03],
        //     })),
        //     text: new Text({
        //         font: '12px Roboto',
        //         text: 'AAAAAAAAAAAAAAA',
        //         fill: new Fill({
        //             color: '#ffbb00'
        //         }),
        //         stroke: new Stroke({
        //             color: '#000',
        //             width: 1
        //         })
        //     })
        // }));
        //
        // markers.push(geoMarker1);
        // markers.push(geoMarker2);
        // markers.push(geoMarker3);

        // var geoMarker = new Feature({
        //     // type: 'geoMarker',
        //     geometry: new Point(fromLonLat([31.2858, 49.01398])),
        // });

        // var styles = {
        //     'geoMarker': new Style({
        //         image: new CircleStyle({
        //             radius: 7,
        //             fill: new Fill({color: 'black'}),
        //             stroke: new Stroke({
        //                 color: 'white',
        //                 width: 2,
        //             }),
        //         }),
        //     }),
        // };

        // var vectorSource = new VectorSource({
        //     features: [geoMarker]
        // });


        var vectorSource = new VectorSource({
            features: markers
        });

        var markerVectorLayer = new VectorLayer({
            source: vectorSource,
            // style: styles.geoMarker,
        });

        // map.addLayer(markerVectorLayer);

        return markerVectorLayer;
    }

    // createGeneralWeatherInf(data) {
    //     const allowed = ['uComponentMap', 'vComponentMap', 'temperatureMap', 'cloudMap', 'humidityMap'];
    //     return Object.keys(data)
    //         .filter(key => allowed.includes(key))
    //         .reduce((obj, key) => {
    //             obj[key] = data[key];
    //             return obj;
    //         }, {});
    //     // .forEach(key => {
    //     // console.log(key, json[key]) });
    //     // console.log(filtered);
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.generalWeatherInf != this.props.generalWeatherInf){
            var parsedJson = JSON.parse(JSON.stringify(this.props.generalWeatherInf));
            var markersLayer = this.putMarkers(parsedJson.temperatureMap);
            this.map.addLayer(markersLayer);
            // console.log('props from OSM: ', this.props.generalWeatherInf) ;
        }
    }

    componentDidMount(){
        this.map.constructor(
            {
                target: document.getElementById('map'),
                layers: [
                    new TileLayer({
                        source: new XYZ({
                            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            // projection: 'EPSG:4326',
                            // tileSize: 512,
                        }),
                    }) ],
                view: new View({
                    // projection: 'EPSG:4326',
                    center: fromLonLat([31.2858, 49.0139]),
                    zoom: 6
                }),
            }
        );

    }

    render(){
        const style = {
            width: '100%',
            height: '400px',
            backgroundColor: '#cccccc'
        }
        return (
            <div>
                <div id='map' style={style} />
            </div>
        );
    }
}


