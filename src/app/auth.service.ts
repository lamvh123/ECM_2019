import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/token';

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

  logedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

  adminLogedIn() {
    var role = localStorage.getItem('role');
    if (this.logedIn() && role == 'SystemAdmin') {
      return true;
    }
    return false;
  }

  trainingStaffLogedIn() {
    var role = localStorage.getItem('role');
    if (this.logedIn() && role == 'TrainingStaff') {
      return true;
    }
    return false;
  }

  admissionStaffLogedIn(){
    var role = localStorage.getItem('role');
    console.log(role);
    if (this.logedIn() && role == 'AdmissionStaff') {
      return true;
    }
    return false;
  }
}
