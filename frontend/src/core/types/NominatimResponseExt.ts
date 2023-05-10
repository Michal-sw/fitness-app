import { GeocodeAddress, NominatimResponse } from "nominatim-browser";

export interface NominatimResponseExt extends NominatimResponse {
  address: GeocodeAddress & {
    road?: string;
    leisure?: string;
  };
}
