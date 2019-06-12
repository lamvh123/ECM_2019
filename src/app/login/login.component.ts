import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData ={
    username:"",
    password:"",
    grant_type:""
  } ;
  constructor(private _auth: AuthService,
    private _router: Router,private http:HttpClient) { }

  ngOnInit() {
  }
  loginUser(){
    const body = new HttpParams()
  .set('username', this.loginUserData.username)
  .set('password',  this.loginUserData.password).set('grant_type','password');
   this.http.post("https://educationcentermanagementapi-dev-as.azurewebsites.net/token", body).subscribe(
       res =>{
         console.log(res);
       },
       err=>{
         console.log(err);
       }
     );
   
  }

}
