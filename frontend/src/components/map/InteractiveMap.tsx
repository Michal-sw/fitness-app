import React, { useEffect, useRef, useState } from 'react';
import { Coordinates } from '../../core/types/CoordinatesDT';
import L, { LeafletMouseEvent, Map } from 'leaflet';
require('leaflet-overpass-layer');

function InteractiveMap(coordinates: Coordinates) {
    const mapContainerRef = useRef(null);
    const [dataRequested, setDataRequested] = useState<boolean>(false);

    const onMapClick = (event: LeafletMouseEvent) => {
        const map: Map = event.target;

        L.popup()
            .setLatLng(event.latlng)
            .setContent("You clicked the map at " + event.latlng.toString())
            .openOn(map);

        // FOR QUERY HELP - https://wiki.openstreetmap.org/wiki/Overpass_API
        const queryFitnessCentres = "(node({{bbox}})[leisure];node({{bbox}})[fitness_centre];);out qt;";
        if (!dataRequested) {
            const opl = new (L as any).OverPassLayer({
                'query': queryFitnessCentres,
            });
            map.addLayer(opl)
            setDataRequested(true);
            console.log("Layer added");
        }
    }

    useEffect(() => {
        const mapContainer = mapContainerRef.current;
        if (mapContainer) {
            const map: Map = L.map('map-container', {
                center: [54.35, 18.60],
                zoom: 12,
                layers: [
                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }),
                ],
                
            })
            map.on('click', onMapClick)

            return () => { map.remove() };
        }
    }, []);
    
    return (
        <div id="map-container" ref={mapContainerRef}>Hello</div>
    )
}

export default InteractiveMap