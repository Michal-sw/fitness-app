import { Map } from "leaflet";
import { OverpassNode, overpass } from "overpass-ts";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import ActivityForm from "./mapForm/ActivityForm";
import { CircularProgress } from "@mui/material";
import { addOverpassResultToMap } from "./utils";
import { useLocation } from "react-router";
import useNotifications from "../../hooks/useNotifications";
import { lookupAddress } from "nominatim-browser";
import { NominatimResponseExt } from "../../core/types/NominatimResponseExt";
import { Coordinates } from "../../core/types/CoordinatesDT";
import useOverleafMap from "../../hooks/useOverleafMap";

function InteractiveMap({ latitude, longitude }: Coordinates) {
  const { t } = useTranslation();
  const mapContainerRef = useRef(null);
  const { actions } = useNotifications();
  const { isLoading, setIsLoading, map } = useOverleafMap({
    mapContainerRef,
    latitude,
    longitude,
  });
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
      .then((res) =>
        res.elements.map((el: OverpassNode) => `N${el.id}`).join(",")
      )
      .then((placeIds: string) =>
        lookupAddress({
          osm_ids: placeIds,
        })
      )
      .then((dataPoints: NominatimResponseExt[]) => {
        addOverpassResultToMap(map, dataPoints, {
          buttonCallback: (dataPoint: NominatimResponseExt) => {
            setPlaceId(Number(dataPoint.osm_id));
            setIsFormVisible(true);
          },
          buttonText: t("map.addWorkout") || "",
        });
      })
      .catch(() => {
        // handle error
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (state?.preFetchLocation && map)
      fetchLocation(map, `N${state.preFetchLocation}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  const fetchLocation = (map: Map, place_ids: string) => {
    setIsLoading(true);
    lookupAddress({
      osm_ids: place_ids,
    })
      .then((dataPoints: NominatimResponseExt[]) => {
        addOverpassResultToMap(map, dataPoints, {
          buttonText: t("map.trainingLocation") || "",
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
        {t("map.search")}
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
