import { Component } from '@angular/core';
import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx';
import { Geolocation, Geoposition, PositionError } from '@awesome-cordova-plugins/geolocation/ngx';
import { Gyroscope, GyroscopeOptions, GyroscopeOrientation } from '@ionic-native/gyroscope';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ICapteur } from '../model/capteur.model';

enum TypeSensor {
  ACCELEROMETRE,
  GEOLOCATION,
  GYROSCOPE
}
const GYRO_OPTIONS: GyroscopeOptions = {
  frequency: 1000
};

@Component({
  selector: 'app-capteurs',
  templateUrl: 'capteurs.page.html',
  styleUrls: ['capteurs.page.scss']
})
export class CapteursPage implements ViewWillEnter, ViewWillLeave {

  typeCapteur = TypeSensor;
  mesures: ICapteur[] = [];
  status = [false, false, false, false];
  refTime: any;
  now: number;
  accelerometreSub: Subscription;
  geolocationSub: Subscription;
  gyroscopeSub: Subscription;
  readonly gyroscope = Gyroscope;

  constructor(readonly deviceMotion: DeviceMotion, readonly geolocation: Geolocation) {

  }
  ionViewWillLeave(): void {
    clearInterval(this.refTime);
    this.refTime = null;
  }
  ionViewWillEnter(): void {
    this.refTime = setInterval(() => {
      this.now = new Date().getTime();
    }, 1);
  }

  async capteurChange(type: TypeSensor) {
    if (this.status[type]) {
      this.status = this.status.map((value, index) => value = index != type ? false : value);
      this.activerCapteur(type);
    } else {
      this.desactiverCapteur(type);
    }
  }

  private activerCapteur(type: TypeSensor) {
    switch (type) {
      case TypeSensor.ACCELEROMETRE:
        this.accelerometreSub = this.deviceMotion
          .watchAcceleration()
          .subscribe(value => {
            this.mesures.push({ nom: 'x', valeur: value.x });
            this.mesures.push({ nom: 'y', valeur: value.y });
            this.mesures.push({ nom: 'z', valeur: value.z });
            this.mesures.push({ nom: 't', valeur: value.timestamp });
          });
        break;
      case TypeSensor.GEOLOCATION:
        this.geolocationSub = this.geolocation
          .watchPosition()
          .subscribe(value => {
            if (value['coords']) {
              const position = value as Geoposition;
              this.mesures.push({ nom: 'latitude', valeur: position.coords.latitude });
              this.mesures.push({ nom: 'longitude', valeur: position.coords.longitude });
              this.mesures.push({ nom: 'timestamp', valeur: position.timestamp });
            } else {
              const positionError = value as PositionError;
              this.mesures.push({ nom: 'code', valeur: positionError.code });
              this.mesures.push({ nom: 'message', valeur: positionError.message });
              this.mesures.push({ nom: 'timestamp', valeur: Date.now() });
            }
          });
        break;
      case TypeSensor.GYROSCOPE:
        this.gyroscopeSub = this.gyroscope.watch()
          .subscribe((orientation: GyroscopeOrientation) => {
            this.mesures.push({ nom: 'x', valeur: orientation.x });
            this.mesures.push({ nom: 'y', valeur: orientation.y });
            this.mesures.push({ nom: 'z', valeur: orientation.z });
            this.mesures.push({ nom: 't', valeur: orientation.timestamp });
          });
        break;
      default:
        console.log('non implémenté.');
    }
  }

  private desactiverCapteur(type: TypeSensor) {
    switch (type) {
      case TypeSensor.ACCELEROMETRE:
        this.accelerometreSub.unsubscribe();
        this.accelerometreSub = null;
        break;
      case TypeSensor.GEOLOCATION:
        this.geolocationSub.unsubscribe();
        this.geolocationSub = null;
        break;
      case TypeSensor.GYROSCOPE:
        this.gyroscopeSub.unsubscribe();
        this.gyroscopeSub = null;
      default:
        console.log('non implémenté.');
    }
    this.mesures = [];
  }

  clear() {
    this.mesures = [];
  }

  get capteurActif(): TypeSensor {
    return TypeSensor[TypeSensor[this.status.findIndex(value => value)]];
  }
}
