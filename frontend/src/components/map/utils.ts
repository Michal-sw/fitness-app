import L, { Map, LatLng } from "leaflet"
import { OverpassNode } from "overpass-ts";
import { ActivityDT } from "../../core/types/ActivityDT";

interface addOverpassResutOptions {
    buttonText?: string;
    popUpSize?: number;
    buttonCallback?: (dataPoint:OverpassNode) => void;
    userId?: String;
    activities?: ActivityDT[];
}

export const getPlaceIdsAsString = (activities: ActivityDT[]) => {
    return activities.reduce((prev, curr) => {
        if (!curr.placeId) return prev;
        return prev ? `${prev}, ${curr.placeId}` : `id:${curr.placeId}`;
    }, "");
}

export const addOverpassResultToMap = (map: Map, dataPoints: OverpassNode[], options: addOverpassResutOptions): void => {

    for (let dataPoint of dataPoints) {
        const position = new LatLng(dataPoint.lat, dataPoint.lon);
        const activity = options.activities?.find(a => a.placeId === dataPoint.id);

       if (isUserAParticipant(activity, options.userId)) continue;

        const popup = createPopupDiv(
            dataPoint,
            options,
            activity
        );


        L.circle(position, options.popUpSize || 20, {
          color: '#f69697',
          fillColor: '#c30010',
          fillOpacity: 1,
        })
        .addTo(map)
        .bindPopup(popup)
        .on('click', () => {
        });
    }                      
}

const isUserAParticipant = (activity: ActivityDT | undefined, userId: String | undefined) => {
    return activity?.attendees.find(attendee => attendee === userId);
}

const createPopupDiv = (dataPoint: OverpassNode, options: addOverpassResutOptions, activity: ActivityDT | undefined): HTMLDivElement => {
    const nameOfPlace = dataPoint.tags?.leisure || "";

    const popup = document.createElement('div');
    const name = createPopUpText('Name', nameOfPlace, options);
    const activityType = createPopUpText('Activity Type', activity?.activityType, options);
    const attendees = createPopUpText('Attendees', activity?.attendees.length.toString(), options);
    const addWorkoutButton = createButton(dataPoint, options);
    
    popup.append(name);
    activity && popup.append(activityType);
    activity && popup.append(attendees);
    popup.append(addWorkoutButton);

    return popup;
}

const createPopUpText = (label: string, nameOfPlace: string | undefined, options: addOverpassResutOptions): HTMLParagraphElement => {
    const container = document.createElement('div');

    const text = document.createElement('p');
    text.innerText = `${label}: ${nameOfPlace}`;
    
    container.append(text);

    return container;
}

const createButton = (dataPoint: OverpassNode, options: addOverpassResutOptions): HTMLButtonElement => {
    const addButton = document.createElement('button');
    const { buttonCallback, buttonText } = options;

    if (buttonCallback) {
        addButton.addEventListener('click', () => buttonCallback(dataPoint));
    }

    addButton.innerText = buttonText ? buttonText : "CLICK";

    return addButton;
}
