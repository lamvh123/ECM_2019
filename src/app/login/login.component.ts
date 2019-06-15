import { Component, OnInit,AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
declare var jquery: any; declare var $: any;
declare var logInForm:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../css/assets/css/main.css',
  '../css/assets/css/themes/all-themes.css','../css/assets/css/login.css',
  ]
})
export class LoginComponent implements OnInit,AfterViewInit {
  loginUserData ={
    username:"",
    password:"",
    grant_type:""
  } ;
  constructor(private _auth: AuthService,
    private _router: Router,private http:HttpClient) { }

  ngOnInit() {
    if(this._auth.logedIn()){
      this._router.navigate(['/profile']);
    }
  }
  ngAfterViewInit(){
    $.getScript("/assets/bundles/libscripts.bundle.js", function () {
    });
    $.getScript("/assets/bundles/vendorscripts.bundle.js", function () {
    });
    $.getScript("assets/bundles/mainscripts.bundle.js", function () {
    });
  }
  openLoginForm(e){
    logInForm(e);
  }
  loginUser(){
    const body = new HttpParams()
  .set('username', this.loginUserData.username)
  .set('password',  this.loginUserData.password).set('grant_type','password');
   this.http.post<any>("https://educationcentermanagementapi-dev-as.azurewebsites.net/token", body).subscribe(
       res =>{
         console.log(res);
         localStorage.setItem('token',res.access_token);
         this._router.navigate(['/profile']);
       },
       err=>{
         console.log(err);
       }
     );
   
  }

}
