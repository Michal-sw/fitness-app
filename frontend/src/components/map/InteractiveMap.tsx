import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../styles/maps/InteractiveMap.scss';
import { Coordinates } from '../../core/types/CoordinatesDT';
import L from 'leaflet';

function InteractiveMap(coordinates: Coordinates) {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const mapContainer = mapContainerRef.current;
        if (mapContainer) {
            const map = L.map('map-container', {
                center: [54.35, 18.60],
                zoom: 12,
                layers: [
                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
                ]
            })
            return () => { map.remove() };
        }
    },[]);


    
    return (
        <div id="map-container" ref={mapContainerRef}>Hello</div>
    )
}

export default InteractiveMap