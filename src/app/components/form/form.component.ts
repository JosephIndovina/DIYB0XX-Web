import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IBoard } from 'src/app/models/board';
import { IButton } from 'src/app/models/button';
import { InoGeneratorService } from 'src/app/services/ino-generator.service';
import { DataService } from 'src/app/services/data.service';
import { ISOCDProfile } from 'src/app/models/SOCDProfile';
import { IGameProfile } from 'src/app/models/gameProfile';
import { GlobalConstants } from 'src/app/utils/global-constants';

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
  pinPattern = /^(a|d|A|D)?[0-9][0-9]?$/;

  constructor(private formBuilder: FormBuilder, private inoGeneratorService: InoGeneratorService, private dataService: DataService) {
    this.dataService.getBoards().subscribe(data => { this.boards = data; });
    this.dataService.getButtons().subscribe(data => { this.buttons = data; });
    this.dataService.getSOCDProfiles().subscribe(data => { this.SOCDProfiles = data; });
    this.dataService.getGameProfiles().subscribe(data => { this.gameProfiles = data; });
  }

  ngOnInit() {
    this.hardwareFormGroup = this.formBuilder.group({
      board: ['', Validators.required],
      nativeInput: [''],
      nunchuk: [''],
      dpadSwitch: ['']
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
}
