interface ITextFieldComponentController {
    title: string;
    text: string;
    icon: string;
    onClearText: () => any;
    onTextChange: (query: string) => any;
    onFocus: () => any;
}

class TextFieldComponentController implements ITextFieldComponentController {
    public title: string;
    public text: string;
    public icon: string;
    public onTextChange: (query: string) => any;
    public onClearText: () => any;
    public onFocus: () => any;

    constructor() {
        this.text = "";
        this.title = "";
        this.icon = "";

        // tslint:disable-next-line:no-empty
        this.onTextChange = () => { };
        // tslint:disable-next-line:no-empty
        this.onClearText = () => { };
        // tslint:disable-next-line:no-empty
        this.onFocus = () => { };
    }
}

export class TextFieldComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
            "title": "@",
            "text": "=",
            "icon": "@",
            "onTextChange": "=",
            "onClearText": "=",
            "onFocus": "=",
        };

        this.controller = TextFieldComponentController;
        this.templateUrl = "/src/modules/textField/templates/textField.template.html";
    }
}
