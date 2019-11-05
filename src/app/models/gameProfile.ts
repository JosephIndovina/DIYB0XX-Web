import { IAngles } from './angles';

export class IGameProfile {
    id: string;
    text: string;
    angles: IAngles;

    constructor(id: string, text: string, angles: IAngles) {
        this.id = id;
        this.text = text;
        this.angles = angles;
    }
}
