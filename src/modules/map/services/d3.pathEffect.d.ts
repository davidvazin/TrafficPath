declare module MPathEffect {
    export interface Main {
        execute(map: any): any;
    }
}

declare var pathEffect: MPathEffect.Main;