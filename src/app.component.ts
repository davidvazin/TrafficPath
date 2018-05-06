import { ThemeType } from "./common/enums/ThemeType";
import { IMapService } from "./modules/map/services/map.service";

interface IAppComponentController {
    selectedTheme: ThemeType;
    goToAboutView(): void;
    toggleSidenav(navId: string): void;
    changeTheme(themeId: ThemeType): void;
}

class AppComponentController implements IAppComponentController {

    public static $inject = ["$state", "$mdSidenav", "mapService"];

    // tslint:disable-next-line:no-empty
    constructor(
        public $state: ng.ui.IStateService,
        public $mdSidenav: ng.material.ISidenavService,
        private mapService: IMapService,
        public selectedTheme: ThemeType) {
        this.selectedTheme = ThemeType.LIGHT;
    }

    // tslint:disable-next-line:no-empty
    public goToAboutView(): void {
        this.$state.go("about");
    }

    public toggleSidenav(navId: string): void {
        this.$mdSidenav(navId).toggle();
    }

    public changeTheme(themeType: ThemeType): void {
        this.selectedTheme = themeType;
        this.mapService.changeMapTheme(this.selectedTheme);
    }
}

export class AppComponent implements ng.IComponentOptions {

    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
            "textBinding": "@",
            "dataBinding": "<",
            "functionBinding": "&",
        };

        this.controller = AppComponentController;
        this.templateUrl = "/src/app.template.html";
    }
}
