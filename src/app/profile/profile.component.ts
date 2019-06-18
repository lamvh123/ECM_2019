import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
declare var jquery: any; declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  user ={
    name : "",
    email : "",
    PhoneNumber : "",
    Sex : "",
    Id : "",
    Avatar : ""
  };
  
  constructor(private router: Router, private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    this.getProfile();
    console.log("asd");
  }
  getProfile(){
    if (this.auth.adminLogedIn()) {
      const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/Systemmanagement/Profile';
      this.http.get<any>(configUrl).subscribe(res => {
        console.log(res);
        this.user.name = res.FullName;
        this.user.email = res.Email;
        this.user.PhoneNumber = res.PhoneNumber;
        this.user.Sex = res.Sex;
        this.user.Id = res.Id;
        this.user.Avatar = res.Avatar;
        console.log(res.FullName);
      },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {

            }
          }
        });
    }
    else if(this.auth.trainingStaffLogedIn()){
      const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/Profile';
      this.http.get<any>(configUrl).subscribe(res => {
        console.log(res);
        this.user.name = res.FullName;
        this.user.email = res.Email;
        this.user.PhoneNumber = res.PhoneNumber;
        this.user.Sex = res.Sex;
        this.user.Id = res.Id;
        this.user.Avatar = res.Avatar;
      },
        error => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {

            }
          }
        });
    }
  }
  ngAfterViewInit() {

  }
  updateProfile(){
    var configUrl = "";
    if (this.auth.adminLogedIn()){
      configUrl="";
    }
    else if(this.auth.trainingStaffLogedIn()){
      configUrl="https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/UpdateProfile";
    }
    const body = new HttpParams()
    .set('Id', this.user.Id)
    .set('FullName', this.user.name)
    .set('Avatar', this.user.Avatar)
    .set('Email', this.user.email)
    .set('Sex', this.user.Sex)
    .set('PhoneNumber', this.user.PhoneNumber);

    this.http.post<any>(configUrl,body).subscribe(res => {
      console.log(res);
      this.user.name = res.Full_Name;
      this.user.email = res.Email;
      this.user.PhoneNumber = res.PhoneNumber;
      this.user.Sex = res.Sex;
      this.user.Id = res.Id;
      console.log(res);
      
    },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {

          }
        }
      });
  }

}
