import { Point } from "geojson";
import L = require("leaflet");

export interface IPlace {
    id: string;
    icon: string;
    name: string;
    formattedAddress: string;
    geometry: L.LatLng;
}

export class Place implements IPlace {
    constructor(
        public id: string,
        public name: string,
        public formattedAddress: string,
        public icon: string,
        public geometry: L.LatLng) {
    }
}
