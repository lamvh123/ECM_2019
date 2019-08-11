import {Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {APIAccounting, APIAdmission, APICenter, APIContext, APIStudent, APISystem, APITeacher, APITraining} from '../APIContext';
import * as $ from 'jquery';
import {ToastrService} from 'ngx-toastr';

declare var logInForm: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css'
    , '../../assets/css/login.css'
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {

  apiContext = new APIContext();
  apiTraining = new APITraining();
  apiAdmission = new APIAdmission();
  apiSystem = new APISystem();
  apiAccounting = new APIAccounting();
  apiCenter = new APICenter();
  apiStudent = new APIStudent();
  apiTeacher = new APITeacher();

  loginFail = false;
  loginMessage: string;
  loginUserData = {
    username: '',
    password: '',
    grant_type: ''
  };

  errorMsgUsername = '-';
  errorMsgPassword = '-';
  isLoading = true;

  ngAfterViewInit() {
    $.getScript('../../assets/bundles/libscripts.bundle.js');
    $.getScript('../../assets/bundles/vendorscripts.bundle.js');
    $.getScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    $.getScript('../../assets/plugins/bootstrap-notify/bootstrap-notify.js');
    $.getScript('../../assets/js/pages/ui/notifications.js');
    $.getScript('../../assets/bundles/mainscripts.bundle.js');
    this.isLoading = false;
  }

  constructor(private _auth: AuthService,
              private _router: Router, private http: HttpClient, private toastr: ToastrService) {
  }

  showSuccess() {
    this.toastr.success('Login successfully.', 'Success!');
  }

  showError() {
    this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('Something is missing.', 'Alert!');
  }

  //
  // showInfo() {
  //   this.toastr.info('Just some information for you.');
  // }

  ngOnInit() {

    if (!!this._auth.adminLogedIn()) {
      console.log('1');
      this._router.navigate(['/SystemAdmin/profile']);
    }
    if (!!this._auth.trainingStaffLogedIn()) {
      console.log('2');
      this._router.navigate(['/Training-staff/profile']);
    }
    if (!!this._auth.admissionStaffLogedIn()) {
      console.log('1');
      this._router.navigate(['/Admission-staff/profile']);
    }
    if (!!this._auth.accountingStaffLoggedin()) {
      this._router.navigate(['/Account-staff/profile']);
    }
    if (!!this._auth.centerAdminLoggedIn()) {
      this._router.navigate(['/CenterAdmin/profile']);
    }
    if (!!this._auth.StudentLoggedIn()) {
      this._router.navigate(['/Student/profile']);
    }
    if (!!this._auth.StudentLoggedIn()) {
      this._router.navigate(['/Teacher/profile']);
    }

  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  openLoginForm(e) {
    logInForm(e);
  }

  loginUser() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('username', this.loginUserData.username)
      .set('password', this.loginUserData.password)
      .set('grant_type', 'password');
    this.http.post<any>(this.apiContext.host + 'token', body).subscribe(
      res => {
        const expireDate = new Date(new Date().getTime() + 60 * 24 * 60000);
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('expiretime', expireDate.getTime() + '');
        let distUrl: string;
        let configUrl = this.apiContext.host;
        if (this._auth.adminLogedIn()) {
          distUrl = '/SystemAdmin/profile';
          configUrl += this.apiSystem.profile;
        } else if (this._auth.trainingStaffLogedIn()) {
          distUrl = '/Training-staff/profile';
          configUrl += this.apiTraining.getProfile;
        } else if (this._auth.admissionStaffLogedIn()) {
          distUrl = '/Admission-staff/profile';
          configUrl += this.apiAdmission.profile;
        } else if (this._auth.accountingStaffLoggedin()) {
          distUrl = '/Account-staff/profile';
          configUrl += this.apiAccounting.profile;
        } else if (this._auth.centerAdminLoggedIn()) {
          distUrl = '/CenterAdmin/profile';
          configUrl += this.apiCenter.profile;
        } else if (this._auth.StudentLoggedIn()) {
          distUrl = '/Student/profile';
          configUrl += this.apiStudent.profile;
        } else if (this._auth.TeacherLoggedIn()) {
          distUrl = '/Teacher/profile';
          configUrl += this.apiTeacher.profile;
        } else {
          console.log(res);
        }
        this.isLoading = false;
        if (distUrl == null || distUrl == 'undefined' || distUrl.length < 1) {
          this.showError();
        } else {
          this.getProfile(configUrl);
          this.showSuccess();
          this._router.navigate([distUrl]);
        }
      },
      err => {
        console.log(err);
        this.loginMessage = err.error.error_description;
        this.loginFail = true;
        this.isLoading = false;
        this.showError();
      }
    );

  }

  getProfile(configUrl: string) {
    this.isLoading = true;
    this.http.get<any>(configUrl).subscribe(res => {
        console.log(res);
        localStorage.setItem('userAvatar', res.Avatar);
        localStorage.setItem('userName', res.FullName);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            console.log(error.status);
          }
        }
        this.isLoading = false;
      });

  }


  checkValidUsername() {
    if (this.loginUserData.username != null) {
      this.loginUserData.username = this.formatText(this.loginUserData.username);
    }
    if (this.loginUserData.username == null || this.loginUserData.username === '') {
      this.errorMsgUsername = 'Username/Email is required.';
      return false;
    } else {
      this.errorMsgUsername = '';
      return true;
    }
  }

  checkValidPassword() {
    if (this.loginUserData.password == null || this.loginUserData.password === '') {
      this.errorMsgPassword = 'Password is required.';
      return false;
    } else if (this.loginUserData.password.length < 6) {
      this.errorMsgPassword = 'Password must include at least 6 characters.';
      return false;
    } else {
      this.errorMsgPassword = '';
      return true;
    }
  }

  checkValidFields() {
    this.checkValidUsername();
    this.checkValidPassword();
    if (this.checkValidUsername() && this.checkValidPassword()) {
      this.loginUser();
    } else {
      this.showWarning();
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

}

