import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CameraPage } from './camera.page';

import { CameraPageRoutingModule } from './camera-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CameraPageRoutingModule
  ],
  declarations: [CameraPage]
})
export class CameraPageModule {}
