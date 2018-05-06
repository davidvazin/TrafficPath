import L = require("leaflet");
import { ThemeType } from "../../../common/enums/ThemeType";
require("../../../../node_modules/leaflet/dist/leaflet.css");
require("mapbox");

// import * as d3 from "d3";

/// <reference path="./d3.pathEffect.d.ts" />"
const pathEffect = require("./d3.pathEffect.js");

export interface IMapService {
    map?: L.Map;
    baseMaps: L.Control.LayersObject;
    darkMap: L.TileLayer;
    lightMap: L.TileLayer;
    selectedMapTheme: ThemeType;
    init(): void;
    getMap(): L.Map;
    flyToPoint(point: L.LatLng): void;
    executePathEffect(): void;
    changeMapTheme(themeType: ThemeType): void;
}

export class MapService implements IMapService {

    public static $inject = ["$timeout"];

    public map?: L.Map;
    public baseMaps: L.Control.LayersObject;
    public lightMap: L.TileLayer;
    public darkMap: L.TileLayer;
    public selectedMapTheme: ThemeType = ThemeType.LIGHT;

    // tslint:disable-next-line:no-empty
    constructor(private $timeout: ng.ITimeoutService) {

        this.darkMap =
            L.tileLayer("http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                { "id": "map", "attribution": "mapboxAttribution" });
        this.lightMap =
            L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                { "id": "map", "attribution": "mapboxAttribution" });

        this.baseMaps = {
            "Black Map Tile": this.darkMap,
            "Light Map Tile": this.lightMap,
        };
    }

    public init(): void {

        if (this.map !== undefined) {
            this.map.remove();
        }

        this.map = new L.Map("map",
            {
                "layers": [(this.selectedMapTheme === ThemeType.LIGHT) ? this.lightMap : this.darkMap],
            })
            .setView([31.997399107389434, 34.773584604263306], 9);

        L.control.layers(this.baseMaps).addTo(this.map);
    }

    // tslint:disable-next-line:no-empty
    public onZoomEnd(): void {
    }

    public getMap(): L.Map {
        return this.map as L.Map;
    }

    public flyToPoint(point: L.LatLng) {
        this.getMap().flyTo(point, 18, { "duration": 1 });

        // Put new temporary marker for the point on the map
        this.$timeout(() => {
            const tempMarker = L.marker(point,
                {
                    "icon": L.icon(
                        {
                            // tslint:disable-next-line:max-line-length
                            "iconUrl": "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png",
                            "iconSize": [50, 50],
                        }),
                },
            ).addTo(this.getMap());

            // Removes the temporary marker
            this.$timeout(() => {
                tempMarker.remove();
            }, 4000);
        }, 1100);
    }

    public executePathEffect(): void {

        this.flyToPoint(L.latLng(31.997399107389434, 34.773584604263306));
        this.$timeout(() => {
            pathEffect.execute(this.getMap());
        }, 1200);
    }

    public changeMapTheme(themeType: ThemeType): void {
        if (themeType === ThemeType.LIGHT) {
            this.getMap().removeLayer(this.darkMap);
            this.getMap().addLayer(this.lightMap);
        } else {
            this.getMap().removeLayer(this.lightMap);
            this.getMap().addLayer(this.darkMap);
        }

        this.selectedMapTheme = themeType;
    }
}
