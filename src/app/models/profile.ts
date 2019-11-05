import { IGameProfile } from './gameProfile';
import { IPins } from './pins';
import { ISOCDProfile } from './SOCDProfile';
import { IHardwareProfile } from './hardwareProfile';

export class IProfile {
    hardwareProfile: IHardwareProfile;
    pins: IPins;
    gameProfiles: IGameProfile[];
    socdProfile: ISOCDProfile;

    constructor(hardwareProfile: IHardwareProfile, pins: IPins, gameProfiles: IGameProfile[], socdProfile: ISOCDProfile) {
        this.hardwareProfile = hardwareProfile;
        this.pins = pins;
        this.gameProfiles = gameProfiles;
        this.socdProfile = socdProfile;
    }
}
