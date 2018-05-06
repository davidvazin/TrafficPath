import { MapService } from "./../../map/services/map.service";

// tslint:disable-next-line:no-empty-interface
interface ITemplateDivisionComponentController {
}

class TemplateDivisionComponentController implements ITemplateDivisionComponentController {

    public static $inject = ["mapService"];

    // tslint:disable-next-line:no-empty
    constructor(private mapService: MapService) {
    }
}

export class TemplateDivisionComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
            "textBinding": "@",
            "dataBinding": "<",
            "functionBinding": "&",
        };

        this.controller = TemplateDivisionComponentController;
        this.templateUrl = "/src/modules/templateDivision/templates/templateDivision.template.html";
    }
}
