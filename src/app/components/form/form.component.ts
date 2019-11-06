import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IBoard } from 'src/app/models/board';
import { IButton } from 'src/app/models/button';
import { InoGeneratorService } from 'src/app/services/ino-generator.service';
import { DataService } from 'src/app/services/data.service';
import { ISOCDProfile } from 'src/app/models/SOCDProfile';
import { IGameProfile } from 'src/app/models/gameProfile';
import { GlobalConstants } from 'src/app/utils/global-constants';
import { IProfile } from 'src/app/models/profile';
import { IHardwareProfile } from 'src/app/models/hardwareProfile';
import { IPins } from 'src/app/models/pins';
import { IAngles } from 'src/app/models/angles';
import { DownloadService } from 'src/app/services/download.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  // Form Groups
  hardwareFormGroup: FormGroup;
  pinsFormGroup: FormGroup;
  anglesFormGroup: FormGroup;

  // Data Objects
  boards: IBoard[];
  buttons: IButton[];
  SOCDProfiles: ISOCDProfile[];
  gameProfiles: IGameProfile[];

  // Utility
  uploading = false;
  pinPattern = /^(a|d|A|D)?[0-9][0-9]?$/;

  constructor(private formBuilder: FormBuilder,
              private inoGeneratorService: InoGeneratorService,
              private dataService: DataService,
              private downloadService: DownloadService,
              private uploadService: UploadService) {
    this.dataService.getBoards().subscribe(data => { this.boards = data; });
    this.dataService.getButtons().subscribe(data => { this.buttons = data; });
    this.dataService.getSOCDProfiles().subscribe(data => { this.SOCDProfiles = data; });
    this.dataService.getGameProfiles().subscribe(data => { this.gameProfiles = data; });
  }

  ngOnInit() {
    this.hardwareFormGroup = this.formBuilder.group({
      board: ['', Validators.required],
      nativeInput: false,
      nunchuk: false,
      dpadSwitch: false
    });
    this.pinsFormGroup = this.formBuilder.group({
      gameProfiles: ['', Validators.required],
      SOCDProfile: ['', Validators.required],
    });
    this.anglesFormGroup = this.formBuilder.group({});
    this.createPinFormControls();

  }

  createPinFormControls() {
    const pinControlNames = GlobalConstants.PINS;
    for (const name of pinControlNames) {
      this.pinsFormGroup.addControl(name, new FormControl('', [Validators.pattern(this.pinPattern)]));
    }
  }

  createAngleFormControls() {
    const formControlNames = GlobalConstants.ANGLES;
    const selectedGames = this.pinsFormGroup.controls.gameProfiles.value;
    for (const game of selectedGames) {
      for (const name of formControlNames) {
        if (!this.anglesFormGroup.contains(name + game.id)) {
          this.anglesFormGroup.addControl(name + game.id,
            new FormControl(game[name], [Validators.required, Validators.min(0), Validators.max(128)]));
        }
      }
    }
  }

  public get profile(): IProfile {
    const hardwareProfile: IHardwareProfile = new IHardwareProfile(
      this.hardwareFormGroup.controls.board.value,
      this.hardwareFormGroup.controls.nativeInput.value,
      this.hardwareFormGroup.controls.nunchuk.value,
      this.hardwareFormGroup.controls.dpadSwitch.value
    );

    const pins: IPins = new IPins(
      this.pinsFormGroup.controls.gamecubeConsole.value,
      this.pinsFormGroup.controls.A.value,
      this.pinsFormGroup.controls.B.value,
      this.pinsFormGroup.controls.X.value,
      this.pinsFormGroup.controls.Y.value,
      this.pinsFormGroup.controls.Z.value,
      this.pinsFormGroup.controls.L.value,
      this.pinsFormGroup.controls.R.value,
      this.pinsFormGroup.controls.START.value,
      this.pinsFormGroup.controls.UP.value,
      this.pinsFormGroup.controls.LEFT.value,
      this.pinsFormGroup.controls.DOWN.value,
      this.pinsFormGroup.controls.RIGHT.value,
      this.pinsFormGroup.controls.MODX.value,
      this.pinsFormGroup.controls.MODY.value,
      this.pinsFormGroup.controls.CUP.value,
      this.pinsFormGroup.controls.CLEFT.value,
      this.pinsFormGroup.controls.CDOWN.value,
      this.pinsFormGroup.controls.CRIGHT.value
    );

    let gameProfiles: IGameProfile[] = [];
    for (const gameProfile of this.pinsFormGroup.controls.gameProfiles.value) {
      const angles: IAngles = new IAngles(
        // tslint:disable: no-string-literal
        this.anglesFormGroup.controls['modXHorizontal' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXVertical' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalY' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalCDownX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalCDownY' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalCLeftX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalCLeftY' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalCUpX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalCUpY' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalCRightX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modXDiagonalCRightY' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYHorizontal' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYVertical' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalY' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalCDownX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalCDownY' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalCLeftX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalCLeftY' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalCUpX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalCUpY' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalCRightX' + gameProfile.id].value,
        this.anglesFormGroup.controls['modYDiagonalCRightY' + gameProfile.id].value,
        this.anglesFormGroup.controls['lHorizontal' + gameProfile.id].value,
        this.anglesFormGroup.controls['lVertical' + gameProfile.id].value,
        this.anglesFormGroup.controls['lUpDiagonalX' + gameProfile.id].value,
        this.anglesFormGroup.controls['lUpDiagonalY' + gameProfile.id].value,
        this.anglesFormGroup.controls['lDownDiagonalX' + gameProfile.id].value,
        this.anglesFormGroup.controls['lDownDiagonalY' + gameProfile.id].value,
        this.anglesFormGroup.controls['rHorizontal' + gameProfile.id].value,
        this.anglesFormGroup.controls['rVertical' + gameProfile.id].value,
        this.anglesFormGroup.controls['rUpDiagonalX' + gameProfile.id].value,
        this.anglesFormGroup.controls['rUpDiagonalY' + gameProfile.id].value,
        this.anglesFormGroup.controls['rDownDiagonalX' + gameProfile.id].value,
        this.anglesFormGroup.controls['rDownDiagonalY' + gameProfile.id].value,
      );
      gameProfiles.push(new IGameProfile(gameProfile.id, gameProfile.text, angles));
    }

    const socdProfile: ISOCDProfile = new ISOCDProfile(
      this.pinsFormGroup.controls.SOCDProfile.value.id,
      this.pinsFormGroup.controls.SOCDProfile.value.text
    );

    return new IProfile(hardwareProfile, pins, gameProfiles, socdProfile);
  }

  public set profile(value: IProfile) {
    // TODO: Implement loading.
    this.hardwareFormGroup.controls.board.setValue(value.hardwareProfile.board.id);
    this.hardwareFormGroup.controls.nativeInput.setValue(value.hardwareProfile.nativeInput);
    this.hardwareFormGroup.controls.nunchuk.setValue(value.hardwareProfile.nunchuk);
    this.hardwareFormGroup.controls.dpadSwitch.setValue(value.hardwareProfile.dpadSwitch);

    this.pinsFormGroup.controls.gamecubeConsole.setValue(value.pins.gamecubeConsole);
    this.pinsFormGroup.controls.A.setValue(value.pins.A);
    this.pinsFormGroup.controls.B.setValue(value.pins.B);
    this.pinsFormGroup.controls.X.setValue(value.pins.X);
    this.pinsFormGroup.controls.Y.setValue(value.pins.Y);
    this.pinsFormGroup.controls.Z.setValue(value.pins.Z);
    this.pinsFormGroup.controls.L.setValue(value.pins.L);
    this.pinsFormGroup.controls.R.setValue(value.pins.R);
    this.pinsFormGroup.controls.START.setValue(value.pins.START);
    this.pinsFormGroup.controls.UP.setValue(value.pins.UP);
    this.pinsFormGroup.controls.LEFT.setValue(value.pins.LEFT);
    this.pinsFormGroup.controls.DOWN.setValue(value.pins.DOWN);
    this.pinsFormGroup.controls.RIGHT.setValue(value.pins.RIGHT);
    this.pinsFormGroup.controls.MODX.setValue(value.pins.MODX);
    this.pinsFormGroup.controls.MODY.setValue(value.pins.MODY);
    this.pinsFormGroup.controls.CUP.setValue(value.pins.CUP);
    this.pinsFormGroup.controls.CLEFT.setValue(value.pins.CLEFT);
    this.pinsFormGroup.controls.CDOWN.setValue(value.pins.CDOWN);
    this.pinsFormGroup.controls.CRIGHT.setValue(value.pins.CRIGHT);
  }

  downloadProfile() {
    this.downloadService.download(this.profile, 'DIYB0xx.bxx');
  }

  uploadProfile($event) {
    this.uploadService.upload($event.target.files).then((value) => {
      this.profile = value;
    });
  }
}
