import {Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {APIContext} from '../APIContext';
import * as $ from 'jquery';

declare var logInForm: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css'
    , '../../assets/css/login.css'
    // , '../../assets/css/animate.css'
  ]
})
export class LoginComponent implements OnInit, AfterContentInit, AfterViewInit {

  apiContext = new APIContext();
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

  btnSuccess: HTMLElement;
  btnFailure: HTMLElement;


  ngAfterViewInit() {
    $.getScript('../../assets/bundles/libscripts.bundle.js');
    $.getScript('../../assets/bundles/vendorscripts.bundle.js');
    $.getScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    $.getScript('../../assets/plugins/bootstrap-notify/bootstrap-notify.js');
    $.getScript('../../assets/js/pages/ui/notifications.js');
    $.getScript('../../assets/bundles/mainscripts.bundle.js');
    // $.getScript('../../assets/testScript.js');
    this.btnSuccess = document.getElementById('sBtn') as HTMLElement;
    this.btnFailure = document.getElementById('fBtn') as HTMLElement;
    console.log('avi s ' + this.btnSuccess);
    console.log('avi f ' + this.btnFailure);
  }

  constructor(private _auth: AuthService,
              private _router: Router, private http: HttpClient) {
  }

  ngOnInit() {

    if (!!this._auth.adminLogedIn()) {
      console.log('1');
      this._router.navigate(['/Admin-menu/profile']);
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

  ngAfterContentInit(): void {
    this.isLoading = false;
    this.btnSuccess = document.getElementById('sBtn') as HTMLElement;
    this.btnFailure = document.getElementById('fBtn') as HTMLElement;
    console.log('aci s ' + this.btnSuccess);
    console.log('aci f ' + this.btnFailure);
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
        if (this._auth.adminLogedIn()) {
          distUrl = '/Admin-menu/profile';
        } else if (this._auth.trainingStaffLogedIn()) {
          distUrl = '/Training-staff/profile';
        } else if (this._auth.admissionStaffLogedIn()) {
          distUrl = '/Admission-staff/profile';
        } else if (this._auth.accountingStaffLoggedin()) {
          distUrl = '/Account-staff/profile';
        } else if (this._auth.centerAdminLoggedIn()) {
          distUrl = '/CenterAdmin/profile';
        } else if (this._auth.StudentLoggedIn()) {
          distUrl = '/Student/profile';
        } else if (this._auth.TeacherLoggedIn()) {
          distUrl = '/Teacher/profile';
        } else {
          console.log(res);
        }
        this.isLoading = false;
        if (distUrl == null || distUrl == 'undefined' || distUrl.length < 1) {
          this.showNotification('fBtn');
        } else {
          this.showNotification('sBtn');
          this._router.navigate([distUrl]);
        }
      },
      err => {
        console.log(err);
        this.loginMessage = err.error.error_description;
        this.loginFail = true;
        this.isLoading = false;
        this.showNotification('fBtn');
      }
    );

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
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }


  showNotification(btnId: string) {
    if (btnId == 'sBtn') {
      this.btnSuccess.click();
    } else {
      this.btnFailure.click();
    }
  }


}

