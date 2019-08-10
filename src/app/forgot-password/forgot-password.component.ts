import {Component, OnInit} from '@angular/core';
import {APIContext, APIPassword} from '../APIContext';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css'
    , '../../assets/css/login.css']
})
export class ForgotPasswordComponent implements OnInit {

  apiContext = new APIContext();
  apiPassword = new APIPassword();

  email: string;
  errorMsgEmail = '-';

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
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
    const configUrl = this.apiContext.host + this.apiPassword.forgotPassword;
    const body = new HttpParams()
      .set('Email', this.email)
      .set('HostingName', location.href);
    console.log(body);
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.redirectToLogin();
      },
      err => {
        console.log(err);
        // this.showMessage(false);
      }
    );

  }

  private redirectToLogin() {
    this.router.navigateByUrl('/login');
  }
}
