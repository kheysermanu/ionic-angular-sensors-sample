import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { MyPhoto } from '../model/photo.model';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss']
})
export class GalleryPage implements ViewWillEnter {
  photos: MyPhoto[] = [];

  constructor(readonly photoService: PhotoService, readonly route: ActivatedRoute) { }

  async ionViewWillEnter() {
    if (this.photos.length > 0) {
      const firstPhoto: MyPhoto = await this.photoService.getFirstPhotosFromStorage();
      if (!this.photos.find(value => value.filepath === firstPhoto.filepath)) {
        this.photos.unshift(await this.photoService.loadOnlyFirstPhoto(firstPhoto));
      }
    } else {
      this.photos = await this.photoService.loadSavedPhotos();
    }
  }
}
