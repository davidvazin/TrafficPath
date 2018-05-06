import { Technology } from "../../../common/objects/technology";

interface IAboutComponentController {
    technologiesLst: Technology[];
    someFunction(): void;
}

class AboutComponentController implements IAboutComponentController {

    public technologiesLst: Technology[] = [
        {
            "name": "nodejs",
            "iconUrl": "/design/images/about/nodejs-logo.png",
            "description": "",
            "iconWidth": 200,
        },
        {
            "name": "angular",
            "iconUrl": "/design/images/about/angular-logo.png",
            "description": "",
            "iconWidth": 150,
        },
        {
            "name": "angular-material",
            "iconUrl": "/design/images/about/angular-material-logo.png",
            "description": "",
            "iconWidth": 150,
        },
        {
            "name": "css",
            "iconUrl": "/design/images/about/css-logo.png",
            "description": "",
            "iconWidth": 110,
        },
        {
            "name": "html",
            "iconUrl": "/design/images/about/html-logo.png",
            "description": "",
            "iconWidth": 150,
        },
        {
            "name": "js",
            "iconUrl": "/design/images/about/js-logo.png",
            "description": "",
            "iconWidth": 110,
        },
        {
            "name": "d3",
            "iconUrl": "/design/images/about/d3-logo.png",
            "description": "",
            "iconWidth": 130,
        },
        {
            "name": "eslint",
            "iconUrl": "/design/images/about/eslint-logo.png",
            "description": "",
            "iconWidth": 250,
        },
        {
            "name": "git",
            "iconUrl": "/design/images/about/git-logo.png",
            "description": "",
            "iconWidth": 200,
        },
        {
            "name": "jQuery",
            "iconUrl": "/design/images/about/jQuery-logo.png",
            "description": "",
            "iconWidth": 200,
        },
        {
            "name": "webpack",
            "iconUrl": "/design/images/about/webpack-logo.png",
            "description": "",
            "iconWidth": 250,
        },
        {
            "name": "less",
            "iconUrl": "/design/images/about/less-logo.png",
            "description": "",
            "iconWidth": 170,
        },
        {
            "name": "npm",
            "iconUrl": "/design/images/about/npm-logo.png",
            "description": "",
            "iconWidth": 200,
        },
        {
            "name": "responsive-design",
            "iconUrl": "/design/images/about/responsive-design-logo.png",
            "description": "",
            "iconWidth": 200,
        },
        {
            "name": "tslint",
            "iconUrl": "/design/images/about/tslint-logo.png",
            "description": "",
            "iconWidth": 150,
        },
        {
            "name": "typescript",
            "iconUrl": "/design/images/about/typescript-logo.png",
            "description": "",
            "iconWidth": 250,
        },
        {
            "name": "vs-code",
            "iconUrl": "/design/images/about/vs-code-logo.png",
            "description": "",
            "iconWidth": 130,
        },
    ];

    // tslint:disable-next-line:no-empty
    constructor() {
    }

    // tslint:disable-next-line:no-empty
    public someFunction(): void {
    }
}

export class AboutComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
            "textBinding": "@",
            "dataBinding": "<",
            "functionBinding": "&",
        };

        this.controller = AboutComponentController;
        this.templateUrl = "/src/modules/about/templates/about.template.html";
    }
}
