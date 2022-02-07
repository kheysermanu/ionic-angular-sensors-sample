import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx';
import { IonicModule } from '@ionic/angular';
import { CapteursRoutingModule } from './capteurs-routing.module';
import { CapteursPage } from './capteurs.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CapteursRoutingModule,
  ],
  declarations: [CapteursPage],
  providers:[DeviceMotion, Geolocation]
})
export class CapteursPageModule {}
