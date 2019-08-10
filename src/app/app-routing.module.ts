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
import { ViewSubjectsComponent } from './view-subjects/view-subjects.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountingMenuBarComponent } from './accounting-menu-bar/accounting-menu-bar.component';
import { AccountStaffGuard } from './account-staff.guard';
import { AccountStaffConfirmStudentComponent } from './account-staff-confirm-student/account-staff-confirm-student.component';
import { CenterAdminMenubarComponent } from './center-admin-menubar/center-admin-menubar.component';
import { CenterAdminGrantAccountComponent } from './center-admin-grant-account/center-admin-grant-account.component';
import { CenterAdminGuard } from './center-admin.guard';
import { AutoGenerateClassComponent } from './auto-generate-class/auto-generate-class.component';
import { AutoGenerateTimetableComponent } from './auto-generate-timetable/auto-generate-timetable.component';
import { ListOfClassComponent } from './list-of-class/list-of-class.component';
import { ListStudentOfClassComponent } from './list-student-of-class/list-student-of-class.component';
import { OfficalStudentMenuBarComponent } from './offical-student-menu-bar/offical-student-menu-bar.component';
import { StudentGuard } from './student.guard';
import { ViewTimetableComponent } from './view-timetable/view-timetable.component';
import { TeacherMenuBarComponent } from './teacher-menu-bar/teacher-menu-bar.component';
import { TeacherGuard } from './teacher.guard';
import { TeacherViewTimetableComponent } from './teacher-view-timetable/teacher-view-timetable.component';
import { ReportComponent } from './report/report.component';
import { SystemAdminMenuBarComponent } from './system-admin-menu-bar/system-admin-menu-bar.component';
import { SystemAdminGuard } from './system-admin.guard';
import { SystemAdminGetAllCenterComponent } from './system-admin-get-all-center/system-admin-get-all-center.component';
import { SystemAdminAddNewCenterComponent } from './system-admin-add-new-center/system-admin-add-new-center.component';
import { SystemAdminGrantAccountComponent } from './system-admin-grant-account/system-admin-grant-account.component';

import {ViewTeacherComponent} from './view-teacher/view-teacher.component';
import {AssignTeacherForClassComponent} from './assign-teacher-for-class/assign-teacher-for-class.component';
import {TakeAttendanceComponent} from './take-attendance/take-attendance.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'events', component: EventsComponent},
  {path: 'special', component: SpecialEventsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {
    path: 'forgot-password', children: [
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: '',
        component: ForgotPasswordComponent,
        pathMatch: 'full'
      }
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'redirect/:url/:param', component: RedirectComponent},
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
        path: 'form-detail/:id',
        component: ViewAdmissionFormDetailComponent
      },
      {
        path: 'addForm',
        component: AddNewFormComponent
      }
    ]
  },
  {
    path: 'Account-staff',
    component: AccountingMenuBarComponent,
    canActivate: [AccountStaffGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'student',
        component: AccountStaffConfirmStudentComponent
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
      {
        path: 'GenerateClass',
        component: AutoGenerateClassComponent
      },
      {
        path: 'GenerateTimetable',
        component: AutoGenerateTimetableComponent
      },
      {
        path: 'ListClasses',
        component: ListOfClassComponent
      },
      {
        path: 'ListStudentOfClass/:cId',
        component: ListStudentOfClassComponent
      },
      {
        path: 'view-teacher',
        component: ViewTeacherComponent
      },
      {
        path: 'assign-teacher',
        component: AssignTeacherForClassComponent
      },
      {
        path: 'Report',
        component: ReportComponent
      }
      // {
      //   path: 'course-detail/:id',
      //   component: CourseDetailComponent
      // }
    ]
  },
  {
    path: 'CenterAdmin',
    component: CenterAdminMenubarComponent,
    canActivate: [CenterAdminGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'GrantAccount',
        component: CenterAdminGrantAccountComponent
      }
    ]
  },
  {
    path: 'Student',
    component: OfficalStudentMenuBarComponent,
    canActivate: [StudentGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'ViewTimetable/:id',
        component: ViewTimetableComponent
      }
    ]
  },
  {
    path: 'Teacher',
    component: TeacherMenuBarComponent,
    canActivate: [TeacherGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'ViewTimetable',
        component: TeacherViewTimetableComponent
      },
      {
        path: 'take-attendance/:cId',
        component: TakeAttendanceComponent
      }
    ]
  },
  {
    path: 'SystemAdmin',
    component: SystemAdminMenuBarComponent,
    canActivate: [SystemAdminGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'AllCenter',
        component: SystemAdminGetAllCenterComponent
      },
      {
        path: 'AddCenter',
        component: SystemAdminAddNewCenterComponent
      },
      {
        path : 'GrantAccount',
        component : SystemAdminGrantAccountComponent
      }
    ]
  },
  { path: '**', component: ErrorPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
