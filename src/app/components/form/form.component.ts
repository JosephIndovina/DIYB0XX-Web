import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IBoard } from 'src/app/models/board';
import { IButton } from 'src/app/models/button';
import { InoGeneratorService } from 'src/app/services/ino-generator.service';
import { DataService } from 'src/app/services/data.service';
import { ISOCDProfile } from 'src/app/models/SOCDProfile';
import { IGame } from 'src/app/models/game';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  generalFormGroup: FormGroup;
  pinsFormGroup: FormGroup;
  boards: IBoard[];
  buttons: IButton[];
  SOCDProfiles: ISOCDProfile[];
  games: IGame[];
  pinPattern = /^(a|d|A|D)?[0-9]*$/;

  constructor(private formBuilder: FormBuilder, private inoGeneratorService: InoGeneratorService, private dataService: DataService) {
    this.dataService.getBoards().subscribe(data => {
      this.boards = data;
    });

    this.dataService.getButtons().subscribe(data => {
      this.buttons = data;
    });

    this.dataService.getSOCDProfiles().subscribe(data => {
      this.SOCDProfiles = data;
    });

    this.dataService.getGames().subscribe(data => {
      this.games = data;
    });
  }

  ngOnInit() {
    this.generalFormGroup = this.formBuilder.group({
      board: ['', Validators.required],
      game: ['', Validators.required]
    });
    this.pinsFormGroup = this.formBuilder.group({
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
      MOD1: ['', Validators.pattern(this.pinPattern)],
      MOD2: ['', Validators.pattern(this.pinPattern)],
      CUP: ['', Validators.pattern(this.pinPattern)],
      CLEFT: ['', Validators.pattern(this.pinPattern)],
      CDOWN: ['', Validators.pattern(this.pinPattern)],
      CRIGHT: ['', Validators.pattern(this.pinPattern)]
    });
  }

}
