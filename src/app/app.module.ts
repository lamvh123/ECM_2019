import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {EventsComponent} from './events/events.component';
import {SpecialEventsComponent} from './special-events/special-events.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './auth.service';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import {MenuBarComponent} from './menu-bar/menu-bar.component';
import {RedirectComponent} from './redirect/redirect.component';
import {NavigateComponent} from './navigate/navigate.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {AdminGuardGuard} from './admin-guard.guard';
import {TrainingStaffGuard} from './training-staff.guard';
import {ViewProgramComponent} from './view-program/view-program.component';
import {AddProgramComponent} from './add-program/add-program.component';
import {ViewCourseComponent} from './view-course/view-course.component';
import {AddCourseComponent} from './add-course/add-course.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {ProgramDetailComponent} from './program-detail/program-detail.component';
import {ViewSyllabusComponent} from './view-syllabus/view-syllabus.component';
import {UcWidgetModule} from 'ngx-uploadcare-widget';

import {AddBuildingComponent} from './add-building/add-building.component';
import {ViewBuildingComponent} from './view-building/view-building.component';
import {ViewRoomComponent} from './view-room/view-room.component';
import {AddRoomComponent} from './add-room/add-room.component';

import {AdmissionStaffMenubarComponent} from './admission-staff-menubar/admission-staff-menubar.component';

import {ViewAdmissionFormComponent} from './view-admission-form/view-admission-form.component';
import {ViewAdmissionFormDetailComponent} from './view-admission-form-detail/view-admission-form-detail.component';

import {AddSlotComponent} from './add-slot/add-slot.component';
import {ViewSlotComponent} from './view-slot/view-slot.component';


import {NgSelect2Module} from 'ng-select2';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {HeaderMenuComponent} from './header-menu/header-menu.component';
import {AddSubjectComponent} from './add-subject/add-subject.component';
import {ViewSubjectsComponent} from './view-subjects/view-subjects.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {LogoutComponent} from './logout/logout.component';
import {DatePipe} from '@angular/common';
import {AddNewFormComponent} from './add-new-form/add-new-form.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {AccountingMenuBarComponent} from './accounting-menu-bar/accounting-menu-bar.component';
import {AccountStaffConfirmStudentComponent} from './account-staff-confirm-student/account-staff-confirm-student.component';
import {CenterAdminMenubarComponent} from './center-admin-menubar/center-admin-menubar.component';
import {CenterAdminGrantAccountComponent} from './center-admin-grant-account/center-admin-grant-account.component';
import {NgHttpLoaderModule} from 'ng-http-loader';

import {AutoGenerateClassComponent} from './auto-generate-class/auto-generate-class.component';
import {AutoGenerateTimetableComponent} from './auto-generate-timetable/auto-generate-timetable.component';
import {ListOfClassComponent} from './list-of-class/list-of-class.component';
import {ListStudentOfClassComponent} from './list-student-of-class/list-student-of-class.component';

import {CenterStaffViewClosedAdmissionFormComponent}
  from './center-staff-view-closed-admission-form/center-staff-view-closed-admission-form.component';
import {OfficalStudentMenuBarComponent} from './offical-student-menu-bar/offical-student-menu-bar.component';
import {ViewTimetableComponent} from './view-timetable/view-timetable.component';
import {TeacherMenuBarComponent} from './teacher-menu-bar/teacher-menu-bar.component';
import {TeacherViewTimetableComponent} from './teacher-view-timetable/teacher-view-timetable.component';
import {ReportComponent} from './report/report.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SystemAdminMenuBarComponent} from './system-admin-menu-bar/system-admin-menu-bar.component';
import {SystemAdminGetAllCenterComponent} from './system-admin-get-all-center/system-admin-get-all-center.component';
import {SystemAdminAddNewCenterComponent} from './system-admin-add-new-center/system-admin-add-new-center.component';
import {SystemAdminGrantAccountComponent} from './system-admin-grant-account/system-admin-grant-account.component';
import {LoadingPageComponent} from './loading-page/loading-page.component';
import {ViewTeacherComponent} from './view-teacher/view-teacher.component';
import {AssignTeacherForClassComponent} from './assign-teacher-for-class/assign-teacher-for-class.component';
import {AddTeacherComponent} from './add-teacher/add-teacher.component';
import {TakeAttendanceComponent} from './take-attendance/take-attendance.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { CenterViewStaffComponent } from './center-view-staff/center-view-staff.component';
import { WeeklyReportComponent } from './weekly-report/weekly-report.component';
import { TrainingStaffViewStudentComponent } from './training-staff-view-student/training-staff-view-student.component';
import { TrainingStaffViewStudentDetailComponent } from './training-staff-view-student-detail/training-staff-view-student-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent,
    ProfileComponent,
    MenuBarComponent,
    RedirectComponent,
    NavigateComponent,
    ErrorPageComponent,
    AccessDeniedComponent,
    ViewProgramComponent,
    AddProgramComponent,
    ViewCourseComponent,
    AddCourseComponent,
    CourseDetailComponent,
    ProgramDetailComponent,
    ViewSyllabusComponent,
    AddBuildingComponent,
    ViewBuildingComponent,
    ViewRoomComponent,
    AddRoomComponent,
    AdmissionStaffMenubarComponent,
    AddSlotComponent,
    ViewSlotComponent,
    ViewAdmissionFormComponent,
    ViewAdmissionFormDetailComponent,
    AddNewFormComponent,
    HeaderMenuComponent,
    AddSubjectComponent,
    ViewSubjectsComponent,
    LogoutComponent,
    AccountingMenuBarComponent,
    AccountStaffConfirmStudentComponent,
    CenterAdminMenubarComponent,
    CenterAdminGrantAccountComponent,
    AutoGenerateClassComponent,
    AutoGenerateTimetableComponent,
    ListOfClassComponent,
    ListStudentOfClassComponent,
    CenterStaffViewClosedAdmissionFormComponent,
    OfficalStudentMenuBarComponent,
    ViewTimetableComponent,
    LoadingPageComponent,
    ViewTeacherComponent,
    TeacherMenuBarComponent,
    TeacherViewTimetableComponent,
    ReportComponent,
    SystemAdminMenuBarComponent,
    SystemAdminGetAllCenterComponent,
    SystemAdminAddNewCenterComponent,
    SystemAdminGrantAccountComponent,
    AssignTeacherForClassComponent,
    AddTeacherComponent,
    ReportComponent,
    TakeAttendanceComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    CenterViewStaffComponent,
    WeeklyReportComponent,
    TrainingStaffViewStudentComponent,
    TrainingStaffViewStudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    UcWidgetModule,
    NgSelectModule,
    NgSelect2Module,
    AmazingTimePickerModule,
    CKEditorModule,
    NgHttpLoaderModule,
    NgxChartsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [AuthService, AuthGuard, AdminGuardGuard, TrainingStaffGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService, multi: true
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
