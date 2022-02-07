import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.page.html',
  styleUrls: ['camera.page.scss']
})
export class CameraPage implements ViewWillEnter {

  constructor(readonly photoService: PhotoService,
    readonly router: Router) { }

  ionViewWillEnter(): void {
    this.takePhoto();
  }

  public takePhoto() {
    this.photoService.takePhoto()
      .catch(reason => console.log('fermeture de l\'apareil photo'))
      .then(
        capturedPhoto => this.photoService.savePhoto(capturedPhoto)
          .then(
            _ => this.router.navigate(['/tabs/gallery'])
          )
      );

  }
}
