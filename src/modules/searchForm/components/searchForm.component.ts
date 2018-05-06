import { TextField } from "../../../common/enums/TextField";
import { Place } from "./../../../common/objects/place";
import { IMapService } from "./../../map/services/map.service";
import { ISearchFormService } from "./../services/searchForm.service";

interface ISearchFormComponentController {
    onSourceTextChange(query: string): void;
    createSearchPromise(query: string): ng.IPromise<Place[]>;
    selectPlace(place: Place): void;
    clearSelectedSource(): void;
    onSourceTextFieldFocus(): void;
    onDestinationTextFieldFocus(): void;
    search(): void;
}

class SearchFormComponentController implements ISearchFormComponentController {

    public static $inject = ["$q", "$timeout", "searchFormService", "mapService"];

    public sourceText: string = "";
    public destinationText: string = "";
    public selectedSource?: Place;
    public selectedDestination?: Place;
    public filteredPlaces: Place[] = new Array<Place>();
    public isSearching: boolean = false;
    public searchPromis?: ng.IDeferred<Place[]>;
    public focusedTextField?: TextField;

    constructor(
        private $q: ng.IQService,
        private $timeout: ng.ITimeoutService,
        private searchFormService: ISearchFormService,
        private mapService: IMapService) {

        this.onSourceTextChange = this.onSourceTextChange.bind(this);
        this.clearSelectedSource = this.clearSelectedSource.bind(this);

        this.onDestinationTextChange = this.onDestinationTextChange.bind(this);
        this.clearSelectedDestination = this.clearSelectedDestination.bind(this);

        this.onSourceTextFieldFocus = this.onSourceTextFieldFocus.bind(this);
        this.onDestinationTextFieldFocus = this.onDestinationTextFieldFocus.bind(this);
    }

    public onSourceTextChange(query: string): void {
        if (query !== "") {
            this.isSearching = true;

            this.createSearchPromise(query).then((filteredLocations: Place[]) => {
                this.filteredPlaces = filteredLocations;
                this.isSearching = false;
            }, () => {
                this.filteredPlaces = [];
            });

        } else {
            this.isSearching = false;
            this.clearSelectedSource();
            this.createSearchPromise(query).then((filteredLocations: Place[]) => {
                this.filteredPlaces = [];
            }, () => {
                this.filteredPlaces = [];
            });
        }
    }

    public onDestinationTextChange(query: string): void {
        if (query !== "") {
            this.isSearching = true;

            this.createSearchPromise(query).then((filteredLocations: Place[]) => {
                this.filteredPlaces = filteredLocations;
                this.isSearching = false;
            }, () => {
                this.filteredPlaces = [];
            });

        } else {
            this.isSearching = false;
            this.clearSelectedDestination();
            this.createSearchPromise(query).then((filteredLocations: Place[]) => {
                this.filteredPlaces = [];
            }, () => {
                this.filteredPlaces = [];
            });
        }
    }

    public createSearchPromise(query: string): ng.IPromise<Place[]> {

        if (this.searchPromis != null) {
            this.searchPromis.reject();
        }

        const deferred: ng.IDeferred<Place[]> = this.$q.defer();
        this.searchPromis = deferred;

        this.$timeout(() => {
            const filteredLocations = this.searchFormService.searchForLocation(query);
            deferred.resolve(filteredLocations);
        }, 1000, false);

        return this.searchPromis.promise;
    }

    public selectPlace(place: Place): void {
        if (this.focusedTextField === TextField.SOURCE) {
            this.selectedSource = place;
            this.sourceText = place.formattedAddress;
            this.mapService.flyToPoint(place.geometry);
        } else {
            this.selectedDestination = place;
            this.destinationText = place.formattedAddress;
            this.mapService.flyToPoint(place.geometry);
        }
    }

    public clearSelectedSource(): void {
        this.selectedSource = undefined;
        this.sourceText = "";
        this.filteredPlaces = [];
    }

    public clearSelectedDestination(): void {
        this.selectedDestination = undefined;
        this.destinationText = "";
        this.filteredPlaces = [];
    }

    public onSourceTextFieldFocus(): void {
        this.focusedTextField = TextField.SOURCE;
    }

    public onDestinationTextFieldFocus(): void {
        this.focusedTextField = TextField.DESTINATION;
    }

    public search(): void {
        this.searchFormService.search();
    }
}

export class SearchFormComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
            "textBinding": "@",
            "dataBinding": "<",
            "functionBinding": "&",
        };

        this.controller = SearchFormComponentController;
        this.templateUrl = "/src/modules/searchForm/templates/searchForm.template.html";
    }
}
