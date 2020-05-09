import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DietprogramComponent } from './dietprogram/dietprogram.component';


const routes: Routes = [
  { path: 'dietprogram', component:DietprogramComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DietprogramComponent]
