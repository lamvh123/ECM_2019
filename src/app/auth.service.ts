import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _registerUrl = "http://localhost:3000/api/register"
private _loginUrl= "https://educationcentermanagementapi-dev-as.azurewebsites.net/token";
  constructor(private http:HttpClient,private route:Router) { }
  registerUser(user){
    return this.http.post<any>(this._registerUrl,user);
  }

  loginUser(user):Observable<any>{
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }
    
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new HttpHeaders(headerDict), 
    // };
    // let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('username', user.username);
    // urlSearchParams.append('password', user.password);
    // urlSearchParams.append("grant_type","password")
    // var param = {'username': user.username,'password': user.password,"grant_type":"password"};
    // return this.http.post<any>(this._loginUrl,param);

    // var data = "username=" + user.userName + "&password=" + user.password + "&grant_type=password";
    // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    // const formData = new FormData();
    // formData.append('username', 'systemadmin@gmail.com');
    // formData.append('password', '@Systemadmin2019');
    // formData.append('grant_type', 'password');
    //return this.http.post(this._loginUrl ,formData);
    const body = new HttpParams()
  .set('username', 'systemadmin@gmail.com')
  .set('password', '@Systemadmin2019')
  return this.http.post(this._loginUrl, body);
  }
  logedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
