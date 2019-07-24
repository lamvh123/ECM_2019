import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

declare var jquery: any;
declare var $: any;
declare var logInForm: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css'
    , '../../assets/css/login.css',
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginFail = false;
  loginMessage: string;
  loginUserData = {
    username: '',
    password: '',
    grant_type: ''
  };

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

  }

  ngAfterViewInit() {
    // this.loadScript('../../assets/bundles/libscripts.bundle.js');
    // this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('../../assets/bundles/mainscripts.bundle.js');
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
    const body = new HttpParams()
      .set('username', this.loginUserData.username)
      .set('password', this.loginUserData.password)
      .set('grant_type', 'password');
    this.http.post<any>('https://educationcentermanagementapi-dev-as.azurewebsites.net/token', body).subscribe(
      res => {
        var expireDate = new Date(new Date().getTime() + 60 * 24 * 60000);
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('expiretime', expireDate.getTime() + '');
        if (this._auth.adminLogedIn()) {
          this._router.navigate(['/Admin-menu/profile']);
        } else if (this._auth.trainingStaffLogedIn()) {
          this._router.navigate(['/Training-staff/profile']);
        } else if (this._auth.admissionStaffLogedIn()) {
          this._router.navigate(['/Admission-staff/profile']);
        } else if (this._auth.accountingStaffLoggedin()) {
          this._router.navigate(['/Account-staff/profile']);
        } else if (this._auth.centerAdminLoggedIn()) {
          this._router.navigate(['/CenterAdmin/profile']);
        } else {
          console.log(res);
        }
      },
      err => {
        console.log(err);
        this.loginMessage = err.error.error_description;
        this.loginFail = true;
      }
    );

  }

}
