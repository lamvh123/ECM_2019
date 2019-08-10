import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {APIContext} from './APIContext';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiContext = new APIContext();
  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = this.apiContext.host + 'token';

  constructor(private http: HttpClient, private route: Router) {
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user): Observable<any> {
    const body = new HttpParams()
      .set('username', 'systemadmin@gmail.com')
      .set('password', '@Systemadmin2019');
    return this.http.post(this._loginUrl, body);
  }

  logedIn(): boolean {
    if (new Date().getTime() > Number(localStorage.getItem('expiretime'))) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('expiretime');
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('userName');
    }
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('expiretime');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userName');
    this.route.navigate(['/login']);
  }

  adminLogedIn(): boolean {
    var role = localStorage.getItem('role');
    if (this.logedIn() && role == 'SystemAdmin') {
      return true;
    }
    return false;
  }

  trainingStaffLogedIn(): boolean {
    var role = localStorage.getItem('role');
    if (this.logedIn() && role == 'TrainingStaff') {
      return true;
    }
    return false;
  }

  admissionStaffLogedIn(): boolean {
    var role = localStorage.getItem('role');
    console.log(role);
    if (this.logedIn() && role == 'AdmissionStaff') {
      return true;
    }
    return false;
  }

  accountingStaffLoggedin(): boolean {
    var role = localStorage.getItem('role');
    console.log(role);
    if (this.logedIn() && role == 'AccountingStaff') {
      return true;
    }
    return false;
  }

  centerAdminLoggedIn(): boolean {
    var role = localStorage.getItem('role');
    console.log(role);
    if (this.logedIn() && role == 'CenterAdmin') {
      return true;
    }
    return false;
  }

  StudentLoggedIn(): boolean {
    var role = localStorage.getItem('role');
    console.log(role);
    if (this.logedIn() && role == 'Student') {
      return true;
    }
    return false;
  }

  TeacherLoggedIn(): boolean {
    var role = localStorage.getItem('role');
    console.log(role);
    if (this.logedIn() && role == 'Teacher') {
      return true;
    }
    return false;
  }

}
