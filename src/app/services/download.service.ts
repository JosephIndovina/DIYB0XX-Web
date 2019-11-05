import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor() { }

  download(file: any, name: string) {
    const json = JSON.stringify(file);
    const blob = new Blob([json], {type: 'application/json'});
    saveAs(blob, name);
  }
}
