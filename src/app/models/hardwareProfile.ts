import { IBoard } from './board';

export class IHardwareProfile {
    board: IBoard;
    nativeInput: boolean;
    nunchuk: boolean;
    dpadSwitch: boolean;

    constructor(board: IBoard, nativeInput: boolean, nunchuk: boolean, dpadSwitch: boolean){
        this.board = board;
        this.nativeInput = nativeInput;
        this.nunchuk = nunchuk;
        this.dpadSwitch = dpadSwitch;
    }
}