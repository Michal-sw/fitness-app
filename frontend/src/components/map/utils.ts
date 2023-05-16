import L, { LatLng, Map } from "leaflet";

import { ActivityDT } from "../../core/types/ActivityDT";
import { NominatimResponseExt } from "../../core/types/NominatimResponseExt";
import i18next from "../../i18n";

interface addOverpassResutOptions {
  buttonText?: string;
  popUpSize?: number;
  buttonCallback?: (dataPoint: NominatimResponseExt) => void;
  userId?: string;
  activities?: ActivityDT[];
}

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

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
  popup.classList.add("map-popup");

  const name = createPopUpText(
    `${i18next.t("map.popup.placeName")}: `,
    capitalizeFirstLetter(nameOfPlace)
  );
  const addressText = createPopUpText(
    `${i18next.t("map.popup.placeAddress")}: `,
    getMostAccurateAddress(dataPoint)
  );

  const activityTypeText =
    "" +
    capitalizeFirstLetter(activity?.level || "") +
    " " +
    capitalizeFirstLetter(activity?.activityType || "");

  const activityType = createPopUpText(
    `${i18next.t("map.popup.activityType")}: `,
    activityTypeText
  );
  const attendees = createPopUpText(
    `${i18next.t("map.popup.attendeesNumber")}: `,
    activity?.attendees.length.toString()
  );
  const description = createPopUpText("", activity?.description);
  const addWorkoutButton = createButton(dataPoint, options);

  popup.append(name);
  popup.append(addressText);
  activity && popup.append(activityType);
  activity && popup.append(attendees);
  activity && popup.append(description);
  popup.append(addWorkoutButton);

  return popup;
};

const createPopUpText = (
  label: string,
  text: string | undefined
): HTMLParagraphElement => {
  const container = document.createElement("div");

  const appendElement = (tagName: string, innerText: string) => {
    const element = document.createElement(tagName);
    element.innerText = innerText;
    container.append(element);
  };
  if (label) appendElement("label", label);
  if (text) appendElement("p", text);

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
