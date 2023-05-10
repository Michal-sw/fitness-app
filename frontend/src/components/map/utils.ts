import L, { LatLng, Map } from "leaflet";

import { ActivityDT } from "../../core/types/ActivityDT";
import { NominatimResponseExt } from "../../core/types/NominatimResponseExt";

interface addOverpassResutOptions {
  buttonText?: string;
  popUpSize?: number;
  buttonCallback?: (dataPoint: NominatimResponseExt) => void;
  userId?: string;
  activities?: ActivityDT[];
}

const getMostAccurateAddress = (dataPoint: NominatimResponseExt) => {
  const { road, house_number, city } = dataPoint.address;
  const address = [road, house_number, city].filter((el) => el).join(", ");
  return address;
};

export const getPlaceIdsAsNominatimString = (activities: ActivityDT[]) => {
  return activities.map((el: ActivityDT) => `N${el.placeId}`).join(",");
};

export const addOverpassResultToMap = (
  map: Map,
  dataPoints: NominatimResponseExt[],
  options: addOverpassResutOptions
): void => {
  for (const dataPoint of dataPoints) {
    const position = new LatLng(Number(dataPoint.lat), Number(dataPoint.lon));
    const activity = options.activities?.find(
      (a) => a.placeId === dataPoint.osm_id
    );

    if (isUserAParticipant(activity, options.userId)) continue;

    const popup = createPopupDiv(dataPoint, options, activity);

    L.circle(position, options.popUpSize || 20, {
      color: "#f69697",
      fillColor: "#c30010",
      fillOpacity: 1,
    })
      .addTo(map)
      .bindPopup(popup)
      .on("click", () => {
        // handle click
      });
  }
};

const isUserAParticipant = (
  activity: ActivityDT | undefined,
  userId: string | undefined
) => {
  return activity?.attendees.find((attendee) => attendee._id === userId);
};

const createPopupDiv = (
  dataPoint: NominatimResponseExt,
  options: addOverpassResutOptions,
  activity: ActivityDT | undefined
): HTMLDivElement => {
  const nameOfPlace =
    dataPoint.address.leisure || dataPoint.type.replaceAll("_", " ");

  const popup = document.createElement("div");

  const name = createPopUpText("Name", nameOfPlace, options);
  const addressText = createPopUpText(
    "Address",
    getMostAccurateAddress(dataPoint),
    options
  );
  const activityType = createPopUpText(
    "Activity Type",
    activity?.activityType,
    options
  );
  const attendees = createPopUpText(
    "Attendees",
    activity?.attendees.length.toString(),
    options
  );
  const addWorkoutButton = createButton(dataPoint, options);

  popup.append(name);
  popup.append(addressText);
  activity && popup.append(activityType);
  activity && popup.append(attendees);
  popup.append(addWorkoutButton);

  return popup;
};

const createPopUpText = (
  label: string,
  nameOfPlace: string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: addOverpassResutOptions
): HTMLParagraphElement => {
  const container = document.createElement("div");

  const text = document.createElement("p");
  text.innerText = `${label}: ${nameOfPlace}`;

  container.append(text);

  return container;
};

const createButton = (
  dataPoint: NominatimResponseExt,
  options: addOverpassResutOptions
): HTMLButtonElement => {
  const addButton = document.createElement("button");
  const { buttonCallback, buttonText } = options;

  if (buttonCallback) {
    addButton.addEventListener("click", () => buttonCallback(dataPoint));
  }

  addButton.innerText = buttonText ? buttonText : "CLICK";

  return addButton;
};
