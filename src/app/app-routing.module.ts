import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AdminGuardGuard } from './admin-guard.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TrainingStaffGuard } from './training-staff.guard';
import { ViewProgramComponent } from './view-program/view-program.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'special', component: SpecialEventsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  {
    path: 'Training-staff',
    component: MenuBarComponent,
    canActivate:[TrainingStaffGuard],
    children: [
     
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'view-program',
        component: ViewProgramComponent
      }]
  },

  { path: '**', component: ErrorPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
