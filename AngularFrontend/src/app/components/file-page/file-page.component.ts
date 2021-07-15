import { Component, OnInit, DoCheck } from '@angular/core';

import { FileExchangeService } from 'src/app/services/file-exchange.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-page',
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.css']
})
export class FilePageComponent implements OnInit {

  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  flagFiles: any;

  constructor(private fileService: FileExchangeService, private toastr: ToastrService) { }

  ngOnInit(): void {
   this.fileInfos = this.fileService.getFiles();
  }


   ngDoCheck(){
    if (this.fileInfos) {
      this.flagFiles = true;
    } else {
      this.flagFiles = false;
    }
    console.log(this.flagFiles);
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files[0];
  }


  upload(): void {
    this.progress = 0;

    const file = this.currentFile;

      if (file) {

        this.fileService.upload(file).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.fileService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

          });
        }
    }


  mostRecentFile():void{
    this.fileService.getMostRecentFile('/downloads/').subscribe(blob => saveAs(blob, "mostRecentUpload"), err => {
      this.toastr.error('No files are uploaded yet!');
    },)
  }


}
