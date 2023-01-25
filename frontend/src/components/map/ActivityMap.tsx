import React, { useEffect, useRef, useState } from 'react';
import { Coordinates } from '../../core/types/CoordinatesDT';
import L, { Map } from 'leaflet';
import { overpass, OverpassNode } from 'overpass-ts';
import useNotifications from '../../hooks/useNotifications';
import { CircularProgress } from '@mui/material';
import { addOverpassResultToMap } from './utils';
import { ActivityDT } from '../../core/types/ActivityDT';
import axiosService from '../../services/axiosService';
import useAuth from '../../core/providers/AuthContext';


function ActivityMap(coordinates: Coordinates) {
    const mapContainerRef = useRef(null);
    const { actions } = useNotifications();
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [map, setMap] = useState<Map | null>(null);
    const [activities, setActivities] = useState<ActivityDT[]>([]);

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
            setIsLoading(true);
            
            return () => {
                map.remove(); 
                setMap(null);
            };
        }
    }, []);

    useEffect(() => {
        if (!map || !isLoading || activities.length) return; 

        const getActivities = async () => {
            return axiosService.getActivities(token)
                .then(res => res.data.result)
                .catch(err => err);
        }

        getActivities()
            .then((activities: ActivityDT[]) => {
                setActivities(activities);
                const placeIds = getPlaceIdsAsString(activities);

                overpass(`[out:json];node(${placeIds});out body;`, {  })
                    .then((res) => res.json())
                    .then((res) => handleOverpassResponse(res, map))
                    .catch(err => {
                        console.log(err)
                        actions.addNotification("Error joining the activity!");
                    })
                    .finally(() => setIsLoading(false));
            })
            .catch(err => console.log(err));
    }, [isLoading]);
    
    const handleOverpassResponse = (res: any, map: Map) => {
        const dataPoints: OverpassNode[] = res.elements;
        addOverpassResultToMap(map, dataPoints, {
            buttonCallback: (dataPoint: OverpassNode) => {
                console.log(`You just clicked ${dataPoint.id}`);
                actions.addNotification("You have joined the activity!");
            },
            buttonText: "JOIN ACTIVITY",
            popUpSize: 50
        });
    }

    const getPlaceIdsAsString = (activities: ActivityDT[]) => {
        return activities.reduce((prev, curr) => {
            if (!curr.placeId) return prev;
            return prev ? `${prev}, ${curr.placeId}` : `id:${curr.placeId}`;
        }, "");
    }

    return (
        <>
            {isLoading ? <CircularProgress id='map-spinner' /> : null}
            <div id="map-container" ref={mapContainerRef}></div>
        </>
    )
}

export default ActivityMap