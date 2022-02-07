import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapteursPage } from './capteurs.page';

const routes: Routes = [
  {
    path: '',
    component: CapteursPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapteursRoutingModule {}
