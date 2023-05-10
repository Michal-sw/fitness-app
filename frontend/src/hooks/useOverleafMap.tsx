import L, { Map } from "leaflet";
import { MutableRefObject, useEffect, useState } from "react";
import { Coordinates } from "../core/types/CoordinatesDT";

interface useOverleafMapProps extends Coordinates {
  mapContainerRef: MutableRefObject<any>;
}

const useOverleafMap = ({
  mapContainerRef,
  latitude,
  longitude,
}: useOverleafMapProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [map, setMap] = useState<Map | null>(null);

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

      return () => {
        map.remove();
        setMap(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    setIsLoading,
    map,
  };
};

export default useOverleafMap;
