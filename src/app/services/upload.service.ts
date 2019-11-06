import { Injectable } from '@angular/core';
import { IProfile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  fileName: string;
  fileContents: any;
  fileUploading = false;

  constructor() { }

  async upload(files: any) {
    this.fileUploading = true;
    const upload = files[0];
    const reader = new FileReader();

    return new Promise<any>((resolve, reject) => {
      reader.onload = () => {
        this.fileContents = JSON.parse(reader.result as string);
        this.fileName = upload.name;
        this.fileUploading = false;
        resolve(this.fileContents);
      };
      reader.readAsText(upload);
    });
  }
}
