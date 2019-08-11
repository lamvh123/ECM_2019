import {AfterViewInit, Component, OnInit} from '@angular/core';
import {APIContext, APIPassword} from '../APIContext';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css'
    , '../../assets/css/login.css']
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {

  apiContext = new APIContext();
  apiPassword = new APIPassword();

  email: string;
  errorMsgEmail = '-';
  isLoading = true;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $.getScript('../../assets/bundles/libscripts.bundle.js');
    $.getScript('../../assets/bundles/vendorscripts.bundle.js');
    $.getScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    $.getScript('../../assets/plugins/bootstrap-notify/bootstrap-notify.js');
    $.getScript('../../assets/js/pages/ui/notifications.js');
    $.getScript('../../assets/bundles/mainscripts.bundle.js');
    this.isLoading = false;
  }

  checkValidEmail() {
    if (this.email != null) {
      this.email = this.formatText(this.email);
    }
    if (this.email == null || this.email === '') {
      this.errorMsgEmail = 'Email is required.';
      return false;
    } else {
      this.errorMsgEmail = '';
      return true;
    }
  }

  checkValidFields() {
    this.checkValidEmail();
    if (this.checkValidEmail()) {
      this.sendRequestReset();
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }


  showNoti(btnId: string) {
    const btn: HTMLElement = document.getElementById(btnId) as HTMLElement;
    btn.click();
  }

  private sendRequestReset() {
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiPassword.forgotPassword;
    const body = new HttpParams()
      .set('Email', this.email)
      .set('HostingName', location.href);
    console.log(body);
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.isLoading = false;
        this.showNoti('sBtn');
        this.redirectToLogin();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.showNoti('fBtn');
        // this.showMessage(false);
      }
    );

  }

  private redirectToLogin() {
    this.router.navigateByUrl('/login');
  }
}
