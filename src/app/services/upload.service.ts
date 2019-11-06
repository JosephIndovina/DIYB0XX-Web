import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  fileName: string;
  fileContents: any;

  constructor() { }

  upload(files: any) {
    const upload = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.fileContents = JSON.parse(reader.result as string);
      this.fileName = upload.name;
    };
    reader.readAsText(upload);
    return this.fileContents;
  }
}
