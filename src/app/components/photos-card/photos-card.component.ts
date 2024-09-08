import { CommonService } from './../../services/common.service';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photos-card',
  standalone: true,
  imports: [CommonModule, ImageModalComponent, MessagesModule],
  templateUrl: './photos-card.component.html',
  styleUrl: './photos-card.component.css',
  providers: [MessageService],
})
export class PhotosCardComponent {
  @ViewChild('likeButton', { static: false }) likeButton!: ElementRef;
  @ViewChild('ImagePopup') ImagePopup!: any;

  @Input() photosData: any;

  modalImagesData: any;

  show: boolean = false;

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    private router: Router
  ) {}
  onLikeClick(item: any) {
    item.liked = !item?.liked;
  }

  openModal(item: any) {
    this.modalImagesData = item;
    this.ImagePopup.showPopup(item);
    this.router.navigate([`home/${item.id}`]);
    this.show = true;
  }

  onDownload(id: number, event: MouseEvent) {
    event.stopPropagation();
    const selectedPhoto = this.photosData.find((data: any) => data.id === id);

    if (selectedPhoto) {
      this.commonService
        .downloadFile(selectedPhoto?.src?.large2x)
        .then((blob: Blob) => {
          this.downloadFile(blob, `${selectedPhoto?.alt}.jpg`);
          this.successMessage();
        })
        .catch((error: any) => {
          this.errorMessage();
        });
    } else {
      this.errorMessage();
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

  successMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }
  errorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }
}
