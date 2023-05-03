import L, { Map } from "leaflet";
import { OverpassNode, overpass } from "overpass-ts";
import React, { useEffect, useRef, useState } from "react";

import ActivityForm from "./ActivityForm";
import { CircularProgress } from "@mui/material";
import { addOverpassResultToMap } from "./utils";
import { useLocation } from "react-router";
import useNotifications from "../../hooks/useNotifications";

interface InteractiveMapProps {
  latitude?: number;
  longitude?: number;
}

function InteractiveMap({
  latitude = 18.6,
  longitude = 54.35,
}: InteractiveMapProps) {
  const mapContainerRef = useRef(null);
  const { actions } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [map, setMap] = useState<Map | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [placeId, setPlaceId] = useState<number>(0);
  const { state } = useLocation();

  const handleMapSearch = () => {
    if (!map || isLoading) return;
    const bounds = map.getBounds();
    const bottomLeftCorner = bounds.getSouthWest();
    const upperRightCorner = bounds.getNorthEast();

    if (map.getZoom() < 15) {
      actions.addErrorNotification("Map zoom must be bigger");
      return;
    }

    setIsLoading(true);
    overpass(
      `[out:json];(node(${bottomLeftCorner.lat},${bottomLeftCorner.lng},${upperRightCorner.lat},${upperRightCorner.lng})[leisure];node(${bottomLeftCorner.lat},${bottomLeftCorner.lng},${upperRightCorner.lat},${upperRightCorner.lng})[fitness_centre];);out body;`,
      {}
    )
      .then((res) => res.json())
      .then((res) => {
        const dataPoints: OverpassNode[] = res.elements;
        addOverpassResultToMap(map, dataPoints, {
          buttonCallback: (dataPoint: OverpassNode) => {
            setPlaceId(dataPoint.id);
            setIsFormVisible(true);
          },
          buttonText: "ADD WORKOUT!",
        });
      })
      .catch(() => {
        // handle error
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (mapContainer) {
      const map: Map = L.map("map-container", {
        center: [longitude, latitude],
        zoom: 12,
        layers: [
          L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }),
        ],
      });
      setMap(map);

      if (state?.preFetchLocation) fetchLocation(map);

      return () => {
        map.remove();
        setMap(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLocation = (map: Map) => {
    setIsLoading(true);
    overpass(`[out:json];node(id:${state.preFetchLocation});out body;`, {})
      .then((res) => res.json())
      .then((res) => {
        const dataPoints: OverpassNode[] = res.elements;
        addOverpassResultToMap(map, dataPoints, {
          buttonCallback: () => {
            // handle callback
          },
          buttonText: "Your training location",
          popUpSize: 100,
        });
      })
      .catch(() => {
        // handle error
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading ? <CircularProgress id="map-spinner" /> : null}
      <button id="map-search" onClick={handleMapSearch}>
        Search
      </button>
      <ActivityForm
        isVisible={isFormVisible}
        setVisible={setIsFormVisible}
        placeId={placeId}
      />
      <div id="map-container" ref={mapContainerRef}></div>
    </>
  );
}

export default InteractiveMap;
