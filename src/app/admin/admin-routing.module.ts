import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { ProfileComponent} from '../profile/profile.component';
const routes: Routes = [
  {
      path: 'Admin-menu',
      component: MenuBarComponent,
      children: [
        {
          path: 'profile',
          children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'profile', component: ProfileComponent },
          ]
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
