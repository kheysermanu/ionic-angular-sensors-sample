import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
  constructor(readonly platform: Platform) {}
  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }
}
