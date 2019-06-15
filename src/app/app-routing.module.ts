import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

const routes: Routes = [
  {path:'',redirectTo:'/Menu',pathMatch:'full'},
  {path:'events',component:EventsComponent},
  {path:'special',component:SpecialEventsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: 'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path: 'Menu',component:MenuBarComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
