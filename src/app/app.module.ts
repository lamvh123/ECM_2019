import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    UcWidgetModule
  ],
  providers: [AuthService, AuthGuard, AdminGuardGuard, TrainingStaffGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
