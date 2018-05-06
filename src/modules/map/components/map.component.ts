import L = require("leaflet");
import { ThemeType } from "./../../../common/enums/ThemeType";
import { MapService } from "./../services/map.service";

// tslint:disable-next-line:no-empty-interface
interface IMapComponentController {

}

class MapComponentController implements IMapComponentController {

    public static $inject = ["mapService"];

    // tslint:disable-next-line:no-empty
    constructor(private mapService: MapService) {
        this.mapService.init();
    }
}

export class MapComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
            "textBinding": "@",
            "dataBinding": "<",
            "functionBinding": "&",
        };

        this.controller = MapComponentController;
        this.templateUrl = "/src/modules/map/templates/map.template.html";
    }
}
