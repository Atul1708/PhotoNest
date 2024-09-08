import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [DialogModule, CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.css',
})
export class ImageModalComponent {
  @Input() imageData!: any;

  visible: boolean = false;

  downloadOptions: any;

  imageDownloadUrl: string = '';

  singleImageData: any = {};

  constructor(private commonService: CommonService, private router: Router) {}
  showPopup(data: any) {
    this.visible = true;
    this.singleImageData = data;
    this.downloadOptions = Object.keys(data?.src);
  }

  selectDownloadOptions(option: string) {
    this.imageDownloadUrl = this.singleImageData?.src[option];
    this.onDownload(this.imageDownloadUrl);
  }
  closePopup() {
    this.visible = false;
    this.router.navigate([`home`]);
  }

  onDownload(imageUrl: string) {
    const selectedPhoto = imageUrl;

    if (selectedPhoto) {
      this.commonService
        .downloadFile(selectedPhoto)
        .then((blob: Blob) => {
          this.downloadFile(blob, `${this.imageData?.alt}.jpg`);
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      console.error('error');
    }
  }

  downloadFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
