import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CapteursPage } from './capteurs.page';

describe('Tab3Page', () => {
  let component: CapteursPage;
  let fixture: ComponentFixture<CapteursPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CapteursPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CapteursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
