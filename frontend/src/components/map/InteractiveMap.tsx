import React, { useEffect, useRef, useState } from 'react';
import { Coordinates } from '../../core/types/CoordinatesDT';
import L, { Map } from 'leaflet';
import { overpass, OverpassNode } from 'overpass-ts';
import useNotifications from '../../hooks/useNotifications';
import { CircularProgress } from '@mui/material';
import { addOverpassResultToMap } from './utils';
import ActivityForm from './ActivityForm';


function InteractiveMap(coordinates: Coordinates) {
    const mapContainerRef = useRef(null);
    const { actions } = useNotifications();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [map, setMap] = useState<Map | null>(null);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [placeId, setPlaceId] = useState<number>(0);

    const handleMapSearch = () => {
        if (!map) return; 
        const bounds = map.getBounds();
        const bottomLeftCorner = bounds.getSouthWest();
        const upperRightCorner = bounds.getNorthEast();

        if (map.getZoom() < 15) {
            actions.addNotification("Map zoom must be bigger");
            return;
        }

        setIsLoading(true);
        overpass(`[out:json];(node(${bottomLeftCorner.lat},${bottomLeftCorner.lng},${upperRightCorner.lat},${upperRightCorner.lng})[leisure];node(${bottomLeftCorner.lat},${bottomLeftCorner.lng},${upperRightCorner.lat},${upperRightCorner.lng})[fitness_centre];);out body;`, {  })
            .then((res) => res.json())
            .then((res) => {
                const dataPoints: OverpassNode[] = res.elements;
                addOverpassResultToMap(map, dataPoints, {
                    buttonCallback: (dataPoint: OverpassNode) => {
                        setPlaceId(dataPoint.id);
                        setIsFormVisible(true);
                    },
                    buttonText: "ADD WORKOUT!"
                });
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
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
            
            return () => {
                map.remove(); 
                setMap(null);
            };
        }
    }, []);
    
    return (
        <>
            {isLoading ? <CircularProgress id='map-spinner' /> : null}
            <button id='map-search' onClick={handleMapSearch}>Search</button>
            <ActivityForm isVisible={isFormVisible} setVisible={setIsFormVisible} placeId={placeId}/>
            <div id="map-container" ref={mapContainerRef}></div>
        </>
    )
}

export default InteractiveMap