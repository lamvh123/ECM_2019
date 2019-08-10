import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIContext, APISystem } from '../APIContext';

@Component({
  selector: 'app-system-admin-grant-account',
  templateUrl: './system-admin-grant-account.component.html',
  styleUrls: ['./system-admin-grant-account.component.css','../../assets/css/main.css',
  '../../assets/css/themes/all-themes.css']
})
export class SystemAdminGrantAccountComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
  centerId;
  centerName;
  Account: string;
  errorMsgAccount: string;
  apiContext = new APIContext();
  apiSystem = new APISystem();
  msg;
  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=> {  
      this.centerId=params.get('id');  
      this.centerName=params.get('name');  
      console.log(params.get('id')+" "+params.get('name'))
    });  
  }
  checkValidFields() {
    this.checkValidAccount();
    if (this.checkValidAccount()) {
      this.GrantAccount();
    }
  }
  checkValidAccount() {
    if (this.Account == null || this.Account === '') {
      this.errorMsgAccount = 'Account is required.';
      return false;
    } else {
      this.errorMsgAccount = '';
      return true;
    }
  }
  GrantAccount(){
     var url = this.apiContext.host+this.apiSystem.grantAccountForCenter;
     var params = new HttpParams().set('CenterId',this.centerId).set('EmailCenter',this.Account);
     this.http.post(url,params).toPromise().then(data=>{
       this.msg = "success";
     },
     error=>{
      this.msg = "error";
     })
  }

}
