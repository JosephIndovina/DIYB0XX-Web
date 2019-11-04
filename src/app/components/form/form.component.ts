import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IBoard } from 'src/app/models/board';
import { IButton } from 'src/app/models/button';
import { InoGeneratorService } from 'src/app/services/ino-generator.service';
import { DataService } from 'src/app/services/data.service';
import { ISOCDProfile } from 'src/app/models/SOCDProfile';
import { IGameProfile } from 'src/app/models/gameProfile';

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
  pinPattern = /^(a|d|A|D)?[0-9]*$/;

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
      gamecubeConsole: ['', Validators.pattern(this.pinPattern)],
      A: ['', Validators.pattern(this.pinPattern)],
      B: ['', Validators.pattern(this.pinPattern)],
      X: ['', Validators.pattern(this.pinPattern)],
      Y: ['', Validators.pattern(this.pinPattern)],
      Z: ['', Validators.pattern(this.pinPattern)],
      L: ['', Validators.pattern(this.pinPattern)],
      R: ['', Validators.pattern(this.pinPattern)],
      START: ['', Validators.pattern(this.pinPattern)],
      UP: ['', Validators.pattern(this.pinPattern)],
      LEFT: ['', Validators.pattern(this.pinPattern)],
      DOWN: ['', Validators.pattern(this.pinPattern)],
      RIGHT: ['', Validators.pattern(this.pinPattern)],
      MODX: ['', Validators.pattern(this.pinPattern)],
      MODY: ['', Validators.pattern(this.pinPattern)],
      CUP: ['', Validators.pattern(this.pinPattern)],
      CLEFT: ['', Validators.pattern(this.pinPattern)],
      CDOWN: ['', Validators.pattern(this.pinPattern)],
      CRIGHT: ['', Validators.pattern(this.pinPattern)]
    });
    this.anglesFormGroup = this.formBuilder.group({
      modXHorizontal: ['', Validators.required],
      modXVertical: ['', Validators.required],
      modXDiagonal: ['', Validators.required],
      modXDiagonalCDown: ['', Validators.required],
      modXDiagonalCLeft: ['', Validators.required],
      modXDiagonalCUp: ['', Validators.required],
      modXDiagonalCRight: ['', Validators.required],
      modYHorizontal: ['', Validators.required],
      modYVertical: ['', Validators.required],
      modYDiagonal: ['', Validators.required],
      modYDiagonalCDown: ['', Validators.required],
      modYDiagonalCLeft: ['', Validators.required],
      modYDiagonalCUp: ['', Validators.required],
      modYDiagonalCRight: ['', Validators.required],
      lHorizontal: ['', Validators.required],
      lVertical: ['', Validators.required],
      lUpDiagonal: ['', Validators.required],
      lDownDiagonal: ['', Validators.required],
      rHorizontal: ['', Validators.required],
      rVertical: ['', Validators.required],
      rUpDiagonal: ['', Validators.required],
      rDownDiagonal: ['', Validators.required],
    });
  }
}
