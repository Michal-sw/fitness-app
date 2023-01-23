import React, { useEffect, useRef, useState } from 'react';
import { Coordinates } from '../../core/types/CoordinatesDT';
import L, { LeafletMouseEvent, Map } from 'leaflet';
import { overpass, OverpassNode } from 'overpass-ts';
import useNotifications from '../../hooks/useNotifications';
import { CircularProgress } from '@mui/material';
import { addOverpassResultToMap } from './utils';


function InteractiveMap(coordinates: Coordinates) {
    const mapContainerRef = useRef(null);
    const { actions } = useNotifications();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [map, setMap] = useState<Map | null>(null);

    const handleMapSearch = () => {
        if (!map) return; 
        const bounds = map.getBounds();
        const bottomLeftCorner = bounds.getSouthWest();
        const upperRightCorner = bounds.getNorthEast();

        if (map.getZoom() < 15) {
            actions.sendDissapearingNotification({ message: "Map zoom must be bigger" });
            return;
        }

        setIsLoading(true);
        overpass(`[out:json];(node(${bottomLeftCorner.lat},${bottomLeftCorner.lng},${upperRightCorner.lat},${upperRightCorner.lng})[leisure];node(${bottomLeftCorner.lat},${bottomLeftCorner.lng},${upperRightCorner.lat},${upperRightCorner.lng})[fitness_centre];);out body;`, {  })
            .then(async (res) => {
                const result = await res.json();
                const dataPoints: OverpassNode[] = result.elements;
                addOverpassResultToMap(map, dataPoints);
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));


    }

    const onMapClick = (event: LeafletMouseEvent) => { 
        const map: Map = event.target;
        // FOR QUERY HELP - https://wiki.openstreetmap.org/wiki/Overpass_API
        // Get nodes by id
        // node(id:1926700039, 6224865808, 6186983783); out body;
    }

    useEffect(() => {
        const mapContainer = mapContainerRef.current;
        if (mapContainer) {
            const map: Map = L.map('map-container', {
                center: [coordinates.longitude, coordinates.latitude],
                zoom: 12,
                layers: [
                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }),
                ],
                
            })
            setMap(map);
            map.on('click', onMapClick)
            
            return () => {
                map.remove(); 
                setMap(null);
            };
        }
    }, []);
    
    return (
        <>
            {isLoading ? <CircularProgress style={{ position: "absolute", top: '40%', 'left':'47%', 'zIndex': "1000"}} /> : null}
            <button onClick={handleMapSearch} style={{position:'absolute', 'zIndex':'999', 'right':'0'}}>Search</button>
            <div id="map-container" ref={mapContainerRef}></div>
        </>
    )
}

export default InteractiveMap