import L, { Map, LatLng } from "leaflet"
import { OverpassNode } from "overpass-ts";

interface addOverpassResutOptions {
    buttonText?: string;
    popUpSize?: number;
    buttonCallback?: (dataPoint:OverpassNode) => void;
    popUpHTML?: HTMLElement;
}

export const addOverpassResultToMap = (map: Map, dataPoints: OverpassNode[], options: addOverpassResutOptions ): void => {

    for (let dataPoint of dataPoints) {
        const position = new LatLng(dataPoint.lat, dataPoint.lon);

        const popup = createPopupDiv(
            dataPoint,
            options
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

const createPopupDiv = (dataPoint: OverpassNode, options: addOverpassResutOptions): HTMLDivElement => {
    const nameOfPlace = dataPoint.tags?.leisure || "";

    const popup = document.createElement('div');
    const text = createPopUpText(nameOfPlace, options);
    const addWorkoutButton = createAddWorkoutButton(dataPoint, options);
    
    popup.append(text);
    popup.append(addWorkoutButton);

    return popup;
}

const createPopUpText = (nameOfPlace: string, options: addOverpassResutOptions): HTMLParagraphElement => {
    const container = document.createElement('div');
    const { popUpHTML } = options;

    const text = document.createElement('p');
    text.innerText = `Name: ${nameOfPlace}`;
    
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

