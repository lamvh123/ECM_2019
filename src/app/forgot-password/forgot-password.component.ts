import {AfterViewInit, Component, OnInit} from '@angular/core';
import {APIContext, APIPassword} from '../APIContext';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
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
    const regex = /^[a-zA-Z][a-zA-Z0-9_\.]{5,32}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/gm;
    if (this.email == null || this.email === '') {
      this.errorMsgEmail = 'Email is required.';
      return false;
    } else if (!regex.test(this.email)) {
      this.errorMsgEmail = 'Invalid email format.';
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
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
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
        this.toastr.success('Reset password link is sent. Check your email.', 'Success!');
        this.redirectToLogin();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        // this.showMessage(false);
      }
    );

  }

  private redirectToLogin() {
    this.router.navigateByUrl('/login');
  }
}
