import L = require("leaflet");
import { Place } from "./../../../common/objects/place";
import { MapService } from "./../../map/services/map.service";
const angular = require("angular");

export interface ISearchFormService {
    allPlaces: Place[];
    search(): void;
    searchForLocation(query: string): Place[];
}

export class SearchFormService implements ISearchFormService {

    public static $inject = ["mapService", "$http"];

    public allPlaces: Place[] = new Array<Place>();

    // tslint:disable-next-line:no-empty
    constructor(
        private mapService: MapService,
        private $http: ng.IHttpService) {

        // Loads all of the places from local json file
        this.$http.get("http://localhost:8080/places.json").then((response: any) => {

            const places: any = response.data.places;

            angular.forEach(places, (place: any) => {
                const newPlace = new Place(
                    place.place_id as string,
                    place.name as string,
                    place.formatted_address as string,
                    place.icon as string,
                    L.latLng(place.geometry.location.lat as number, place.geometry.location.lng as number));
                this.allPlaces.push(newPlace);
            });
        });
    }

    public searchForLocation(query: string): Place[] {

        const filteredPlaces = this.allPlaces.filter((loc: Place) => {

            return (loc.name.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
                (loc.formattedAddress.toLowerCase().indexOf(query.toLowerCase()) > -1);
        });

        return filteredPlaces;
    }

    public search(): void {

        this.mapService.executePathEffect();
    }
}
