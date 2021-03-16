import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { Vector as VectorSource, OSM as OSMSource, XYZ as XYZSource, TileWMS as TileWMSSource } from 'ol/source'
import { ScaleLine, ZoomSlider, MousePosition, OverviewMap, defaults as DefaultControls } from 'ol/control'

class OLMapFragment extends React.Component {

    constructor(props) {
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this)
    }

    updateDimensions(){
        const h = window.innerWidth >= 992 ? window.innerHeight : 400
        this.setState({height: h})
    }

    componentWillMount(){
        window.addEventListener('resize', this.updateDimensions)
        this.updateDimensions()
    }

    componentDidMount(){

        // var map = document.getElementById('map');
        // var marker = document.getElementById('marker');

        // Create an Openlayer Map instance with two tile layers
        var map = new Map({
            //  Display the map in the div with the id of map
            target: 'map',
            layers: [
                new TileLayer({
                    source: new XYZSource({
                        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        projection: 'EPSG:4326'
                    })
                }),
            //     new TileLayer({
            //         source: new TileWMSSource({
            //             url: 'https://ahocevar.com/geoserver/wms',
            //             params: {
            //                 layers: 'topp:states',
            //                 'TILED': true,
            //             },
            //             projection: 'EPSG:4326'
            //         }),
            //         name: 'USA'
            //     }),
            ],
            // Add in the following map controls
            controls: DefaultControls().extend([
                new ZoomSlider(),
                new MousePosition(),
                new ScaleLine(),
                new OverviewMap()
            ]),
            // Render the tile layers in a map view with a Mercator projection
            view: new View({
                projection: 'EPSG:4326',
                center: [31.2, -33.4],
                zoom: 6
            })
        })

        // var iconFeature2 = new ol.Feature({
        //     geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.1426069, 51.4840309])),
        //     name: 'Somewhere else'
        // });

        // specific style for that one point
        // iconFeature2.setStyle(new ol.style.Style({
        //     image: new ol.style.Icon({
        //         anchor: [0.5, 46],
        //         anchorXUnits: 'fraction',
        //         anchorYUnits: 'pixels',
        //         src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/200px-Map_marker_font_awesome.svg.png',
        //     })

        // var geoMarkerFeature = new Feature({
        //     type: 'icon',
        //     geometry: new Point(fromLonLat([49.0139, 31.2858], )),
        // });

        // geoMarkerFeature.setStyle(new Style({
        //     image: new Icon({
        //         anchor: [49.0139, 31.2858],
        //         anchorXUnits: 'fraction',
        //         anchorYUnits: 'pixels',
        //         src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/200px-Map_marker_font_awesome.svg.png',
        //     })
        // }));

        // const iconLayerSource = new ol.source.Vector({
        //     features: [iconFeature1, iconFeature2]
        // });

        // var geoMarkerLayerSource = new Vector({
        //     source: new VectorSource({
        //         features: [geoMarkerFeature],
        //     })
        // });
        //
        // const iconLayer = new Vector({
        //     source: geoMarkerLayerSource,
        //     // style for all elements on a layer
        //     style: new Style({
        //         image: new ol.style.Icon({
        //             anchor: [0.5, 46],
        //             anchorXUnits: 'fraction',
        //             anchorYUnits: 'pixels',
        //             src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
        //         })
        //     })
        // });
        //
        //
        // map.addOverlay(vectorLayer);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.updateDimensions)
    }
    render(){
        const style_map = {
            width: '100%',
            height:this.state.height,
            backgroundColor: '#cccccc'
        }
        const style_marker = {
            width: "20px",
            height: "20px",
            border: "1px solid #088",
            borderRadius: "10px",
            backgroundColor: "#0FF",
            opacity: "0.5"
        }
        return (
            <Grid container>
                <Grid item xs={12}>
                    <div id="marker" title="Marker" style={{style_marker}} />
                    <div id='map' style={style_map} />
                </Grid>
            </Grid>
        )
    }
}
export default OLMapFragment