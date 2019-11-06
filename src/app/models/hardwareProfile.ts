import { IBoard } from './board';
import { IHardwareOption } from './hardwareOption';

export class IHardwareProfile {
    board: IBoard;
    hardwareOptions: IHardwareOption[];
    nativeInput: boolean;
    nunchuk: boolean;
    dpadSwitch: boolean;

    constructor(board: IBoard, hardwareOptions: IHardwareOption[]){
        this.board = board;
        this.hardwareOptions = hardwareOptions;
    }
}