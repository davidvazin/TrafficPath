import { AppComponent } from "./app.component";
import { LoginComponent } from "./modules/login/components/login.component";
import { MapComponent } from "./modules/map/components/map.component";
import { MapService } from "./modules/map/services/map.service";
import { SearchFormComponent } from "./modules/searchForm/components/searchForm.component";
import { SearchFormService } from "./modules/searchForm/services/searchForm.service";
import { TemplateDivisionComponent } from "./modules/templateDivision/components/teamplateDivision.component";
const angular = require("angular");
const route = require("angular-ui-router");
require("angular-material");
import "angular-material/angular-material.css";
import "../design/styles/style.less";
import { routesStates } from "./app.routes";
import { AboutComponent } from "./modules/about/components/about.component";
import { TextFieldComponent } from "./modules/textField/components/textField.component";

export let app = angular.module("trafficPathApp", ["ui.router", "ngMaterial"]);

// Services
app.service("searchFormService", SearchFormService);
app.service("mapService", MapService);

// Controllers
// app.controller("ProductListCtrl", ProductListCtrl);

// Components
app.component("trafficPath", new AppComponent());
app.component("templateDivision", new TemplateDivisionComponent());
app.component("about", new AboutComponent());
app.component("map", new MapComponent());
app.component("searchForm", new SearchFormComponent());
app.component("textField", new TextFieldComponent());
app.component("login", new LoginComponent());

// Config
app.config(appConfig);

appConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider",
    "$mdIconProvider", "$mdThemingProvider"];

function appConfig(
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $locationProvider: ng.ILocationProvider,
    $mdIconProvider: ng.material.IIconProvider,
    $mdThemingProvider: ng.material.IThemingProvider): void {

    // Adds the routes states
    angular.forEach(routesStates, (state: ng.ui.IState) => {
        $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise("/");
    // Enable html5Mode - fix the url path including '#'
    $locationProvider.html5Mode(true).hashPrefix("!");

    // Theming
    $mdThemingProvider.theme("LIGHT")
        .primaryPalette("grey", {
            "default": "900",
        })
        .accentPalette("grey", {
            "default": "700",
        });

    $mdThemingProvider.theme("DARK").dark()
        .primaryPalette("orange", {
            "default": "900",
        })
        .accentPalette("grey", {
            "default": "700",
        });

    $mdThemingProvider.setDefaultTheme("LIGHT");
    $mdThemingProvider.alwaysWatchTheme(true);

    // Icons set
    $mdIconProvider.iconSet("social", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg");
    $mdIconProvider.iconSet("alert", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-alert.svg");
    $mdIconProvider.iconSet("action", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg");
    $mdIconProvider.iconSet("av", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-av");
    $mdIconProvider.iconSet("device", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-device.svg");
    $mdIconProvider.iconSet("editor", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg");
    $mdIconProvider.iconSet("file", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-file.svg");
    $mdIconProvider.iconSet("image", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
    $mdIconProvider.iconSet("maps", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-maps.svg");
    $mdIconProvider.iconSet("places", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-places.svg");
    $mdIconProvider.iconSet("toggle", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg");
    $mdIconProvider.iconSet("hardware",
        "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-hardware.svg");
    $mdIconProvider.iconSet("navigation",
        "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg");
    $mdIconProvider.iconSet("content",
        "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg");
    $mdIconProvider.iconSet("communication",
        "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg");
}
