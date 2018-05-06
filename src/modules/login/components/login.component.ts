interface ILoginComponentController {
    username: string;
    password: string;
    goToApp(): void;
}

class LoginController implements ILoginComponentController {

    public static $inject = ["$state"];

    public username: string;
    public password: string;

    constructor(private $state: ng.ui.IStateService) {
        this.username = "";
        this.password = "";
    }

    public goToApp(): void {
        this.$state.go("templateDivision");
    }
}

export class LoginComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {};
        this.controller = LoginController;
        this.templateUrl = "/src/modules/login/templates/login.template.html";
    }
}
