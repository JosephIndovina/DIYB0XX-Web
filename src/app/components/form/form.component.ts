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
import { IHardwareOption } from 'src/app/models/hardwareOption';

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
  hardwareOptions: IHardwareOption[];

  // Utility
  uploading = false;
  pinPattern = /^(a|d|A|D)?[0-9][0-9]?$/;

  constructor(private formBuilder: FormBuilder,
              private inoGeneratorService: InoGeneratorService,
              public dataService: DataService,
              public downloadService: DownloadService,
              public uploadService: UploadService) {
    this.dataService.getBoards().subscribe(data => { this.boards = data; });
    this.dataService.getButtons().subscribe(data => { this.buttons = data; });
    this.dataService.getSOCDProfiles().subscribe(data => { this.SOCDProfiles = data; });
    this.dataService.getGameProfiles().subscribe(data => { this.gameProfiles = data; });
    this.dataService.getHardwareOptions().subscribe(data => { this.hardwareOptions = data; });
  }

  ngOnInit() {
    this.hardwareFormGroup = this.formBuilder.group({
      board: ['', Validators.required],
      hardwareOptions: ['']
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

  createAngleFormControls(gameIds?) {
    Object.keys(this.anglesFormGroup.controls).forEach(key => {
      this.anglesFormGroup.removeControl(key);
    });
    const angles = GlobalConstants.ANGLES;
    const selectedGames = this.gameProfiles.filter(x => gameIds ?
      gameIds.includes(x.id) : this.pinsFormGroup.controls.gameProfiles.value.includes(x.id));
    for (const game of selectedGames) {
      for (const angle of angles) {
        if (!this.anglesFormGroup.contains(angle + game.id)) {
          this.anglesFormGroup.addControl(angle + game.id,
            new FormControl(game[angle], [Validators.required, Validators.min(0), Validators.max(128)]));
        }
      }
    }
  }

  public get profile(): IProfile {
    const hardwareProfile: IHardwareProfile = new IHardwareProfile(
      this.hardwareFormGroup.controls.board.value,
      this.hardwareFormGroup.controls.hardwareOptions.value
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
    for (const game of this.pinsFormGroup.controls.gameProfiles.value) {
      const angles: IAngles = new IAngles(
        // tslint:disable: no-string-literal
        this.anglesFormGroup.controls['modXHorizontal' + game].value,
        this.anglesFormGroup.controls['modXVertical' + game].value,
        this.anglesFormGroup.controls['modXDiagonalX' + game].value,
        this.anglesFormGroup.controls['modXDiagonalY' + game].value,
        this.anglesFormGroup.controls['modXDiagonalCDownX' + game].value,
        this.anglesFormGroup.controls['modXDiagonalCDownY' + game].value,
        this.anglesFormGroup.controls['modXDiagonalCLeftX' + game].value,
        this.anglesFormGroup.controls['modXDiagonalCLeftY' + game].value,
        this.anglesFormGroup.controls['modXDiagonalCUpX' + game].value,
        this.anglesFormGroup.controls['modXDiagonalCUpY' + game].value,
        this.anglesFormGroup.controls['modXDiagonalCRightX' + game].value,
        this.anglesFormGroup.controls['modXDiagonalCRightY' + game].value,
        this.anglesFormGroup.controls['modYHorizontal' + game].value,
        this.anglesFormGroup.controls['modYVertical' + game].value,
        this.anglesFormGroup.controls['modYDiagonalX' + game].value,
        this.anglesFormGroup.controls['modYDiagonalY' + game].value,
        this.anglesFormGroup.controls['modYDiagonalCDownX' + game].value,
        this.anglesFormGroup.controls['modYDiagonalCDownY' + game].value,
        this.anglesFormGroup.controls['modYDiagonalCLeftX' + game].value,
        this.anglesFormGroup.controls['modYDiagonalCLeftY' + game].value,
        this.anglesFormGroup.controls['modYDiagonalCUpX' + game].value,
        this.anglesFormGroup.controls['modYDiagonalCUpY' + game].value,
        this.anglesFormGroup.controls['modYDiagonalCRightX' + game].value,
        this.anglesFormGroup.controls['modYDiagonalCRightY' + game].value,
        this.anglesFormGroup.controls['lHorizontal' + game].value,
        this.anglesFormGroup.controls['lVertical' + game].value,
        this.anglesFormGroup.controls['lUpDiagonalX' + game].value,
        this.anglesFormGroup.controls['lUpDiagonalY' + game].value,
        this.anglesFormGroup.controls['lDownDiagonalX' + game].value,
        this.anglesFormGroup.controls['lDownDiagonalY' + game].value,
        this.anglesFormGroup.controls['rHorizontal' + game].value,
        this.anglesFormGroup.controls['rVertical' + game].value,
        this.anglesFormGroup.controls['rUpDiagonalX' + game].value,
        this.anglesFormGroup.controls['rUpDiagonalY' + game].value,
        this.anglesFormGroup.controls['rDownDiagonalX' + game].value,
        this.anglesFormGroup.controls['rDownDiagonalY' + game].value,
      );
      gameProfiles.push(new IGameProfile(game, this.getGameText(game), angles));
    }

    const socd = this.SOCDProfiles.find(x => x.id === this.pinsFormGroup.controls.SOCDProfile.value);
    const socdProfile: ISOCDProfile = new ISOCDProfile(socd.id, socd.text);

    return new IProfile(hardwareProfile, pins, gameProfiles, socdProfile);
  }

  public set profile(value: IProfile) {
    // Hardware
    this.hardwareFormGroup.controls.board.setValue(value.hardwareProfile.board);
    this.hardwareFormGroup.controls.hardwareOptions.setValue(value.hardwareProfile.hardwareOptions);

    // Pins
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

    // Game and SOCD
    const selectedGames = value.gameProfiles.map(x => x.id);
    this.createAngleFormControls(selectedGames);
    this.pinsFormGroup.controls.gameProfiles.setValue(selectedGames);
    this.pinsFormGroup.controls.SOCDProfile.setValue(value.socdProfile.id);

    // Angles
    const angles = GlobalConstants.ANGLES;
    for (const game of selectedGames) {
      for (const angle of angles) {
        this.anglesFormGroup.controls[angle + game].setValue(value.gameProfiles.find(x => x.id === game).angles[angle]);
      }
    }
  }

  getGameText(id: string) {
    return this.gameProfiles.find(x => x.id === id).text;
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
