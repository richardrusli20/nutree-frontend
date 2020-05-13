import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DietprogramComponent } from './dietprogram/dietprogram.component';
import { RegisterComponent } from './register/register.component';
import { DietprogramDetailComponent } from './dietprogram-detail/dietprogram-detail.component';


const routes: Routes = [
  { path: 'dietprogram', component:DietprogramComponent },
  { path: 'dietprogram/:id', component:DietprogramDetailComponent },
  { path: 'register', component:RegisterComponent },
  { path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DietprogramComponent,DietprogramDetailComponent,RegisterComponent]
