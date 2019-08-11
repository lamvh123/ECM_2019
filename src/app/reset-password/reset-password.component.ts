import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APIContext, APIPassword} from '../APIContext';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css'
    , '../../assets/css/login.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  password: string;
  rePassword: string;
  code: string;
  email: string;
  errorMsgPassword = '-';
  errorMsgRePassword = '-';
  resetFail = false;
  resetMessage: string;
  apiContext = new APIContext();
  apiPassword = new APIPassword();
  isLoading = true;

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.activatedRoute.queryParams.subscribe(params => {
      const token: string = params['token'];
      const code: string = params['code'];
      if (token == null || token.length < 1 || code == null || code.length < 1) {
        this.redirectToError();
      } else {
        this.email = this.formatEncode(token);
        this.code = this.formatEncode(code);
        console.log(this.code);
        console.log(this.email);
      }
    });
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

  hasNumber(myString) {
    return /\d/.test(myString);
  }

  hasLowerCase(str) {
    return (/[a-z]/.test(str));
  }

  hasUpperCase(str) {
    return (/[A-Z]/.test(str));
  }

  hasSpecialChar(str) {
    return (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str));
  }

  checkValidPassword() {
    if (this.password == null || this.password === '') {
      this.errorMsgPassword = 'Password is required.';
      return false;
    } else if (this.password.length < 6) {
      this.errorMsgPassword = 'Password must include at least 6 characters.';
      return false;
    } else if (!this.hasNumber(this.password) || !this.hasLowerCase(this.password)
      || !this.hasUpperCase(this.password) || !this.hasSpecialChar(this.password)) {
      let err = 'Password must contain atleast ';
      let arr: string[] = [];
      if (!this.hasNumber(this.password)) {
        arr.push('digit');
      }
      if (!this.hasLowerCase(this.password)) {
        arr.push('lowercase character');
      }
      if (!this.hasUpperCase(this.password)) {
        arr.push('uppercase character');
      }
      if (!this.hasSpecialChar(this.password)) {
        arr.push('special character');
      }
      for (let i = 0; i < arr.length - 1; i++) {
        err += '1 ' + arr[i] + ', ';
      }
      err += 'and 1 ' + arr[arr.length - 1] + '.';
      this.errorMsgPassword = err;
    } else {
      this.errorMsgPassword = '';
      return true;
    }
  }

  checkValidRePassword() {
    if (this.rePassword == null || this.rePassword === '') {
      this.errorMsgRePassword = 'Password is required.';
      return false;
    } else if (!(this.rePassword === this.password)) {
      this.errorMsgRePassword = 'Password does not match.';
      return false;
    } else {
      this.errorMsgRePassword = '';
      return true;
    }
  }

  checkValidFields() {
    this.checkValidPassword();
    this.checkValidRePassword();
    if (this.checkValidPassword() && this.checkValidRePassword()) {
      this.updatePassword();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

  private updatePassword() {
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiPassword.updatePasswordAfterForgotPassword;
    const body = new HttpParams()
      .set('Code', this.code)
      .set('Email', this.email)
      .set('Password', this.password)
      .set('ConfirmPassword', this.rePassword);
    console.log(body);
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.toastr.success('Reset password successfully.', 'Success!');
        this.isLoading = false;
        this.redirectToLogin();
      },
      err => {
        console.log(err);
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        this.isLoading = false;
        // this.showMessage(false);
      }
    );
  }

  private redirectToLogin() {
    this.router.navigateByUrl('/login');
  }

  private redirectToError() {
    this.router.navigateByUrl('/error');
  }

  private formatEncode(token: string): string {
    return token.replace(/\s/g, '+');
    // return token.replace(' ', '+');
    // return encodeURIComponent(token)
    //   .replace(/%40/gi, '@')
    //   .replace(/%3A/gi, ':')
    //   .replace(/%24/gi, '$')
    //   .replace(/%2C/gi, ',')
    //   .replace(/%3B/gi, ';')
    //   .replace(/%20/gi, '+')
    //   .replace(/%3D/gi, ';')
    //   .replace(/%2F/gi, '/')
    //   .replace(/%3D/gi, '=')
    //   .replace(/%3F/gi, '?');
  }
}
