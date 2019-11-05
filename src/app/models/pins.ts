import { IButton } from './button';

export class IPins {
    gamecubeConsole: string;
    A: string;
    B: string;
    X: string;
    Y: string;
    Z: string;
    L: string;
    R: string;
    START: string;
    UP: string;
    LEFT: string;
    DOWN: string;
    RIGHT: string;
    MODX: string;
    MODY: string;
    CUP: string;
    CLEFT: string;
    CDOWN: string;
    CRIGHT: string;

    constructor(gamecubeConsole: string,
                A: string,
                B: string,
                X: string,
                Y: string,
                Z: string,
                L: string,
                R: string,
                START: string,
                UP: string,
                LEFT: string,
                DOWN: string,
                RIGHT: string,
                MODX: string,
                MODY: string,
                CUP: string,
                CLEFT: string,
                CDOWN: string,
                CRIGHT: string) {
        this.gamecubeConsole = gamecubeConsole;
        this.A = A;
        this.B = B;
        this.X = X;
        this.Y = Y;
        this.Z = Z;
        this.L = L;
        this.R = R;
        this.START = START;
        this.UP = UP;
        this.LEFT = LEFT;
        this.DOWN = DOWN;
        this.RIGHT = RIGHT;
        this.MODX = MODX;
        this.MODY = MODY;
        this.CUP = CUP;
        this.CLEFT = CLEFT;
        this.CDOWN = CDOWN;
        this.CRIGHT = CRIGHT;
    }
}