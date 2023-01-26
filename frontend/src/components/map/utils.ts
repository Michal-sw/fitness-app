import L, { Map, LatLng } from "leaflet"
import { OverpassNode } from "overpass-ts";
import { ActivityDT } from "../../core/types/ActivityDT";

interface addOverpassResutOptions {
    buttonText?: string;
    popUpSize?: number;
    buttonCallback?: (dataPoint:OverpassNode) => void;
    popUpHTML?: HTMLElement;
}

export const addOverpassResultToMap = (map: Map, dataPoints: OverpassNode[], options: addOverpassResutOptions, activities?: ActivityDT[] ): void => {
    
    for (let dataPoint of dataPoints) {
        const position = new LatLng(dataPoint.lat, dataPoint.lon);
        const activity = activities?.find(a => a.placeId === dataPoint.id)?.activityType;

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

const createPopupDiv = (dataPoint: OverpassNode, options: addOverpassResutOptions, activityType: string | undefined): HTMLDivElement => {
    const nameOfPlace = dataPoint.tags?.leisure || "";

    const popup = document.createElement('div');
    const text = createPopUpText(nameOfPlace, options, 'Name');
    const activityText = createPopUpText(activityType, options, 'Activity Type');
    const addWorkoutButton = createAddWorkoutButton(dataPoint, options);
    
    popup.append(text);
    activityType && popup.append(activityText)
    popup.append(addWorkoutButton);

    return popup;
}

const createPopUpText = (nameOfPlace: string | undefined, options: addOverpassResutOptions, name: string): HTMLParagraphElement => {
    const container = document.createElement('div');
    const { popUpHTML } = options;

    const text = document.createElement('p');
    text.innerText = `${name}: ${nameOfPlace}`;
    
    container.append(text);
    
    if (popUpHTML) {
        container.append(popUpHTML);
    }
    return container;
}

const createAddWorkoutButton = (dataPoint: OverpassNode, options: addOverpassResutOptions): HTMLButtonElement => {
    const addButton = document.createElement('button');
    const { buttonCallback, buttonText } = options;

    if (buttonCallback) {
        addButton.addEventListener('click', () => buttonCallback(dataPoint));
    }

    addButton.innerText = buttonText ? buttonText : "ADD WORKOUT";

    return addButton;
}

