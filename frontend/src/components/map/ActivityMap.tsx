import { Map } from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import { addOverpassResultToMap, getPlaceIdsAsNominatimString } from "./utils";

import { ActivityDT } from "../../core/types/ActivityDT";
import { CircularProgress } from "@mui/material";
import { Coordinates } from "../../core/types/CoordinatesDT";
import axiosService from "../../services/axiosService";
import useAuth from "../../core/providers/AuthContext";
import useNotifications from "../../hooks/useNotifications";
import { NominatimResponseExt } from "../../core/types/NominatimResponseExt";
import { NominatimError, lookupAddress } from "nominatim-browser";
import useOverleafMap from "../../hooks/useOverleafMap";

function ActivityMap({ latitude, longitude }: Coordinates) {
  const mapContainerRef = useRef(null);
  const { actions } = useNotifications();
  const { isLoading, setIsLoading, map } = useOverleafMap({
    mapContainerRef,
    latitude,
    longitude,
  });
  const { token, user } = useAuth();
  const [activities, setActivities] = useState<ActivityDT[]>([]);

  useEffect(() => {
    if (!map || activities.length) return;
    setIsLoading(true);

    const getActivities = async () => {
      return axiosService
        .getActivities(token)
        .then((res) => res.data.result)
        .catch((err) => err);
    };

    getActivities()
      .then((activities: ActivityDT[]) => {
        const filteredActivities = activities.filter((a) =>
          a.attendees.find((at) => at._id === user._id) ? false : true
        );
        setActivities(filteredActivities);
        const placeIds = getPlaceIdsAsNominatimString(activities);

        return lookupAddress({
          osm_ids: `N${placeIds}`,
        })
          .then((dataPoints: NominatimResponseExt[]) =>
            handleOverpassResponse(dataPoints, map, activities)
          )
          .catch((err: NominatimError) => err)
          .finally(() => setIsLoading(false));
      })
      .catch(() => {
        actions.addNotification("Error loading activities!");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  const handleOverpassResponse = (
    dataPoints: NominatimResponseExt[],
    map: Map,
    activities: ActivityDT[]
  ) => {
    addOverpassResultToMap(map, dataPoints, {
      buttonCallback: (dataPoint: NominatimResponseExt) => {
        const activity = activities.find((a) => a.placeId === dataPoint.osm_id);
        if (activity) {
          axiosService
            .addUserToActivity(token, user._id, activity._id)
            .then(() =>
              actions.addNotification("You have joined the activity!")
            )
            .catch(() => {
              // handle error
            });
        }
      },
      buttonText: "JOIN ACTIVITY",
      popUpSize: 50,
      activities,
      userId: user._id,
    });
  };

  return (
    <>
      {isLoading ? <CircularProgress id="map-spinner" /> : null}
      <div id="map-container" ref={mapContainerRef}></div>
    </>
  );
}

export default ActivityMap;
