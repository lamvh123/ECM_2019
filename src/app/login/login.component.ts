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
  styleUrls: ['./login.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css', '../css/assets/css/login.css',
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginUserData = {
    username: '',
    password: '',
    grant_type: ''
  };

  constructor(private _auth: AuthService,
              private _router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    if (this._auth.logedIn()) {
      if (this._auth.adminLogedIn) {
        this._router.navigate(['/Admin-menu/profile']);
      }
      if (this._auth.trainingStaffLogedIn) {
        this._router.navigate(['/Training-staff/profile']);
      }
    }
  }

  ngAfterViewInit() {

  }

  openLoginForm(e) {
    logInForm(e);
  }

  loginUser() {
    const body = new HttpParams()
      .set('username', this.loginUserData.username)
      .set('password', this.loginUserData.password).set('grant_type', 'password');
    this.http.post<any>('https://educationcentermanagementapi-dev-as.azurewebsites.net/token', body).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('role', res.role);
        if (this._auth.adminLogedIn) {
          // this._router.navigate(['/Admin-menu']);
          this._router.navigate(['/Admin-menu/profile']);
        }
        if (this._auth.trainingStaffLogedIn) {
          this._router.navigate(['/Training-staff/profile']);
        }
      },
      err => {
        console.log(err);
      }
    );

  }

}
