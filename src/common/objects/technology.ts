interface ITechnology {
    name: string;
    iconUrl: string;
    iconWidth?: number;
    description: string;
}

export class Technology implements ITechnology {

    constructor(
        public name: string,
        public iconUrl: string,
        public description: string,
        public iconWidth?: number) {
    }
}
