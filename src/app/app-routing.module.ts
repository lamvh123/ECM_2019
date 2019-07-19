import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EventsComponent} from './events/events.component';
import {SpecialEventsComponent} from './special-events/special-events.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth.guard';
import {MenuBarComponent} from './menu-bar/menu-bar.component';
import {AdminGuardGuard} from './admin-guard.guard';
import {ErrorPageComponent} from './error-page/error-page.component';
import {TrainingStaffGuard} from './training-staff.guard';
import {ViewProgramComponent} from './view-program/view-program.component';
import {AddProgramComponent} from './add-program/add-program.component';
import {ViewCourseComponent} from './view-course/view-course.component';
import {AddCourseComponent} from './add-course/add-course.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {ProgramDetailComponent} from './program-detail/program-detail.component';
import {ViewSyllabusComponent} from './view-syllabus/view-syllabus.component';
import {AddBuildingComponent} from './add-building/add-building.component';
import {ViewBuildingComponent} from './view-building/view-building.component';
import {ViewRoomComponent} from './view-room/view-room.component';
import {AddRoomComponent} from './add-room/add-room.component';
import {AdmissionStaffMenubarComponent} from './admission-staff-menubar/admission-staff-menubar.component';
import {AdmissionStaffGuard} from './admission-staff.guard';

import { ViewAdmissionFormComponent } from './view-admission-form/view-admission-form.component';
import { ViewAdmissionFormDetailComponent } from './view-admission-form-detail/view-admission-form-detail.component';
import { ViewSlotComponent } from './view-slot/view-slot.component';
import { AddSlotComponent } from './add-slot/add-slot.component';
import { AddNewFormComponent } from './add-new-form/add-new-form.component';
import { RedirectComponent } from './redirect/redirect.component';
import {ViewSubjectsComponent} from './view-subjects/view-subjects.component';
import {AddSubjectComponent} from './add-subject/add-subject.component';





const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'events', component: EventsComponent},
  {path: 'special', component: SpecialEventsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'redirect/:url/:param',component:RedirectComponent},
  {
    path: 'Admission-staff',
    component: AdmissionStaffMenubarComponent,
    canActivate: [AdmissionStaffGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'admissionform',
        component: ViewAdmissionFormComponent
      },
      {
        path:'form-detail/:id',
        component:ViewAdmissionFormDetailComponent
      },
      {
        path:'addForm',
        component:AddNewFormComponent
      }
    ]
  },
  {
    path: 'Training-staff',
    component: MenuBarComponent,
    canActivate: [TrainingStaffGuard],
    children: [

      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'view-program',
        component: ViewProgramComponent
      },
      {
        path: 'add-program',
        component: AddProgramComponent
      },
      {
        path: 'program-detail/:id',
        component: ProgramDetailComponent
      },
      {
        path: 'view-course/:id',
        component: ViewCourseComponent
      },
      {
        path: 'add-course/:id',
        component: AddCourseComponent
      },
      {
        path: 'course-detail/:id',
        component: CourseDetailComponent
      },
      {
        path: 'syllabus/:id',
        component: ViewSyllabusComponent
      },
      {
        path: 'view-building',
        component: ViewBuildingComponent
      },
      {
        path: 'add-building',
        component: AddBuildingComponent
      },
      {
        path: 'view-room',
        component: ViewRoomComponent
      },
      {
        path: 'add-room',
        component: AddRoomComponent
      },
      {
        path: 'view-slot',
        component: ViewSlotComponent
      },
      {
        path: 'add-slot',
        component: AddSlotComponent
      },
      {
        path: 'view-subject',
        component: ViewSubjectsComponent
      },
      {
        path: 'add-subject',
        component: AddSubjectComponent
      },
      // {
      //   path: 'course-detail/:id',
      //   component: CourseDetailComponent
      // }
    ]
  },

  {path: '**', component: ErrorPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
