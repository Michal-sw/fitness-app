import L, { Map, LatLng } from "leaflet"
import { OverpassNode } from "overpass-ts";


export const addOverpassResultToMap = (map: Map, dataPoints: OverpassNode[]): void => {

    for (let dataPoint of dataPoints) {
        const position = new LatLng(dataPoint.lat, dataPoint.lon);

        const popup = createPopupDiv(dataPoint);

        L.circle(position, 20, {
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

const createPopupDiv = (dataPoint: OverpassNode): HTMLDivElement => {
    const nameOfPlace = dataPoint.tags?.leisure || "";

    const popup = document.createElement('div');
    const text = createPopUpText(nameOfPlace);
    const addWorkoutButton = createAddWorkoutButton();
    
    popup.append(text);
    popup.append(addWorkoutButton);

    return popup;
}

const createPopUpText = (nameOfPlace: string): HTMLParagraphElement => {
    const text = document.createElement('p');
    text.innerText = `Name: ${nameOfPlace}`;
    return text;
}

const createAddWorkoutButton = (): HTMLButtonElement => {
    const addButton = document.createElement('button');
    addButton.addEventListener('click', () => {
        console.log(`Clicked`);
    });
    addButton.innerText = "ADD WORKOUT";

    return addButton;
}

