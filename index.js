"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.less");
const angular = require("angular");
class Pickle {
    constructor(picker, background) {
        this.picker = picker;
        this.background = background;
        picker.addEventListener("change", this.colorChange.bind(this), false);
        this.background = background;
    }
    colorChange(event) {
        // `<HTMLInputElement>` tells TypeScript what type `target` is
        // so that it knows there is a `value` property available.
        const input = event.target;
        this.background.style.backgroundColor = input.value;
    }
}
const picker1 = document.querySelector("#color-picker");
const textInput = document.querySelector("#textInput");
textInput.value = "Hey2222yyyy";
// the if avoids TypeScript complaining that `picker` might be null.
if (picker1) {
    const x = new Pickle(picker1, document.body);
}
angular.module("aaa", []);
